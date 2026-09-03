# Analytics & Search Console setup

This site ships with a privacy-respecting GA4 integration: nothing loads
until the visitor accepts cookies, no personal data is ever sent to
Google, and every event has an explicit, documented name.

## 1. Where to put your IDs

Everything lives in two environment variables. Copy `.env.example` to
`.env.local` (never commit `.env.local`) and fill in:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"   # GA4 > Admin > Data Streams > Web > Measurement ID
NEXT_PUBLIC_GSC_VERIFICATION="abc123..."        # Search Console > Settings > Ownership verification > HTML tag (content value only)
```

Both are safe to expose in the browser (`NEXT_PUBLIC_*`) — a GA4
Measurement ID and a Search Console verification token are not secrets,
they're meant to be public. **Never** put a GA4 API secret, a service
account key, or any other credential in a `NEXT_PUBLIC_*` variable.

- Leaving `NEXT_PUBLIC_GA_MEASUREMENT_ID` empty disables analytics
  entirely: no script loads and the cookie banner never appears.
- Leaving `NEXT_PUBLIC_GSC_VERIFICATION` empty simply omits the
  verification meta tag (use the DNS or file-upload verification method
  instead if you don't want to set it here).

Restart `next dev` / redeploy after changing these — they're read at
build/server-start time.

## 2. How it works

- `components/analytics/GoogleAnalytics.tsx` sets Google Consent Mode
  defaults (`analytics_storage: denied`) on every page load, before any
  tracking script exists. The actual `gtag.js` library is only injected
  once the visitor accepts the cookie banner.
- `components/analytics/ConsentBanner.tsx` shows a bottom banner
  (Accept/Reject) until the visitor has made a choice, stored in
  `localStorage` under `proodz-consent`. Nothing is tracked before that.
- `components/analytics/AnalyticsListener.tsx` is a single delegated
  click listener mounted once in the root layout. It auto-detects
  `tel:`, `mailto:`, `wa.me`/WhatsApp and social links (Facebook,
  Instagram, LinkedIn) anywhere on the site — no per-component wiring
  needed — and fires named events for CTAs tagged with `data-ga-event`.
- `lib/analytics.ts` exposes `trackEvent(name, params)`. Params are
  restricted to non-identifying labels by convention — **never** pass a
  visitor's name, email, phone number or message content.

## 3. Events fired

| Event name | When | Params (all non-identifying) |
|---|---|---|
| `page_view` | Every full page load (default GA4 behaviour — this site uses classic `<a href>` navigation, not client-side routing, so no manual wiring was needed) | — |
| `contact_click` | Click on a `tel:`, `mailto:` or WhatsApp (`wa.me`) link anywhere on the site, or the chatbot's call/email/WhatsApp options | `method`: `phone` \| `email` \| `whatsapp`, `source` (chatbot only) |
| `social_click` | Click on a Facebook, Instagram or LinkedIn link | `network` |
| `cta_click` | Click on a tagged call-to-action button (`data-ga-event="cta_click"`) | `event_label` (button identifier, e.g. `hero_audit_gratuit`, `nav_audit_gratuit`, `footer_audit_gratuit`) |
| `generate_lead` | **Conversion.** Successful submission of the free-diagnostic form (homepage and `/contact`) | `lead_type: "diagnostic_gratuit"`, `sector` (slug), `lang` |
| `scroll`, `file_download`, `video_start`/`video_progress`/`video_complete`, `form_start`/`form_submit` | GA4's built-in **Enhanced Measurement** (see §4) | automatic |

### Extending: tagging a new CTA

Add these two attributes to any button or link and it's automatically
tracked — no code changes to `AnalyticsListener.tsx` needed:

```tsx
<a href="/contact" data-ga-event="cta_click" data-ga-label="pricing_page_cta">
  Demander un devis
</a>
```

Do **not** add `data-ga-event` to a `tel:`, `mailto:`, `wa.me` or social
link — those are already tracked automatically and tagging them too
would count every click twice.

## 4. Conversions to mark as "Key events" in GA4

In GA4 Admin → Events → mark these as key events (conversions):

1. **`generate_lead`** — the primary conversion: a completed free
   diagnostic / quote request. This is the event to optimize campaigns
   towards.
2. **`contact_click`** with `method=whatsapp`, `method=phone` or
   `method=email` — secondary "soft" conversions (direct contact
   without going through the form).

## 5. Avoiding duplicate tracking

GA4's **Enhanced Measurement** (Admin → Data Streams → your web stream →
Enhanced measurement) automatically tracks outbound clicks and generic
form submissions. This site's custom events are named differently
(`contact_click`, `social_click`, `generate_lead`) so they won't be
literally duplicated, but to keep reporting clean:

- **Turn OFF "Outbound clicks"** in Enhanced Measurement — this site's
  `AnalyticsListener` already covers WhatsApp/social/phone/email clicks
  with clearer, purpose-built event names.
- You can leave **"Form interactions"** on if you also want GA4's
  generic `form_start`/`form_submit` alongside the named `generate_lead`
  conversion — they carry different information and don't conflict.
- Never add both a manual `trackEvent()` call *and* a `data-ga-event`
  attribute to the same element.

## 6. No personal data reaches Google Analytics

- `anonymize_ip`, disabled Google Signals and disabled ad
  personalization are set on every `gtag('config', ...)` call.
- Every `trackEvent()` call site in this codebase (`FreeDiagnosticForm`,
  `Chatbot`) only ever sends a sector slug, a language code, or a fixed
  string identifier — never `name`, `email`, `phone`, `company` or the
  free-text `message` field submitted by a visitor.
- The lead itself (name, email, phone, message) only ever reaches your
  configured email provider or the local `var/leads/diagnostic.jsonl`
  fallback (see the main `.env.example` section above) — it never
  touches Google Analytics.
- Nothing is sent to GA4 at all until the visitor clicks "Accepter" on
  the cookie banner.

## 7. Verifying it works in production

1. Deploy with both env vars set.
2. Open the live site in an incognito window, accept the cookie
   banner, and open DevTools → Network, filtered on `collect` or
   `google-analytics`. You should see requests fire as you navigate,
   click a WhatsApp/phone/email link, and submit the diagnostic form.
3. In GA4, go to **Reports → Realtime** and confirm your own visit and
   the `contact_click` / `generate_lead` events appear within ~30s.
4. In GA4 **Admin → DebugView** (or install the "Google Analytics
   Debugger" browser extension first), repeat step 2 for a
   parameter-level view of every event fired, including `event_label`
   values.
5. For Search Console: after deploying with
   `NEXT_PUBLIC_GSC_VERIFICATION` set, go to Search Console → Settings
   → Ownership verification and click **Verify**. Once verified, submit
   `https://proodz.com/sitemap.xml` under **Sitemaps**.
6. Re-check after a week that GA4 **Reports → Acquisition** and
   **Engagement → Pages and screens** are populating, and that Search
   Console **Coverage/Indexing** shows the new `/a-propos` and `/faq`
   pages as indexed (can take several days).

## 8. What GA4 already gives you for free (no custom code needed)

- **Visitors, sessions, most-viewed pages**: Reports → Engagement.
- **Traffic sources**: Reports → Acquisition.
- **Devices used** (mobile/desktop/tablet, OS, browser): Reports → Tech
  → Overview. This is a standard GA4 dimension available on every
  event; no extra instrumentation was needed for this one.

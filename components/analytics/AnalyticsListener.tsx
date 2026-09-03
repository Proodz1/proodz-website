"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Single delegated click listener for the whole site. Auto-classifies
 * tel: / mailto: / wa.me / social links so no per-component wiring is
 * needed (and so nothing gets double-instrumented). Elements can also
 * opt in explicitly with data-ga-event (+ data-ga-category / data-ga-label)
 * for CTAs that aren't plain contact links — see docs/ANALYTICS.md.
 *
 * Do NOT add data-ga-event to a tel:/mailto:/wa.me/social link: it is
 * already tracked below and doing so would fire two events per click.
 */
function classifyHref(href: string): { event: string; params: Record<string, string> } | null {
  if (href.startsWith("tel:")) return { event: "contact_click", params: { method: "phone" } };
  if (href.startsWith("mailto:")) return { event: "contact_click", params: { method: "email" } };
  if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
    return { event: "contact_click", params: { method: "whatsapp" } };
  }
  try {
    const url = new URL(href, window.location.origin);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "facebook.com") return { event: "social_click", params: { network: "facebook" } };
    if (host === "instagram.com") return { event: "social_click", params: { network: "instagram" } };
    if (host.includes("linkedin.com")) return { event: "social_click", params: { network: "linkedin" } };
  } catch {
    // relative/invalid href — not a social or external contact link
  }
  return null;
}

export default function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const gaEl = target.closest<HTMLElement>("[data-ga-event]");
      if (gaEl) {
        const eventName = gaEl.dataset.gaEvent as string;
        trackEvent(eventName, {
          event_category: gaEl.dataset.gaCategory || "engagement",
          event_label: gaEl.dataset.gaLabel || undefined,
        });
      }

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (anchor) {
        const info = classifyHref(anchor.getAttribute("href") || "");
        if (info) trackEvent(info.event, { event_category: "contact", ...info.params });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

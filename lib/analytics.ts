// GA4 measurement ID, injected at build time from the environment.
// See .env.example and docs/ANALYTICS.md for setup instructions.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Fires a named GA4 event. Never pass name, email, phone or free-text
 * message content here — params must stay limited to non-identifying
 * labels (event_category, a sector slug, a CTA id, etc).
 */
export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

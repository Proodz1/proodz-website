const KEY = "proodz-consent";
export const CONSENT_CHANGE_EVENT = "proodz-consent-change";

export type ConsentValue = "granted" | "denied";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, value);
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: value === "granted" ? "granted" : "denied",
    });
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** Subscribe to consent changes — for use with useSyncExternalStore. */
export function subscribeConsentChange(callback: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
}

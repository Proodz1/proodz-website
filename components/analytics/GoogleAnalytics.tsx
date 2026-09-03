"use client";
import { useSyncExternalStore } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { getStoredConsent, subscribeConsentChange } from "@/lib/consent";

function getSnapshot() {
  return getStoredConsent() === "granted";
}

function getServerSnapshot() {
  return false;
}

/**
 * Loads GA4 only after the visitor has accepted cookies (ConsentBanner).
 * Google Consent Mode defaults analytics_storage to "denied" immediately
 * on every page load, before any script runs, so nothing is measured
 * until consent is explicitly granted.
 */
export default function GoogleAnalytics() {
  const granted = useSyncExternalStore(subscribeConsentChange, getSnapshot, getServerSnapshot);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ window.dataLayer.push(arguments); }
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      {granted && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){ window.dataLayer.push(arguments); }
              window.gtag = gtag;
              gtag('consent', 'update', { analytics_storage: 'granted' });
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}

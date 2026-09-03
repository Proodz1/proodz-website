"use client";
import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { getStoredConsent, setStoredConsent, subscribeConsentChange } from "@/lib/consent";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const interFont = "var(--font-inter), 'Inter', sans-serif";

function getSnapshot() {
  return getStoredConsent() === null;
}

function getServerSnapshot() {
  return false;
}

export default function ConsentBanner() {
  const { t } = useLang();
  const notYetResponded = useSyncExternalStore(subscribeConsentChange, getSnapshot, getServerSnapshot);
  // Once the visitor responds, hide immediately in this tab even though
  // localStorage (read by the store above) updates a tick later.
  const [dismissed, setDismissed] = useState(false);
  const visible = Boolean(GA_MEASUREMENT_ID) && notYetResponded && !dismissed;

  const respond = (value: "granted" | "denied") => {
    setStoredConsent(value);
    setDismissed(true);
  };

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label={t.cookieConsent.message}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "fixed",
            left: 16,
            right: 16,
            bottom: 16,
            zIndex: 1200,
            maxWidth: 640,
            margin: "0 auto",
            background: "#071B45",
            color: "#FFFFFF",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.28)",
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            fontFamily: interFont,
          }}
        >
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", margin: 0 }}>
            {t.cookieConsent.message}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => respond("granted")}
              style={{
                background: "#4361EE",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 13.5,
                padding: "10px 20px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer",
                fontFamily: interFont,
              }}
            >
              {t.cookieConsent.accept}
            </button>
            <button
              type="button"
              onClick={() => respond("denied")}
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 600,
                fontSize: 13.5,
                padding: "10px 20px",
                borderRadius: 9,
                border: "1px solid rgba(255,255,255,0.22)",
                cursor: "pointer",
                fontFamily: interFont,
              }}
            >
              {t.cookieConsent.reject}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

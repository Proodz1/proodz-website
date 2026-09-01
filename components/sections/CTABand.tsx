"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import { IconPhone, IconMail, IconCheck } from "../icons/Icons";

export default function CTABand() {
  const { t } = useLang();

  return (
    <section style={{ position: "relative", padding: "120px 24px", overflow: "hidden", isolation: "isolate" }}>
      <Image
        src="/banners/banner2.jpg"
        alt={t.ctaBand.bannerAlt}
        fill
        sizes="100vw"
        className="cta-band-bg"
        style={{ objectFit: "cover", objectPosition: "center 30%" }}
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/visual-placeholder.svg"; }}
      />

      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, rgba(7,27,69,0.74) 0%, rgba(7,27,69,0.86) 55%, rgba(7,27,69,0.97) 100%)", pointerEvents: "none" }} />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{ position: "relative", zIndex: 2, maxWidth: 620, margin: "0 auto", textAlign: "center" }}
      >
        <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#FFFFFF", margin: "0 0 14px" }}>
          {t.ctaBand.title1}<span style={{ color: "#6B8AFF" }}>{t.ctaBand.title2}</span>
        </h2>
        <p style={{ fontSize: "clamp(16px, 2vw, 18px)", fontWeight: 600, color: "#FFFFFF", margin: "0 0 10px", lineHeight: 1.5 }}>
          {t.ctaBand.subtitle}
        </p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", margin: "0 auto 32px", lineHeight: 1.7, maxWidth: 540 }}>
          {t.ctaBand.supporting}
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.a
            href="tel:+21694809417"
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 44px rgba(65,105,255,0.5)" }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 12, textDecoration: "none", boxShadow: "0 8px 32px rgba(65,105,255,0.35)" }}
          >
            <IconPhone size={18} /> +216 94 809 417
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.18)", borderColor: "rgba(255,255,255,0.55)" }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "#FFFFFF", fontWeight: 600, fontSize: 16, padding: "14px 32px", borderRadius: 12, textDecoration: "none", border: "1px solid rgba(255,255,255,0.32)", backdropFilter: "blur(4px)" }}
          >
            <IconMail size={18} /> {t.ctaBand.formBtn}
          </motion.a>
        </div>

        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 26, flexWrap: "wrap" }}>
          {t.ctaBand.checks.map((c) => (
            <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
              <IconCheck size={14} color="#6B8AFF" /> {c}
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .cta-band-bg { object-position: center 20% !important; }
        }
      `}</style>
    </section>
  );
}

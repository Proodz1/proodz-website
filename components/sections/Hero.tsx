"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { heroTitle, heroSubtitle, heroButtons, heroStats } from "../animations/variants";
import { useCountUp } from "@/hooks/useCountUp";
import { useLang } from "@/i18n/LanguageContext";

const statValues = [
  { value: 10, prefix: "+", suffix: "" },
  { value: 3, prefix: "", suffix: "" },
  { value: 3, prefix: "", suffix: "" },
  { value: 4, prefix: "", suffix: "+" },
];

function AnimatedStat({ value, prefix, suffix, label }: { value: number; prefix: string; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref} style={{ textAlign: "center", minWidth: 0 }}>
      <div style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, color: "#6B8AFF", lineHeight: 1 }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 8, lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="accueil"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#FFFFFF",
        minHeight: "clamp(600px, 80vh, 680px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "88px 24px 56px",
        textAlign: "center",
      }}
    >
      <div className="hero-bg-layer" style={{ position: "absolute", top: 68, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>
        <Image
          src="/assets/banners/6-3.jpg"
          alt={t.hero.bannerAlt}
          fill
          sizes="100vw"
          priority
          className="hero-bg"
          style={{ objectFit: "cover", objectPosition: "center 32%" }}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/assets/visual-placeholder.svg"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,18,45,0.55)", pointerEvents: "none" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680, width: "100%" }}>
        <motion.div variants={heroTitle} initial="hidden" animate="visible" style={{ marginBottom: 14 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(65,105,255,0.18)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 999, padding: "6px 18px", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#FFFFFF" }}>
            {t.hero.badge}
          </span>
        </motion.div>

        <motion.h1 variants={heroTitle} initial="hidden" animate="visible" style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(30px, 5.5vw, 54px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 12px", color: "#FFFFFF" }}>
          {t.hero.title1}<br /><span style={{ color: "#6B8AFF" }}>{t.hero.title2}</span>
        </motion.h1>

        <motion.p variants={heroSubtitle} initial="hidden" animate="visible" style={{ fontSize: "clamp(15px, 2vw, 17px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, maxWidth: 460, margin: "0 auto 32px" }}>
          {t.hero.subtitle}
        </motion.p>

        <motion.div variants={heroButtons} initial="hidden" animate="visible" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 26 }}>
          <motion.a href="/portfolio" data-ga-event="cta_click" data-ga-label="hero_portfolio" whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(65,105,255,0.45)" }} whileTap={{ scale: 0.98 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4361EE", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, textDecoration: "none", transition: "background 0.2s" }}>
            {t.hero.cta1} →
          </motion.a>
          <motion.a href="/contact" data-ga-event="cta_click" data-ga-label="hero_audit_gratuit" whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.16)" }} whileTap={{ scale: 0.98 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", color: "#FFFFFF", fontWeight: 500, fontSize: 15, padding: "14px 32px", borderRadius: 10, textDecoration: "none", border: "1px solid rgba(255,255,255,0.4)", backdropFilter: "blur(6px)" }}>
            {t.hero.cta2}
          </motion.a>
        </motion.div>

        <motion.div variants={heroStats} initial="hidden" animate="visible" className="hero-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, padding: "18px 28px 16px", background: "rgba(5,18,45,0.35)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, maxWidth: 620, margin: "0 auto" }}>
          {statValues.map((s, i) => (
            <AnimatedStat key={i} {...s} label={t.hero.stats[i].label} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #accueil { min-height: 600px; padding: 84px 20px 48px; }
          .hero-stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 480px) {
          #accueil { min-height: 580px; }
        }
      `}</style>
    </section>
  );
}

// Last touched: 2026-09-03T21:27:12.2832618+01:00

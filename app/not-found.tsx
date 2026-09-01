"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { useLang } from "@/i18n/LanguageContext";
import { IconArrowRight } from "@/components/icons/Icons";

const spaceFont = "var(--font-space), 'Space Grotesk', sans-serif";

export default function NotFound() {
  const { t } = useLang();

  return (
    <main style={{ background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <ScrollProgress />
      <Navbar />

      <section style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,105,255,0.08) 0%, transparent 70%)", top: -200, right: -140, pointerEvents: "none" }} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 1, maxWidth: 560, textAlign: "center" }}
        >
          <div style={{ fontFamily: spaceFont, fontSize: "clamp(88px, 18vw, 160px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", color: "#4361EE" }}>
            {t.notFound.code}
          </div>
          <h1 style={{ fontFamily: spaceFont, fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", margin: "8px 0 14px" }}>
            {t.notFound.title}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(10,10,10,0.6)", lineHeight: 1.7, margin: "0 0 36px" }}>
            {t.notFound.subtitle}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 44px rgba(65,105,255,0.5)" }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 28px", borderRadius: 12, textDecoration: "none", boxShadow: "0 8px 32px rgba(65,105,255,0.35)" }}
            >
              <span style={{ display: "inline-flex", transform: "scaleX(-1)" }}><IconArrowRight size={16} /></span> {t.notFound.cta}
            </motion.a>
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05, background: "rgba(67,97,238,0.05)", borderColor: "rgba(67,97,238,0.5)" }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FFFFFF", color: "#4361EE", fontWeight: 600, fontSize: 15, padding: "13px 28px", borderRadius: 12, textDecoration: "none", border: "1px solid rgba(67,97,238,0.32)" }}
            >
              {t.notFound.back} <IconArrowRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

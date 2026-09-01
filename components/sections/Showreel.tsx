"use client";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "../animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import { IconPlay } from "../icons/Icons";

export default function Showreel() {
  const { t } = useLang();

  return (
    <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4361EE", display: "block", marginBottom: 8 }}>{t.showreel.label}</span>
        <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: 32 }}>
          {t.showreel.title1}<span style={{ color: "#4361EE" }}>{t.showreel.title2}</span>
        </h2>
      </motion.div>

      <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ position: "relative", borderRadius: 20, overflow: "hidden", background: "rgba(10,10,10,0.02)", border: "1px solid rgba(10,10,10,0.08)", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.button whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(67,97,238,0.4)" }} whileTap={{ scale: 0.95 }} style={{ width: 72, height: 72, borderRadius: "50%", border: "2px solid rgba(67,97,238,0.4)", background: "rgba(67,97,238,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4361EE" }} aria-label={t.showreel.ariaPlay}>
          <IconPlay size={28} color="#4361EE" />
        </motion.button>
        <p style={{ position: "absolute", bottom: 20, fontSize: 13, color: "rgba(10,10,10,0.35)" }}>{t.showreel.placeholder}</p>
      </motion.div>
    </section>
  );
}

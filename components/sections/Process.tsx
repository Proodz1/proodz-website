"use client";
import { motion } from "framer-motion";
import { fadeInUp, timelineStep } from "../animations/variants";
import { useLang } from "@/i18n/LanguageContext";

const nums = ["01", "02", "03", "04", "05"];

export default function Process() {
  const { t } = useLang();

  return (
    <section id="methode" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ textAlign: "center", marginBottom: 60 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4361EE", display: "block", marginBottom: 8 }}>{t.process.label}</span>
        <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: 4 }}>
          {t.process.title1}<span style={{ color: "#4361EE" }}>{t.process.title2}</span>
        </h2>
        <div style={{ width: 40, height: 3, background: "#4361EE", borderRadius: 2, margin: "0 auto 8px" }} />
        <p style={{ fontSize: 15, color: "rgba(10,10,15,0.5)" }}>{t.process.subtitle}</p>
      </motion.div>

      <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
        <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #4361EE, rgba(67,97,238,0.1))", transformOrigin: "top" }} className="timeline-line" />

        {t.process.steps.map((step, i) => (
          <motion.div key={nums[i]} variants={timelineStep(i)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: i < 4 ? 48 : 0, flexDirection: i % 2 === 0 ? "row" : "row-reverse" }} className="timeline-step">
            <div style={{ flex: 1, textAlign: i % 2 === 0 ? "right" : "left" }}>
              <div style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 800, color: "#4361EE", marginBottom: 4 }}>{nums[i]}</div>
              <h3 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(10,10,15,0.5)", lineHeight: 1.5 }}>{step.desc}</p>
            </div>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#4361EE", border: "3px solid #FFFFFF", boxShadow: "0 0 16px rgba(67,97,238,0.4)", flexShrink: 0, zIndex: 1 }} />
            <div style={{ flex: 1 }} />
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line { left: 20px !important; }
          .timeline-step { flex-direction: row !important; }
          .timeline-step > div:first-child { text-align: left !important; }
          .timeline-step > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}

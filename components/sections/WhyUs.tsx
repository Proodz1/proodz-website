"use client";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import { IconTarget, IconTrendingUp, IconGlobe } from "../icons/Icons";
import { ReactNode } from "react";

const proofIcons: ReactNode[] = [
  <IconTarget key="strategy" size={24} color="#4361EE" />,
  <IconTrendingUp key="acquisition" size={24} color="#4361EE" />,
  <IconGlobe key="transformation" size={24} color="#4361EE" />,
];

export default function WhyUs() {
  const { t } = useLang();

  return (
    <section style={{ position: "relative", padding: "100px 24px 110px", background: "#FFFFFF", borderTop: "1px solid rgba(10,10,10,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4361EE", display: "block", marginBottom: 14 }}>
            {t.whyUs.label}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              whiteSpace: "pre-line",
              margin: 0,
              lineHeight: 1.1,
              color: "#071B45",
            }}
          >
            {t.whyUs.title1}
            <span style={{ color: "#4361EE" }}>{t.whyUs.title2}</span>
          </h2>
          <div style={{ width: 48, height: 3, background: "#4169FF", borderRadius: 2, margin: "16px auto 18px" }} />
          <p style={{ fontSize: 15, color: "rgba(10,10,10,0.6)", lineHeight: 1.7, maxWidth: 720, margin: "0 auto" }}>
            {t.whyUs.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="why-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, alignItems: "stretch" }}
        >
          {t.whyUs.cards.map((card, i) => (
            <motion.div key={card.title} variants={staggerItem} style={{ height: "100%" }}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 18px 40px rgba(67,97,238,0.14), 0 0 0 1px rgba(67,97,238,0.35)" }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  background: "#FFFFFF",
                  border: "1px solid rgba(10,10,10,0.08)",
                  borderRadius: 18,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: "rgba(67,97,238,0.08)",
                    border: "1px solid rgba(67,97,238,0.16)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginBottom: 20,
                  }}
                >
                  {proofIcons[i]}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
                    fontSize: 17,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    color: "#071B45",
                    margin: "0 0 10px",
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: "rgba(10,10,10,0.62)", lineHeight: 1.7, margin: "0 0 20px", flex: 1 }}>
                  {card.desc}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        color: "rgba(10,10,10,0.6)",
                        background: "rgba(10,10,10,0.045)",
                        border: "1px solid rgba(10,10,10,0.08)",
                        borderRadius: 6,
                        padding: "3px 10px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 44 }}
        >
          <motion.a
            href="/contact"
            whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(65,105,255,0.45)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.01em",
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #4169FF 0%, #4361EE 100%)",
              border: "1px solid transparent",
              borderRadius: 12,
              padding: "14px 28px",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {t.whyUs.ctaPrimary} →
          </motion.a>
          <motion.a
            href="/accompagnement"
            whileHover={{ y: -2, borderColor: "rgba(67,97,238,0.7)", background: "rgba(67,97,238,0.05)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.01em",
              color: "#071B45",
              background: "transparent",
              border: "1px solid rgba(7,27,69,0.25)",
              borderRadius: 12,
              padding: "14px 28px",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {t.whyUs.ctaSecondary} →
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

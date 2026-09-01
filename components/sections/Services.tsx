"use client";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import { IconRocket, IconCode, IconTrendingUp, IconLightbulb, IconMessageCircle, IconLineChart } from "../icons/Icons";
import { ReactNode } from "react";

const icons: ReactNode[] = [
  <IconRocket key="strategy" size={20} color="#6B8AFF" />,
  <IconCode key="web" size={20} color="#6B8AFF" />,
  <IconTrendingUp key="marketing" size={20} color="#6B8AFF" />,
  <IconLightbulb key="brand" size={20} color="#6B8AFF" />,
  <IconMessageCircle key="content" size={20} color="#6B8AFF" />,
  <IconLineChart key="growth" size={20} color="#6B8AFF" />,
];

export default function Services() {
  const { t } = useLang();

  return (
    <section
      id="accompagnement"
      style={{
        position: "relative",
        padding: "100px 24px",
        background: "var(--navy)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "-25%", left: "-12%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,105,255,0.18) 0%, transparent 65%)", filter: "blur(30px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-28%", right: "-12%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,105,255,0.13) 0%, transparent 65%)", filter: "blur(30px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: 56, maxWidth: 580 }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B8AFF", display: "block", marginBottom: 10 }}>
            {t.services.label}
          </span>
          <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#FFFFFF", margin: 0, lineHeight: 1.1 }}>
            {t.services.title1}<span style={{ color: "#4169FF" }}>{t.services.title2}</span>
          </h2>
          <div style={{ width: 48, height: 3, background: "#4169FF", borderRadius: 2, margin: "12px 0 14px" }} />
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, margin: 0 }}>{t.services.subtitle}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}
          className="services-grid"
        >
          {t.services.items.map((s, i) => (
            <motion.div key={s.title} variants={staggerItem}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(3,10,30,0.5), 0 0 0 1px rgba(65,105,255,0.4)" }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="expertise-card"
                  style={{
                    position: "relative",
                    width: "100%",
                    background: "rgba(255,255,255,0.045)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 18,
                    padding: 28,
                    minHeight: 250,
                    height: "100%",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(65,105,255,0.16)", border: "1px solid rgba(65,105,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 18 }}>
                    {icons[i]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", color: "#FFFFFF", marginBottom: 10 }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.65, margin: "0 0 18px" }}>{s.desc}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {s.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "3px 10px", letterSpacing: "0.02em" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

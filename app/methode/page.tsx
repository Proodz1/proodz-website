"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageHero from "@/components/sections/PageHero";
import { fadeInUp, staggerContainer, staggerItem } from "@/components/animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import {
  IconTarget, IconZap, IconRefresh, IconHandshake, IconBarChart, IconShield,
  IconCheck, IconArrowRight,
} from "@/components/icons/Icons";

const principleIcons: ReactNode[] = [
  <IconTarget key="p0" size={28} color="#4361EE" />,
  <IconZap key="p1" size={28} color="#4361EE" />,
  <IconRefresh key="p2" size={28} color="#4361EE" />,
  <IconHandshake key="p3" size={28} color="#4361EE" />,
  <IconBarChart key="p4" size={28} color="#4361EE" />,
  <IconShield key="p5" size={28} color="#4361EE" />,
];

export default function MethodePage() {
  const { t } = useLang();

  return (
    <main style={{ background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh" }}>
      <ScrollProgress />
      <Navbar initialSolid />

      {/* HERO */}
      <PageHero badge={t.methode.label} title1={t.methode.title1} title2={t.methode.title2} supporting={t.methode.subtitle}>
        <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { value: "5", label: t.methode.statsLabels[0] },
            { value: "2-8", label: t.methode.statsLabels[1] },
            { value: "100%", label: t.methode.statsLabels[2] },
            { value: "24h", label: t.methode.statsLabels[3] },
          ].map((s) => (
            <div key={s.label}>
              <span style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: "#FFFFFF" }}>{s.value}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginLeft: 6 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <section style={{ padding: "0 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
        {t.methode.steps.map((step, i) => (
          <motion.div
            key={step.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr",
              gap: 40,
              padding: "48px 0",
              borderBottom: i < t.methode.steps.length - 1 ? "1px solid rgba(10,10,10,0.08)" : "none",
              alignItems: "start",
            }}
            className="method-step-grid"
          >
            <div style={{ position: "relative" }}>
              <motion.div
                whileInView={{ scale: [0.8, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "rgba(67,97,238,0.08)",
                  border: "1px solid rgba(67,97,238,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#4361EE",
                }}
              >
                0{i + 1}
              </motion.div>
              {i < t.methode.steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{
                    position: "absolute",
                    left: 31,
                    top: 72,
                    width: 2,
                    height: "calc(100% + 40px)",
                    background: "linear-gradient(to bottom, rgba(67,97,238,0.2), rgba(67,97,238,0.03))",
                    transformOrigin: "top",
                  }}
                  className="method-line"
                />
              )}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, textTransform: "uppercase", margin: 0 }}>
                  {step.title}
                </h2>
                <span style={{ fontSize: 11, color: "rgba(10,10,10,0.25)", background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.06)", padding: "3px 10px", borderRadius: 6, fontWeight: 600 }}>
                  {step.duration}
                </span>
              </div>
              <p style={{ fontSize: 14, color: "#4361EE", fontWeight: 500, marginBottom: 14 }}>{step.subtitle}</p>
               <p style={{ fontSize: 14, color: "rgba(10,10,10,0.4)", lineHeight: 1.75, marginBottom: 20 }}>{step.desc}</p>

              <motion.div
                whileHover={{ scale: 1.01, borderColor: "rgba(67,97,238,0.2)" }}
                style={{
                  background: "rgba(67,97,238,0.05)",
                  border: "1px solid rgba(67,97,238,0.1)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <IconArrowRight size={12} color="#4361EE" />
                <span style={{ fontSize: 13, color: "rgba(10,10,10,0.6)", fontWeight: 600 }}>{step.output}</span>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
                <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(10,10,10,0.3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                {t.methode.checklistLabel}
              </p>
              {step.checklist.map((task) => (
                <motion.div
                  key={task}
                  variants={staggerItem}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(10,10,10,0.02)",
                  }}
                >
                  <div style={{ width: 18, height: 18, borderRadius: 5, border: "1px solid rgba(67,97,238,0.2)", background: "rgba(67,97,238,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconCheck size={10} color="#4361EE" />
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(10,10,10,0.5)" }}>{task}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </section>

      <section style={{ padding: "60px 24px 80px", background: "linear-gradient(135deg, rgba(67,97,238,0.04) 0%, transparent 100%)", borderTop: "1px solid rgba(10,10,10,0.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4361EE", display: "block", marginBottom: 8 }}>
              {t.methode.principlesLabel}
            </span>
            <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, textTransform: "uppercase" }}>
              {t.methode.principlesTitle1}<span style={{ color: "#4361EE" }}>{t.methode.principlesTitle2}</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
            className="principles-grid"
          >
            {t.methode.principles.map((p, i) => (
              <motion.div
                key={p.title}
                variants={staggerItem}
                whileHover={{ y: -6, borderColor: "rgba(67,97,238,0.15)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
                style={{
                background: "#FFFFFF",
                border: "1px solid rgba(10,10,10,0.08)",
                borderRadius: 16,
                padding: "24px 20px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                transition: "all 0.25s",
                }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ marginBottom: 14 }}
                >
                  {principleIcons[i]}
                </motion.div>
                <h3 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 13, color: "rgba(10,10,10,0.4)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "60px 24px 80px", textAlign: "center" }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, textTransform: "uppercase", marginBottom: 10 }}>
            {t.methode.ctaTitle.split(" ").slice(0, -1).join(" ")} <span style={{ color: "#4361EE" }}>{t.methode.ctaTitle.split(" ").pop()}</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(10,10,10,0.4)", marginBottom: 28 }}>
            {t.methode.ctaSubtitle}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 40px rgba(67,97,238,0.35)" }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4361EE", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, textDecoration: "none", boxShadow: "0 0 24px rgba(67,97,238,0.2)" }}
            >
              {t.methode.ctaBtn} <IconArrowRight size={16} />
            </motion.a>
            <motion.a
              href="/accompagnement"
              whileHover={{ scale: 1.05, borderColor: "rgba(67,97,238,0.3)" }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "rgba(10,10,10,0.6)", fontWeight: 600, fontSize: 15, padding: "14px 32px", borderRadius: 10, textDecoration: "none", border: "1px solid rgba(10,10,10,0.1)" }}
            >
              {t.methode.ctaSeeExpertises}
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .method-step-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .method-line { display: none !important; }
          .principles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

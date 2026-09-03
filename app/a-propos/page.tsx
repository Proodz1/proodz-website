"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageHero from "@/components/sections/PageHero";
import { fadeInUp, staggerContainer, staggerItem } from "@/components/animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import {
  IconTarget, IconZap, IconRefresh, IconHandshake, IconBarChart, IconShield,
  IconMapPin, IconArrowRight,
} from "@/components/icons/Icons";

const spaceFont = "var(--font-space), 'Space Grotesk', sans-serif";

const engagementIcons: ReactNode[] = [
  <IconTarget key="e0" size={26} color="#4361EE" />,
  <IconZap key="e1" size={26} color="#4361EE" />,
  <IconRefresh key="e2" size={26} color="#4361EE" />,
  <IconHandshake key="e3" size={26} color="#4361EE" />,
  <IconBarChart key="e4" size={26} color="#4361EE" />,
  <IconShield key="e5" size={26} color="#4361EE" />,
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://proodz.com/a-propos#aboutpage",
  url: "https://proodz.com/a-propos",
  name: "À propos de Proodz",
  isPartOf: { "@id": "https://proodz.com/#website" },
  about: { "@id": "https://proodz.com/#organization" },
};

export default function AboutPage() {
  const { t } = useLang();
  const a = t.aboutPage;

  return (
    <main style={{ background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <ScrollProgress />
      <Navbar initialSolid />

      <PageHero badge={a.label} title1={a.title1} title2={a.title2} supporting={a.intro} titleSize="clamp(36px, 6.5vw, 72px)" />

      {/* MISSION */}
      <section style={{ padding: "88px 24px 0", maxWidth: 1160, margin: "0 auto" }}>
        <div className="mission-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mission-image-wrap"
            style={{
              position: "relative",
              borderRadius: 22,
              overflow: "hidden",
              aspectRatio: "3 / 4",
              boxShadow: "0 24px 60px rgba(7,27,69,0.22)",
              border: "1px solid rgba(7,27,69,0.08)",
            }}
          >
            <Image
              src="/banners/office.jpg"
              alt="Le logo Proodz gravé sur un mur en béton — symbole de la continuité et de la précision qui guident notre approche"
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              style={{ objectFit: "cover" }}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/visual-placeholder.svg"; }}
            />
          </motion.div>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.01em", color: "#4361EE", margin: "0 0 18px" }}>
              {a.missionTitle}
            </h2>
            <p style={{ fontFamily: spaceFont, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, lineHeight: 1.45, color: "#071B45", margin: 0 }}>
              {a.missionText}
            </p>
            <div style={{ width: 48, height: 3, background: "#4169FF", borderRadius: 2, margin: "26px 0 0" }} />
          </motion.div>
        </div>
      </section>

      {/* VALUE ADD */}
      <section style={{ padding: "56px 24px 0", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ textAlign: "center", marginBottom: 36, background: "#4361EE", borderRadius: 20, padding: "36px 24px" }}
        >
          <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.01em", color: "#FFFFFF", margin: "0 0 12px" }}>
            {a.valueAddTitle}
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", margin: "0 auto", maxWidth: 640 }}>{a.valueAddSubtitle}</p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="about-values-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
        >
          {t.whyUs.cards.map((card) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              whileHover={{ y: -6, boxShadow: "0 18px 40px rgba(67,97,238,0.32)" }}
              transition={{ duration: 0.25 }}
              style={{ background: "#4361EE", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 26 }}
            >
              <h3 style={{ fontFamily: spaceFont, fontSize: 15.5, fontWeight: 800, textTransform: "uppercase", margin: "0 0 10px", color: "#FFFFFF" }}>{card.title}</h3>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, margin: "0 0 16px" }}>{card.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {card.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: "#FFFFFF", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 6, padding: "3px 10px" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* HISTORY */}
      <section style={{ padding: "72px 24px", maxWidth: 900, margin: "0 auto" }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.01em", color: "#4361EE", margin: "0 0 18px" }}>
            {a.historyTitle}
          </h2>
          <p style={{ fontSize: 15.5, color: "rgba(10,10,10,0.65)", lineHeight: 1.8, margin: 0 }}>
            {a.historyText}
          </p>
        </motion.div>
      </section>

      {/* EXPERIENCE STATS */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="about-stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, padding: "32px 24px", background: "#071B45", borderRadius: 20 }}
        >
          {a.experienceStats.map((s) => (
            <motion.div key={s.label} variants={staggerItem} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: spaceFont, fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800, color: "#6B8AFF" }}>{s.value}</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", marginTop: 6 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* VALUES / COMMITMENTS */}
      <section style={{ padding: "0 24px 84px", background: "linear-gradient(135deg, rgba(67,97,238,0.04) 0%, transparent 100%)", paddingTop: 72 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.01em", color: "#4361EE", margin: "0 0 12px" }}>
              {a.valuesTitle}
            </h2>
            <p style={{ fontSize: 15, color: "rgba(10,10,10,0.55)", margin: 0 }}>{a.valuesSubtitle}</p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="about-values-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {t.methode.principles.map((p, i) => (
              <motion.div
                key={p.title}
                variants={staggerItem}
                whileHover={{ y: -6, borderColor: "rgba(67,97,238,0.15)", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                style={{ background: "#FFFFFF", border: "1px solid rgba(10,10,10,0.08)", borderRadius: 16, padding: "24px 20px", transition: "all 0.25s" }}
              >
                <div style={{ marginBottom: 14 }}>{engagementIcons[i]}</div>
                <h3 style={{ fontFamily: spaceFont, fontSize: 15, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(10,10,10,0.5)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GEO */}
      <section style={{ padding: "0 24px 84px", maxWidth: 900, margin: "0 auto" }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(67,97,238,0.08)", border: "1px solid rgba(67,97,238,0.16)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <IconMapPin size={20} color="#4361EE" />
          </span>
          <div>
            <h2 style={{ fontFamily: spaceFont, fontSize: 17, fontWeight: 800, textTransform: "uppercase", margin: "0 0 6px" }}>{a.geoTitle}</h2>
            <p style={{ fontSize: 14.5, color: "rgba(10,10,10,0.6)", lineHeight: 1.7, margin: 0 }}>{a.geoText}</p>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "var(--navy)", padding: "56px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: spaceFont, fontSize: "clamp(24px, 3.4vw, 36px)", fontWeight: 800, textTransform: "uppercase", color: "#FFFFFF", margin: "0 0 14px" }}
          >
            {a.ctaTitle1}<span style={{ color: "#6B8AFF" }}>{a.ctaTitle2}</span>
          </motion.h2>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.75)", maxWidth: 520, margin: "0 auto 26px", lineHeight: 1.7 }}>
            {a.ctaText}
          </p>
          <motion.a
            href="/contact"
            data-ga-event="cta_click"
            data-ga-label="about_diagnostic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ scale: 1.04, y: -1, boxShadow: "0 10px 34px rgba(65,105,255,0.45)" }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#FFFFFF", fontWeight: 700, fontSize: 15, padding: "14px 30px", borderRadius: 12, textDecoration: "none" }}
          >
            {a.ctaBtn} <IconArrowRight size={16} />
          </motion.a>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .mission-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .mission-image-wrap { max-width: 340px; margin: 0 auto; aspect-ratio: 4 / 3 !important; }
        }
        @media (max-width: 768px) {
          .about-stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .about-values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { fadeInUp, staggerContainer, staggerItem } from "@/components/animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import { getSector, buildSector } from "@/lib/sectors";
import type { SectorFull, SectorLang } from "@/lib/sectors";
import { getClientByName, clientText } from "@/lib/portfolio-data";
import { IconArrowRight } from "@/components/icons/Icons";
import {
  IconRocket, IconCode, IconTrendingUp, IconLightbulb, IconMessageCircle, IconLineChart,
  IconTarget, IconGlobe,
} from "@/components/icons/Icons";

const spaceFont = "var(--font-space), 'Space Grotesk', sans-serif";
const interFont = "var(--font-inter), 'Inter', sans-serif";

const serviceIcons: ReactNode[] = [
  <IconRocket key="s0" size={20} color="#6B8AFF" />,
  <IconCode key="s1" size={20} color="#6B8AFF" />,
  <IconTrendingUp key="s2" size={20} color="#6B8AFF" />,
  <IconLightbulb key="s3" size={20} color="#6B8AFF" />,
  <IconMessageCircle key="s4" size={20} color="#6B8AFF" />,
  <IconLineChart key="s5" size={20} color="#6B8AFF" />,
];

const approachIcons: ReactNode[] = [
  <IconTarget key="a0" size={22} color="#4361EE" />,
  <IconGlobe key="a1" size={22} color="#4361EE" />,
  <IconTrendingUp key="a2" size={22} color="#4361EE" />,
  <IconLineChart key="a3" size={22} color="#4361EE" />,
];

function SectionHeader({ eyebrow, title, highlight, subtitle }: { eyebrow: string; title: string; highlight?: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ textAlign: "center", marginBottom: 48 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4361EE", display: "block", marginBottom: 12 }}>
        {eyebrow}
      </span>
      <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(24px, 3.6vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", margin: 0, lineHeight: 1.1, color: "#071B45" }}>
        {title}
        {highlight && <span style={{ color: "#4361EE" }}> {highlight}</span>}
      </h2>
      <div style={{ width: 48, height: 3, background: "#4169FF", borderRadius: 2, margin: "14px auto 0" }} />
      {subtitle && <p style={{ fontSize: 15, color: "rgba(10,10,10,0.6)", lineHeight: 1.7, maxWidth: 640, margin: "16px auto 0" }}>{subtitle}</p>}
    </motion.div>
  );
}

function FaqItem({ index, q, a, open, onToggle }: { index: number; q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(10,10,10,0.08)" }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`sector-faq-panel-${index}`}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
          fontFamily: interFont,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: open ? "#4361EE" : "rgba(10,10,10,0.78)", transition: "color 0.2s" }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 20, color: "#4361EE", flexShrink: 0, fontWeight: 300, width: 26, height: 26, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "1px solid rgba(67,97,238,0.25)" }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        id={`sector-faq-panel-${index}`}
        role="region"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <p style={{ fontSize: 14, color: "rgba(10,10,10,0.6)", lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>{a}</p>
      </motion.div>
    </div>
  );
}

export default function SectorClient({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sector = getSector(slug);
  if (!sector) return null;
  const content: SectorFull = buildSector(sector, lang as SectorLang);
  const isFr = lang === "fr";
  const navy = content.heroTheme === "navy";
  const contactHref = (idx?: number) => (idx === undefined ? `/contact?section=${slug}` : `/contact?service=${idx}&section=${slug}`);

  const projects = content.projectIds.map((id) => getClientByName(id)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const services = content.serviceIndexes.map((i) => t.services.items[i]).filter(Boolean);

  return (
    <main style={{ background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh" }}>
      <ScrollProgress />
      <Navbar />

      {/* HERO */}
      <section style={{ position: "relative", padding: "128px 24px 72px", overflow: "hidden", background: navy ? "#071B45" : "#FFFFFF", textAlign: "center" }}>
        <div style={{ position: "absolute", width: 620, height: 620, borderRadius: "50%", background: navy ? "radial-gradient(circle, rgba(91,124,255,0.18) 0%, rgba(91,124,255,0.05) 50%, transparent 70%)" : "radial-gradient(circle, rgba(65,105,255,0.07) 0%, rgba(65,105,255,0.02) 50%, transparent 70%)", top: -260, right: -160, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: navy ? "radial-gradient(circle, rgba(91,124,255,0.14) 0%, transparent 70%)" : "radial-gradient(circle, rgba(65,105,255,0.06) 0%, transparent 70%)", bottom: -280, left: -180, pointerEvents: "none" }} />
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: navy ? "#8AA7FF" : "#4169FF", display: "inline-block", background: navy ? "rgba(91,124,255,0.14)" : "rgba(65,105,255,0.08)", border: navy ? "1px solid rgba(91,124,255,0.35)" : "1px solid rgba(65,105,255,0.2)", borderRadius: 999, padding: "6px 18px", marginBottom: 22 }}>
            {content.heroLabelFull ?? content.heroLabel + content.name.toUpperCase()}
          </span>
          <h1 style={{ fontFamily: spaceFont, fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 1.08, margin: "0 0 16px", color: navy ? "#FFFFFF" : "#0A0A0A" }}>
            {content.headline}
            <br />
            <span style={{ color: "#4169FF" }}>{content.headlineHighlight}</span>
          </h1>
          <div style={{ width: 44, height: 3, background: "#4169FF", borderRadius: 2, margin: "0 auto 20px" }} />
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: navy ? "rgba(255,255,255,0.72)" : "rgba(10,10,10,0.65)", lineHeight: 1.7, maxWidth: 680, margin: "0 auto 36px" }}>
            {content.description}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href={contactHref(content.ctaPrimaryService)}
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 44px rgba(65,105,255,0.5)" }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 30px", borderRadius: 12, textDecoration: "none", boxShadow: "0 8px 32px rgba(65,105,255,0.35)" }}
            >
              {content.ctaPrimary} →
            </motion.a>
            <motion.a
              href={contactHref(content.ctaSecondaryService)}
              whileHover={{ scale: 1.05, borderColor: navy ? "rgba(138,167,255,0.8)" : "rgba(67,97,238,0.7)", background: navy ? "rgba(91,124,255,0.12)" : "rgba(67,97,238,0.05)" }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: navy ? "#FFFFFF" : "#071B45", fontWeight: 700, fontSize: 15, padding: "14px 30px", borderRadius: 12, textDecoration: "none", border: navy ? "1px solid rgba(138,167,255,0.4)" : "1px solid rgba(7,27,69,0.25)" }}
            >
              {content.ctaSecondary} →
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* CHALLENGES */}
      <section style={{ padding: "90px 24px 96px", background: "#FFFFFF", borderTop: "1px solid rgba(10,10,10,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader eyebrow={t.sectors.label} title={content.challengesTitle} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="sector-challenges"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}
          >
            {content.challenges.map((c, i) => (
              <motion.div
                key={c.title}
                variants={staggerItem}
                whileHover={{ y: -6, borderColor: "rgba(67,97,238,0.35)", boxShadow: "0 18px 40px rgba(67,97,238,0.12)" }}
                style={{ background: "#FFFFFF", border: "1px solid rgba(10,10,10,0.08)", borderRadius: 18, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12, height: "100%" }}
              >
                <div style={{ fontFamily: spaceFont, fontSize: 28, fontWeight: 800, color: "rgba(67,97,238,0.35)", letterSpacing: "-0.02em" }}>
                  {isFr ? `0${i + 1}` : `0${i + 1}`}
                </div>
                <h3 style={{ fontFamily: spaceFont, fontSize: 17, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "#071B45", margin: 0 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(10,10,10,0.62)", lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* APPROACH */}
      <section style={{ padding: "90px 24px 96px", background: "#F7F9FC", borderTop: "1px solid rgba(10,10,10,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader eyebrow={t.sectors.label} title={content.approachTitle} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="sector-approach"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}
          >
            {content.approach.map((a, i) => (
              <motion.div
                key={a.title}
                variants={staggerItem}
                whileHover={{ y: -6, borderColor: "rgba(67,97,238,0.3)", boxShadow: "0 18px 40px rgba(67,97,238,0.1)" }}
                style={{ background: "#FFFFFF", border: "1px solid rgba(10,10,10,0.08)", borderRadius: 18, padding: "26px 22px", display: "flex", flexDirection: "column", gap: 12, height: "100%" }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(67,97,238,0.08)", border: "1px solid rgba(67,97,238,0.16)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {approachIcons[i % approachIcons.length]}
                </div>
                <h3 style={{ fontFamily: spaceFont, fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "#071B45", margin: 0 }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(10,10,10,0.62)", lineHeight: 1.65, margin: 0 }}>{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RECOMMENDED SERVICES */}
      <section style={{ position: "relative", padding: "96px 24px 100px", background: "var(--navy)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-25%", left: "-12%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,105,255,0.18) 0%, transparent 65%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-28%", right: "-12%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,105,255,0.13) 0%, transparent 65%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B8AFF", display: "block", marginBottom: 12 }}>{t.sectors.label}</span>
            <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(24px, 3.6vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#FFFFFF", margin: 0, lineHeight: 1.1 }}>
              {content.servicesTitle}
            </h2>
            <div style={{ width: 48, height: 3, background: "#4169FF", borderRadius: 2, margin: "14px auto 0" }} />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="sector-services"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(3,10,30,0.5), 0 0 0 1px rgba(65,105,255,0.4)" }}
                style={{ position: "relative", width: "100%", background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: 26, height: "100%", display: "flex", flexDirection: "column" }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(65,105,255,0.16)", border: "1px solid rgba(65,105,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 16 }}>
                  {serviceIcons[content.serviceIndexes[i] % serviceIcons.length]}
                </div>
                <h3 style={{ fontFamily: spaceFont, fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", color: "#FFFFFF", margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "96px 24px 100px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader eyebrow={t.sectors.label} title={content.processTitle} />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="sector-process"
            style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 16 }}
          >
            {content.process.map((step, i) => (
              <motion.div key={step.title} variants={staggerItem} style={{ textAlign: "center", padding: "0 10px" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#4169FF", border: "2px solid rgba(65,105,255,0.35)", boxShadow: "0 0 24px rgba(65,105,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: spaceFont, fontSize: 15, fontWeight: 800, color: "#FFFFFF", position: "relative", zIndex: 1 }}>
                  {i + 1}
                </div>
                <h3 style={{ fontFamily: spaceFont, fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "#071B45", margin: "0 0 8px" }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(10,10,10,0.6)", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WORK */}
      {projects.length > 0 && (
      <section style={{ padding: "96px 24px 100px", background: "#F7F9FC", borderTop: "1px solid rgba(10,10,10,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader eyebrow={t.sectors.label} title={content.workTitle} subtitle={content.workSubtitle} />
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {projects.map((client) => {
              const slides = client.projects[0]?.slides.filter((s) => s.src !== "") || [];
              const media = slides.slice(0, 3);
              return (
                <motion.article
                  key={client.name}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 40, padding: 32, border: "1px solid rgba(10,10,10,0.08)", borderRadius: 20, background: "#FFFFFF", alignItems: "start" }}
                  className="sector-work-card"
                >
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#4361EE", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>{clientText(client, lang).sector}</p>
                    <h3 style={{ fontFamily: spaceFont, fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", margin: "0 0 14px", lineHeight: 1.1 }}>{client.name}</h3>
                    <p style={{ fontSize: 14.5, color: "rgba(10,10,10,0.62)", lineHeight: 1.7, margin: "0 0 20px" }}>{clientText(client, lang).description}</p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
                      {clientText(client, lang).tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: "rgba(10,10,10,0.6)", background: "rgba(10,10,10,0.045)", border: "1px solid rgba(10,10,10,0.08)", borderRadius: 6, padding: "4px 11px" }}>{tag}</span>
                      ))}
                    </div>
                    <motion.a
                      href="/portfolio"
                      whileHover={{ x: 4 }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#4361EE", fontWeight: 700, fontSize: 15, textDecoration: "none", borderBottom: "1px solid rgba(67,97,238,0.35)", paddingBottom: 2 }}
                    >
                      {t.portfolio.viewWork} <IconArrowRight size={16} />
                    </motion.a>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                    {media.length > 0 ? (
                      media.map((slide, i) => (
                        <div key={i} style={{ aspectRatio: "4 / 5", borderRadius: 14, overflow: "hidden", background: "#F7F9FC", border: "1px solid rgba(10,10,10,0.08)", position: "relative" }}>
                          <Image src={slide.src} alt={`${client.name} — ${i + 1}`} fill sizes="320px" style={{ objectFit: "contain" }} loading={i < 2 ? "eager" : "lazy"} />
                        </div>
                      ))
                    ) : (
                      <div style={{ gridColumn: "1 / -1", aspectRatio: "4 / 5", borderRadius: 14, background: "#F7F9FC", border: "1px solid rgba(10,10,10,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: spaceFont, fontSize: 20, fontWeight: 800, textTransform: "uppercase", color: "#071B45" }}>
                        {client.name}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* FAQ */}
      <section style={{ padding: "96px 24px 100px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionHeader eyebrow={t.sectors.label} title={content.faqTitle} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            {content.faqs.map((faq, i) => (
              <FaqItem key={i} index={i} q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "var(--navy)", padding: "88px 24px 96px", textAlign: "center" }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, textTransform: "uppercase", color: "#FFFFFF", margin: "0 0 12px", whiteSpace: "pre-line" }}>
            {content.finalTitle}<span style={{ color: "#6B8AFF" }}>{content.finalHighlight}</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: "0 auto 30px", maxWidth: 460 }}>{content.finalSubtitle}</p>
          <motion.a
            href={contactHref(content.ctaPrimaryService)}
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 44px rgba(65,105,255,0.5)" }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 34px", borderRadius: 12, textDecoration: "none", boxShadow: "0 8px 32px rgba(65,105,255,0.35)" }}
          >
            {content.finalCta} →
          </motion.a>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        .sector-challenges { align-items: stretch; }
        .sector-approach { align-items: stretch; }
        .sector-services { align-items: stretch; }
        @media (max-width: 1024px) {
          .sector-challenges { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .sector-approach { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .sector-services { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .sector-process { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 28px 16px !important; }
        }
        @media (max-width: 640px) {
          .sector-challenges { grid-template-columns: 1fr !important; }
          .sector-approach { grid-template-columns: 1fr !important; }
          .sector-services { grid-template-columns: 1fr !important; }
          .sector-process { grid-template-columns: 1fr !important; }
          .sector-work-card { grid-template-columns: 1fr !important; gap: 24px !important; padding: 22px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sector-challenges, .sector-approach, .sector-services, .sector-process, .sector-work-card { transition: none !important; }
        }
      `}</style>
    </main>
  );
}

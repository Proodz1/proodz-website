"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { fadeInUp } from "@/components/animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import { getUxCaseStudy } from "@/lib/ux-cases";
import { IconArrowRight } from "@/components/icons/Icons";

const spaceFont = "var(--font-space), 'Space Grotesk', sans-serif";

function SectionBlock({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} style={{ textAlign: "center", marginBottom: 44 }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4361EE", display: "block", marginBottom: 12 }}>{eyebrow}</span>
      <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(22px, 3.4vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", margin: 0, lineHeight: 1.1, color: "#071B45" }}>{title}</h2>
      <div style={{ width: 46, height: 3, background: "#4169FF", borderRadius: 2, margin: "14px auto 0" }} />
    </motion.div>
  );
}

export default function UxCaseClient({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const cs = getUxCaseStudy(slug);
  if (!cs) return null;
  const isFr = lang === "en" ? false : true;
  const intro = isFr ? cs.introductionFr : cs.introductionEn;
  const challenge = isFr ? cs.challengeFr : cs.challengeEn;
  const approach = isFr ? cs.approachFr : cs.approachEn;
  const deliverables = isFr ? cs.deliverablesFr : cs.deliverablesEn;

  const overviewBlocks = [
    { label: t.uxCase.contextLabel, text: intro },
    { label: t.uxCase.challengeLabel, text: challenge },
    { label: t.uxCase.approachLabel, text: approach },
  ];

  return (
    <main style={{ background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh" }}>
      <ScrollProgress />
      <Navbar initialSolid />

      {/* HERO — dark navy */}
      <section style={{ position: "relative", padding: "128px 24px 72px", overflow: "hidden", background: "#071B45", textAlign: "center" }}>
        <div style={{ position: "absolute", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,124,255,0.18) 0%, rgba(91,124,255,0.05) 50%, transparent 70%)", top: -260, right: -160, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,124,255,0.14) 0%, transparent 70%)", bottom: -280, left: -180, pointerEvents: "none" }} />

        <motion.div variants={fadeInUp} initial="hidden" animate="visible" style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto" }}>
          <Link href="/portfolio" style={{ display: "inline-block", fontSize: 13, fontWeight: 600, color: "#8AA7FF", textDecoration: "none", marginBottom: 26, letterSpacing: "0.02em" }}>
            {t.uxCase.back}
          </Link>
          {cs.clientLogo ? (
            <div style={{ width: 84, height: 84, borderRadius: 20, overflow: "hidden", margin: "0 auto 22px", background: "#FFFFFF", padding: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src={cs.clientLogo} alt={cs.clientName} width={64} height={64} style={{ objectFit: "contain" }} />
            </div>
          ) : (
            <div style={{ width: 84, height: 84, borderRadius: 20, margin: "0 auto 22px", background: "rgba(91,124,255,0.16)", border: "1px solid rgba(91,124,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: spaceFont, fontSize: 28, fontWeight: 800, color: "#FFFFFF" }}>
              {cs.clientName.charAt(0)}
            </div>
          )}
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8AA7FF", display: "inline-block", background: "rgba(91,124,255,0.14)", border: "1px solid rgba(91,124,255,0.35)", borderRadius: 999, padding: "6px 18px", marginBottom: 22 }}>
            {t.uxCase.categoryLabel}
          </span>
          <h1 style={{ fontFamily: spaceFont, fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 1.08, margin: "0 0 14px", color: "#FFFFFF" }}>
            {cs.clientName}
          </h1>
          <div style={{ width: 44, height: 3, background: "#4169FF", borderRadius: 2, margin: "0 auto 20px" }} />
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 660, margin: "0 auto" }}>
            {isFr ? cs.shortDescriptionFr : cs.shortDescriptionEn}
          </p>
        </motion.div>
      </section>

      {/* OVERVIEW */}
      <section style={{ padding: "90px 24px 60px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <SectionBlock eyebrow={t.uxCase.categoryLabel} title={t.uxCase.overviewTitle} />
          <div className="uxc-overview-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, alignItems: "stretch" }}>
            {overviewBlocks.map((b) => (
              <div key={b.label} style={{ background: "#F7F9FC", border: "1px solid rgba(10,10,10,0.08)", borderRadius: 18, padding: "28px 26px", height: "100%" }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4169FF", display: "block", marginBottom: 12 }}>{b.label}</span>
                <p style={{ fontSize: 14.5, color: "rgba(10,10,10,0.68)", lineHeight: 1.7, margin: 0 }}>{b.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, background: "#FFFFFF", border: "1px solid rgba(10,10,10,0.08)", borderRadius: 18, padding: "28px 26px" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4169FF", display: "block", marginBottom: 16 }}>{t.uxCase.deliverablesLabel}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {deliverables.map((d) => (
                <span key={d} style={{ fontSize: 13, fontWeight: 600, color: "#071B45", background: "#F7F9FC", border: "1px solid rgba(10,10,10,0.1)", borderRadius: 8, padding: "8px 14px" }}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISUALS — full width stack */}
      <section style={{ padding: "40px 24px 96px", background: "#F7F9FC", borderTop: "1px solid rgba(10,10,10,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <SectionBlock eyebrow={t.uxCase.categoryLabel} title={t.uxCase.visualsTitle} />
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {cs.visuals.map((src, i) => (
              <motion.div key={src} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
                <Image
                  src={src}
                  alt={`${cs.clientName} — visuel ${i + 1}`}
                  width={1200}
                  height={1200}
                  sizes="(max-width: 1080px) 100vw, 1080px"
                  style={{ width: "100%", height: "auto", borderRadius: 14, border: "1px solid rgba(10,10,10,0.08)" }}
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </div>
          {cs.externalProjectUrl && (
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} style={{ textAlign: "center", marginTop: 56 }}>
              <motion.a
                href={cs.externalProjectUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 40px rgba(65,105,255,0.4)" }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 30px", borderRadius: 12, textDecoration: "none", boxShadow: "0 8px 30px rgba(65,105,255,0.3)" }}
              >
                {t.uxCase.seeOriginal} <IconArrowRight size={16} />
              </motion.a>
            </motion.div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "#071B45", padding: "88px 24px 96px", textAlign: "center" }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, textTransform: "uppercase", color: "#FFFFFF", margin: "0 0 12px", whiteSpace: "pre-line" }}>{t.uxCase.ctaTitle}</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: "0 auto 30px", maxWidth: 460 }}>{t.uxCase.ctaSubtitle}</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 44px rgba(65,105,255,0.5)" }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 34px", borderRadius: 12, textDecoration: "none", boxShadow: "0 8px 32px rgba(65,105,255,0.35)" }}
            >
              {t.uxCase.ctaBtn} →
            </motion.a>
            <Link href="/portfolio" style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "#FFFFFF", fontWeight: 600, fontSize: 15, padding: "15px 26px", borderRadius: 12, textDecoration: "none", border: "1px solid rgba(138,167,255,0.4)" }}>
              {t.uxCase.ctaBack}
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        .uxc-overview-grid { align-items: stretch; }
        @media (max-width: 1024px) {
          .uxc-overview-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .uxc-overview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
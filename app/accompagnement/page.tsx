"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { useLang } from "@/i18n/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function AccompagnementPage() {
  const { t } = useLang();
  const a = t.accompagnement;

  return (
    <main style={{ background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh" }}>
      <ScrollProgress />
      <Navbar initialSolid />

      {/* HERO */}
      <section style={{ position: "relative", padding: "128px 24px 84px", overflow: "hidden", background: "#071B45" }}>
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(65,105,255,0.16) 0%, rgba(65,105,255,0.05) 50%, transparent 70%)",
            top: -260,
            right: -160,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,105,255,0.13) 0%, transparent 70%)", bottom: -280, left: -180, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FFFFFF", display: "inline-block", background: "rgba(65,105,255,0.18)", border: "1px solid rgba(107,138,255,0.5)", borderRadius: 999, padding: "6px 18px", marginBottom: 22 }}>
              {a.heroLabel}
            </span>
            <h1 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 auto", maxWidth: 820, whiteSpace: "pre-line", color: "#FFFFFF" }}>
              {a.heroStatement1}
              <br />
              <span style={{ color: "#4169FF" }}>{a.heroStatement2}</span>
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 560, margin: "20px auto 34px" }}>
              {a.heroSupporting}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.a href="/contact" whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 44px rgba(65,105,255,0.5)" }} whileTap={{ scale: 0.98 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, textDecoration: "none", boxShadow: "0 8px 32px rgba(65,105,255,0.35)" }}>
                {a.heroCta} →
              </motion.a>
              <motion.a href="#methode" whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.12)" }} whileTap={{ scale: 0.98 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#FFFFFF", fontWeight: 600, fontSize: 15, padding: "14px 32px", borderRadius: 10, textDecoration: "none", border: "1px solid rgba(255,255,255,0.45)" }}>
                {a.heroSecondaryCta}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section style={{ padding: "72px 24px", background: "#FFFFFF", borderTop: "1px solid rgba(10,10,10,0.05)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 500, lineHeight: 1.55, color: "rgba(10,10,15,0.68)", textAlign: "center" }}>
            {a.brandStatement}
          </motion.div>
        </div>
      </section>

      {/* PILLARS */}
      {a.pillars.map((pillar, i) => (
        <section
          key={pillar.id}
          style={{
            padding: "96px 24px",
            background: i % 2 === 1 ? "#F7F9FC" : "#FFFFFF",
            borderTop: i % 2 === 1 ? "1px solid rgba(10,10,10,0.05)" : undefined,
            borderBottom: i % 2 === 1 ? "1px solid rgba(10,10,10,0.05)" : undefined,
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <PillarSection pillar={pillar} index={i} />
          </div>
        </section>
      ))}

      {/* METHOD */}
      <section id="methode" style={{ position: "relative", padding: "100px 24px", background: "#071B45", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30%", left: "-10%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,105,255,0.16) 0%, transparent 65%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-30%", right: "-10%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,105,255,0.12) 0%, transparent 65%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B8AFF", display: "block", marginBottom: 10 }}>{a.processLabel}</span>
            <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#FFFFFF", margin: "0 0 10px" }}>
              {t.process.title1}<span style={{ color: "#4169FF" }}>{t.process.title2}</span>
            </h2>
            <div style={{ width: 40, height: 3, background: "#4169FF", borderRadius: 2, margin: "0 auto" }} />
          </motion.div>
          <ProcessSteps steps={a.processSteps} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ position: "relative", padding: "110px 24px", overflow: "hidden", isolation: "isolate" }}>
        <Image src="/assets/banners/banner2.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, rgba(7,27,69,0.74) 0%, rgba(7,27,69,0.86) 55%, rgba(7,27,69,0.97) 100%)", pointerEvents: "none" }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#FFFFFF", margin: "0 0 12px", whiteSpace: "pre-line" }}>
            {a.finalStatement1}
            <br />
            <span style={{ color: "#6B8AFF" }}>{a.finalStatement2}</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 auto 30px", maxWidth: 480 }}>{a.finalReassurance}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a href="/contact" whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 44px rgba(65,105,255,0.5)" }} whileTap={{ scale: 0.98 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 12, textDecoration: "none", boxShadow: "0 8px 32px rgba(65,105,255,0.35)" }}>
              {a.finalCta} →
            </motion.a>
            <motion.a href="/contact" whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.18)", borderColor: "rgba(255,255,255,0.55)" }} whileTap={{ scale: 0.98 }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "#FFFFFF", fontWeight: 600, fontSize: 16, padding: "14px 32px", borderRadius: 12, textDecoration: "none", border: "1px solid rgba(255,255,255,0.32)", backdropFilter: "blur(4px)" }}>
              {a.finalSecondaryCta}
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .pillar-flex { gap: 40px !important; }
          .outcomes-grid { grid-template-columns: 1fr 1fr !important; gap: 10px 20px !important; }
        }
        @media (max-width: 768px) {
          .pillar-flex { flex-direction: column !important; gap: 24px !important; }
          .pillar-number-col { width: 100% !important; }
          .pillar-content-col { width: 100% !important; }
          .process-horizontal { flex-direction: column !important; gap: 28px !important; }
          .process-line { display: none !important; }
          .outcomes-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

function PillarSection({
  pillar,
  index,
}: {
  pillar: {
    number: string;
    title: string;
    promise: string;
    services: { title: string; sentence: string; capabilities: string[] }[];
    outcomes: string[];
    cta: string;
  };
  index: number;
}) {
  const { t } = useLang();
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      style={{
        display: "flex",
        gap: 64,
        flexDirection: isReversed ? "row-reverse" : "row",
        alignItems: "flex-start",
      }}
      className="pillar-flex"
    >
      <div style={{ width: "22%", flexShrink: 0 }} className="pillar-number-col">
        <div style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(72px, 9vw, 116px)", fontWeight: 900, color: "#071B45", lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 14 }}>
          {pillar.number}
        </div>
        <div style={{ width: 44, height: 3, background: "#4169FF", borderRadius: 2 }} />
      </div>
      <div style={{ width: "78%" }} className="pillar-content-col">
        <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase", margin: "0 0 12px", lineHeight: 1.08 }}>
          {pillar.title}
        </h2>
        <p style={{ fontSize: 17, color: "rgba(10,10,10,0.65)", lineHeight: 1.65, margin: "0 0 38px", maxWidth: 560 }}>
          {pillar.promise}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {pillar.services.map((svc, si) => (
            <div key={si}>
              <h3 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>
                {svc.title}
              </h3>
              <p style={{ fontSize: 15, color: "rgba(10,10,10,0.6)", lineHeight: 1.6, margin: "0 0 12px", maxWidth: 620 }}>
                {svc.sentence}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {svc.capabilities.map((cap) => (
                  <span key={cap} style={{ fontSize: 11, fontWeight: 600, color: "#4361EE", background: "rgba(67,97,238,0.07)", border: "1px solid rgba(67,97,238,0.16)", borderRadius: 6, padding: "3px 10px", letterSpacing: "0.02em" }}>
                    {cap}
                  </span>
                ))}
              </div>
              {si < pillar.services.length - 1 && <div style={{ height: 1, background: "rgba(10,10,10,0.08)", marginTop: 30 }} />}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 38 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(10,10,10,0.45)", textTransform: "uppercase", marginBottom: 16 }}>
            {t.accompagnement.outcomesLabel}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 28px" }} className="outcomes-grid">
            {pillar.outcomes.map((o, oi) => (
              <div key={oi} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4361EE", flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: 14, color: "rgba(10,10,10,0.72)", lineHeight: 1.55 }}>{o}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 34 }}>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#4361EE", fontWeight: 700, fontSize: 15, textDecoration: "none", borderBottom: "1px solid rgba(67,97,238,0.35)", paddingBottom: 2 }}>
            {pillar.cta} →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessSteps({ steps }: { steps: { title: string; desc: string }[] }) {
  const [activeCount, setActiveCount] = useState(0);
  const handleReveal = useCallback((count: number) => {
    setActiveCount((prev) => Math.max(prev, count));
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 18, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.12)", borderRadius: 1 }} className="process-line" />
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 0,
          width: activeCount > 0 ? `${(activeCount / steps.length) * 100}%` : "0%",
          height: 2,
          background: "#4169FF",
          borderRadius: 1,
          transition: "width 0.6s ease",
          boxShadow: "0 0 12px rgba(65,105,255,0.6)",
        }}
        className="process-line"
      />
      <div style={{ display: "flex", gap: 24, position: "relative" }} className="process-horizontal">
        {steps.map((step, i) => (
          <ProcessStage key={i} step={step} index={i} onReveal={handleReveal} />
        ))}
      </div>
    </div>
  );
}

function ProcessStage({
  step,
  index,
  onReveal,
}: {
  step: { title: string; desc: string };
  index: number;
  onReveal: (count: number) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (inView) onReveal(index + 1);
  }, [inView, index, onReveal]);

  return (
    <div ref={ref} style={{ flex: 1, textAlign: "center" }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: inView ? "#4169FF" : "rgba(255,255,255,0.08)",
          border: inView ? "2px solid #4169FF" : "2px solid rgba(255,255,255,0.18)",
          boxShadow: inView ? "0 0 24px rgba(65,105,255,0.5)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 14px",
          fontSize: 13,
          fontWeight: 800,
          color: inView ? "#FFFFFF" : "rgba(255,255,255,0.4)",
          transition: "all 0.5s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        {index + 1}
      </div>
      <h4 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: inView ? "#FFFFFF" : "rgba(255,255,255,0.4)", margin: "0 0 6px", transition: "color 0.5s ease" }}>
        {step.title}
      </h4>
      <p style={{ fontSize: 13, color: inView ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)", lineHeight: 1.55, margin: 0, transition: "color 0.5s ease" }}>
        {step.desc}
      </p>
    </div>
  );
}

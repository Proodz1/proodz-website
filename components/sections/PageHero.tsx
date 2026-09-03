"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function PageHero({
  badge,
  title1,
  title2,
  supporting,
  titleSize,
  children,
}: {
  badge: string;
  title1: string;
  title2: string;
  supporting: string;
  titleSize?: string;
  children?: ReactNode;
}) {
  return (
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
            {badge}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
              fontSize: titleSize || "clamp(30px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              margin: "0 auto",
              maxWidth: 820,
              whiteSpace: "pre-line",
              color: "#FFFFFF",
            }}
          >
            {title1}
            <span style={{ color: "#4169FF" }}>{title2}</span>
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 560, margin: "20px auto 34px" }}>
            {supporting}
          </p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

const STORAGE_KEY = "proodz-intro-seen";
const SHOW_MS = 3400;
const EXIT_MS = SHOW_MS;

const TAGLINE: Record<"fr" | "en", string> = {
  fr: "AGENCE DE TRANSFORMATION DIGITALE",
  en: "DIGITAL TRANSFORMATION AGENCY",
};

// Deterministic, SSR-safe network graph (no window access, same output server/client).
function seeded(n: number, salt: number): number {
  const x = Math.sin(n * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface NwNode {
  x: number;
  y: number;
  r: number;
}

const NODE_COUNT = 22;
const NODES: NwNode[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
  x: 6 + seeded(i, 1) * 88,
  y: 6 + seeded(i, 2) * 88,
  r: 0.7 + seeded(i, 3) * 1.3,
}));
const EDGES: Array<[number, number]> = [];
for (let i = 0; i < NODE_COUNT; i++) {
  for (let j = i + 1; j < NODE_COUNT; j++) {
    const dx = NODES[i].x - NODES[j].x;
    const dy = NODES[i].y - NODES[j].y;
    if (Math.hypot(dx, dy) < 26) EDGES.push([i, j]);
  }
}

const wordmark: Variants = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function LogoIntro() {
  const [phase, setPhase] = useState<"idle" | "show" | "done">("idle");
  const overlayRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLang();

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore storage errors */
    }
    setPhase("done");
  }, []);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      try {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          sessionStorage.setItem(STORAGE_KEY, "1");
          setPhase("done");
          return;
        }
        if (sessionStorage.getItem(STORAGE_KEY)) {
          setPhase("done");
          return;
        }
      } catch {
        /* fall through and show the intro */
      }
      setPhase("show");
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phase !== "show") return;
    const t = window.setTimeout(finish, EXIT_MS);
    return () => window.clearTimeout(t);
  }, [phase, finish]);

  useEffect(() => {
    if (phase !== "show") return;
    const el = overlayRef.current;
    if (!el) return;
    const preventWheel = (e: WheelEvent) => e.preventDefault();
    const preventTouch = (e: TouchEvent) => {
      if (e.touches.length) e.preventDefault();
    };
    el.addEventListener("wheel", preventWheel, { passive: false });
    el.addEventListener("touchmove", preventTouch, { passive: false });
    return () => {
      el.removeEventListener("wheel", preventWheel);
      el.removeEventListener("touchmove", preventTouch);
    };
  }, [phase]);

  const barsTiming = { duration: SHOW_MS / 1000, times: [0, 0.18, 0.8, 1] };

  return (
    <>
      <AnimatePresence>
      {phase === "show" && (
        <motion.div
          key="logo-intro"
          ref={overlayRef}
          initial={false}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.7, ease: "easeInOut" } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#071B45",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            touchAction: "none",
            overscrollBehavior: "none",
            userSelect: "none",
          }}
          aria-label="Proodz"
        >
          {/* ---- Digital environment: grid ---- */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(65,105,255,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(65,105,255,0.13) 1px, transparent 1px)",
              backgroundSize: "46px 46px",
              WebkitMaskImage: "radial-gradient(closest-side at 50% 45%, black 30%, transparent 78%)",
              maskImage: "radial-gradient(closest-side at 50% 45%, black 30%, transparent 78%)",
              pointerEvents: "none",
            }}
          />

          {/* ---- Digital environment: network graph ---- */}
          <motion.svg
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.25, ease: "easeOut" }}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {EDGES.map(([a, b], k) => (
              <motion.line
                key={`e${k}`}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="rgba(107,138,255,0.5)"
                strokeWidth={0.12}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1, delay: 0.5 + (k % 7) * 0.05, ease: "easeInOut" }}
              />
            ))}
            {NODES.map((n, i) => (
              <motion.circle
                key={`n${i}`}
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="#6B8AFF"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.04 }}
              />
            ))}
          </motion.svg>

          {/* ---- Precision: horizontal scanline ---- */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ y: ["-12%", "112%"], opacity: [0, 0.55, 0.55, 0] }}
            transition={{ duration: 2.2, delay: 0.8, repeat: 1, repeatDelay: 0.6, ease: "linear" }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent 0%, rgba(65,105,255,0.7) 50%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* ---- Innovation: expanding pulse ring ---- */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0.6, scale: 0.35 }}
            animate={{ opacity: 0, scale: 2.3 }}
            transition={{ duration: 1.3, delay: 1.0, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "min(40vw, 440px)",
              height: "min(40vw, 440px)",
              marginLeft: "calc(min(40vw, 440px) / -2)",
              marginTop: "calc(min(40vw, 440px) / -2)",
              borderRadius: "50%",
              border: "1px solid rgba(107,138,255,0.5)",
              pointerEvents: "none",
            }}
          />

          {/* ---- Precision: rotating dashed orbit ---- */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.45, rotate: 360 }}
            transition={{
              opacity: { duration: 1, delay: 1.1 },
              rotate: { duration: 16, repeat: Infinity, ease: "linear" },
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "min(48vw, 560px)",
              height: "min(48vw, 560px)",
              marginLeft: "calc(min(48vw, 560px) / -2)",
              marginTop: "calc(min(48vw, 560px) / -2)",
              borderRadius: "50%",
              border: "1px dashed rgba(107,138,255,0.35)",
              pointerEvents: "none",
            }}
          />

          {/* ---- Growth: ascending curve ---- */}
          <motion.svg
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewBox="0 0 200 70"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              bottom: "15%",
              width: "min(52vw, 430px)",
              height: 70,
              pointerEvents: "none",
            }}
          >
            <defs>
              <linearGradient id="introGrowth" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#4169FF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#6B8AFF" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <motion.polygon
              points="0,70 0,58 40,50 80,40 120,30 160,18 200,6 200,70"
              fill="url(#introGrowth)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            />
            <motion.path
              d="M0 58 C 40 50, 80 40, 120 30 S 175 12, 200 4"
              fill="none"
              stroke="url(#introGrowth)"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 1.4, ease: "easeOut" }}
            />
            <motion.circle
              cx={200}
              cy={4}
              r={2.6}
              fill="#6B8AFF"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 1.4, delay: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* ---- Cinematic letterbox bars ---- */}
          <motion.div
            aria-hidden
            initial={{ y: "-101%" }}
            animate={{ y: ["-101%", "0%", "0%", "-101%"] }}
            transition={barsTiming}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: "9vh", background: "#050D20", zIndex: 2 }}
          />
          <motion.div
            aria-hidden
            initial={{ y: "101%" }}
            animate={{ y: ["101%", "0%", "0%", "101%"] }}
            transition={barsTiming}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "9vh", background: "#050D20", zIndex: 2 }}
          />

          {/* ---- Official logo + tagline ---- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 24px" }}
          >
            <div style={{ position: "relative", overflow: "hidden" }}>
              <motion.div
                variants={wordmark}
                initial="hidden"
                animate="visible"
                style={{ position: "relative", width: "clamp(220px, 30vw, 340px)" }}
              >
                <Image
                  src="/logos/proodz-logo.svg"
                  alt="Proodz — logo"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/logo-placeholder.svg"; }}
                  width={340}
                  height={62}
                  priority
                  style={{ objectFit: "contain", display: "block", width: "100%", height: "auto", filter: "brightness(1.5)" }}
                />
              </motion.div>
              <motion.div
                aria-hidden
                initial={{ x: "-170%" }}
                animate={{ x: ["-170%", "320%"], opacity: [0, 0.9, 0.9, 0] }}
                transition={{ duration: 1.1, delay: 1.2, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "42%",
                  transform: "skewX(-18deg)",
                  background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.1, ease: "easeOut" }}
              style={{
                margin: "18px 0 0",
                fontSize: "clamp(9px, 1.2vw, 12px)",
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.62)",
                whiteSpace: "nowrap",
              }}
              className="intro-tagline"
            >
              {TAGLINE[lang]}
            </motion.p>
          </motion.div>

          <motion.button
            onClick={finish}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            whileHover={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              position: "absolute",
              bottom: 22,
              right: 22,
              zIndex: 4,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer",
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              transition: "color 0.2s ease, background 0.2s ease, border-color 0.2s ease",
            }}
            aria-label={t.misc.skipIntro}
          >
            {t.misc.skipIntroShort} <span aria-hidden>→</span>
          </motion.button>
        </motion.div>
      )}
      </AnimatePresence>
      <style>{`
        @media (max-width: 400px) {
          .intro-tagline { letter-spacing: 0.2em !important; }
        }
      `}</style>
    </>
  );
}

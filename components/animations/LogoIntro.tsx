"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

const STORAGE_KEY = "proodz-intro-seen";
const DISPLAY_MS = 1120;
const EXIT_MS = 420;
const TAGLINE: Record<"fr" | "en", string> = { fr: "AGENCE DE TRANSFORMATION DIGITALE", en: "DIGITAL TRANSFORMATION AGENCY" };

export default function LogoIntro() {
  const [phase, setPhase] = useState<"idle" | "show" | "done">("idle");
  const { lang, t } = useLang();
  const finish = useCallback(() => { try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* storage can be unavailable in private mode */ } setPhase("done"); }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem(STORAGE_KEY)) { sessionStorage.setItem(STORAGE_KEY, "1"); setPhase("done"); return; }
      } catch { /* show the intro when storage is unavailable */ }
      setPhase("show");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => { if (phase !== "show") return; const timer = window.setTimeout(finish, DISPLAY_MS); return () => window.clearTimeout(timer); }, [phase, finish]);

  useEffect(() => {
    if (phase !== "show") return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    return () => { body.style.overflow = previousOverflow; body.style.paddingRight = previousPaddingRight; };
  }, [phase]);

  return <AnimatePresence>
    {phase === "show" && <motion.div
      key="proodz-intro" role="dialog" aria-label="Proodz" aria-modal="true"
      initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.015, transition: { duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] } }}
      style={{ position: "fixed", inset: 0, zIndex: 99999, display: "grid", placeItems: "center", overflow: "hidden", background: "#071B45", color: "#FFFFFF", touchAction: "none", userSelect: "none" }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 42%, rgba(67,97,238,0.30), transparent 34%), linear-gradient(135deg, #071B45 0%, #050D20 100%)" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.2, backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(circle at center, black, transparent 68%)", WebkitMaskImage: "radial-gradient(circle at center, black, transparent 68%)" }} />
      <motion.div initial={{ opacity: 0, y: 12, scale: 0.965 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }} style={{ position: "relative", zIndex: 1, width: "min(72vw, 330px)", textAlign: "center" }}>
        <motion.div animate={{ filter: ["brightness(1.35) drop-shadow(0 0 0 rgba(107,138,255,0))", "brightness(1.5) drop-shadow(0 0 18px rgba(107,138,255,0.5))", "brightness(1.35) drop-shadow(0 0 0 rgba(107,138,255,0))"] }} transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}><Image src="/logos/proodz-logo.svg" alt="Proodz — logo" width={340} height={62} priority style={{ display: "block", width: "100%", height: "auto", objectFit: "contain" }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/logo-placeholder.svg"; }} /></motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.36, duration: 0.45 }} style={{ margin: "17px 0 0", color: "rgba(255,255,255,0.62)", fontSize: "clamp(9px, 1.4vw, 11px)", fontWeight: 600, letterSpacing: "0.28em", lineHeight: 1.4, whiteSpace: "nowrap" }}>{TAGLINE[lang]}</motion.p>
        <div aria-hidden style={{ height: 2, margin: "30px auto 0", width: "min(48vw, 180px)", overflow: "hidden", borderRadius: 99, background: "rgba(255,255,255,0.16)" }}><motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: DISPLAY_MS / 1000, ease: "linear" }} style={{ height: "100%", transformOrigin: "left", background: "linear-gradient(90deg, #4361EE, #8AA7FF)" }} /></div>
      </motion.div>
      <motion.button type="button" onClick={finish} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.35 }} style={{ position: "absolute", right: 20, bottom: 18, zIndex: 2, border: "1px solid rgba(255,255,255,0.22)", borderRadius: 8, padding: "7px 12px", color: "rgba(255,255,255,0.68)", background: "rgba(255,255,255,0.06)", fontFamily: "inherit", fontSize: 11, fontWeight: 600, cursor: "pointer" }} aria-label={t.misc.skipIntro}>{t.misc.skipIntroShort} <span aria-hidden>→</span></motion.button>
    </motion.div>}
  </AnimatePresence>;
}

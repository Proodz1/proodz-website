"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageHero from "@/components/sections/PageHero";
import { fadeInUp } from "@/components/animations/variants";
import { useCountUp } from "@/hooks/useCountUp";
import { useLang } from "@/i18n/LanguageContext";
import { IconArrowRight } from "@/components/icons/Icons";
import { clients, categoryKeys, clientText } from "@/lib/portfolio-data";
import type { Client, Slide, CategoryKey } from "@/lib/portfolio-data";

const CAROUSEL_GAP = 16;

function Stat({ value, label, dark = false }: { value: number; label: string; dark?: boolean }) {
  const { count, ref } = useCountUp(value, 1800);
  return (
    <div ref={ref} style={{ textAlign: "center", minWidth: 108 }}>
      <div style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 800, color: dark ? "#FFFFFF" : "#4169FF", lineHeight: 1 }}>
        {count}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: dark ? "rgba(255,255,255,0.65)" : "rgba(10,10,10,0.55)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </div>
    </div>
  );
}

function NeutralPanel({ client, category }: { client: Client; category: string }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4 / 5",
        borderRadius: 14,
        overflow: "hidden",
        background: "#F7F9FC",
        border: "1px solid rgba(10,10,10,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        textAlign: "center",
      }}
    >
      <div style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "0.02em", textTransform: "uppercase", color: "#071B45" }}>
        {client.name}
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4361EE" }}>
        {category}
      </span>
    </div>
  );
}

function PortfolioCarousel({ slides, altText, ariaLabel }: { slides: Slide[]; altText: string; ariaLabel: string }) {
  const { t, lang } = useLang();
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startScroll: number; moved: boolean } | null>(null);

  const [cols, setCols] = useState<number>(() => {
    if (typeof window === "undefined") return 3;
    return window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  });
  const [current, setCurrent] = useState(0);

  const pageCount = Math.max(1, slides.length - cols + 1);

  useEffect(() => {
    const onResize = () => {
      setCols(window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onWheel = (e: WheelEvent) => {
      const maxScroll = vp.scrollWidth - vp.clientWidth;
      if (maxScroll <= 0) return;
      const atStart = vp.scrollLeft <= 0;
      const atEnd = vp.scrollLeft >= maxScroll - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
      e.preventDefault();
      vp.scrollLeft += e.deltaY + e.deltaX;
    };
    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => vp.removeEventListener("wheel", onWheel);
  }, []);

  const goTo = (index: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const first = vp.querySelector<HTMLElement>("[data-slide]");
    if (!first) return;
    const target = Math.min(Math.max(0, index), pageCount - 1);
    vp.scrollTo({ left: target * (first.offsetWidth + CAROUSEL_GAP), behavior: "smooth" });
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const vp = e.currentTarget;
    const first = vp.querySelector<HTMLElement>("[data-slide]");
    if (!first) return;
    const unit = first.offsetWidth + CAROUSEL_GAP;
    if (unit <= 0) return;
    const index = Math.round(vp.scrollLeft / unit);
    setCurrent((c) => {
      const clamped = Math.min(Math.max(0, index), pageCount - 1);
      return c === clamped ? c : clamped;
    });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const vp = viewportRef.current;
    if (!vp) return;
    dragRef.current = { pointerId: e.pointerId, startX: e.clientX, startScroll: vp.scrollLeft, moved: false };
    vp.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    const vp = viewportRef.current;
    if (!d || !vp || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    vp.scrollLeft = d.startScroll - dx;
    if (Math.abs(dx) > 4) d.moved = true;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const vp = viewportRef.current;
    dragRef.current = null;
    if (!vp) return;
    const first = vp.querySelector<HTMLElement>("[data-slide]");
    if (!first) return;
    const unit = first.offsetWidth + CAROUSEL_GAP;
    const index = Math.round(vp.scrollLeft / unit);
    goTo(index);
  };

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);
  const canPrev = current > 0;
  const canNext = current < pageCount - 1;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const arrowStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid rgba(10,10,10,0.14)",
    background: "#FFFFFF",
    color: "#0A0A0A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 12px rgba(10,10,10,0.06)",
    fontSize: 18,
    transition: "all 0.2s",
    fontFamily: "var(--font-inter), 'Inter', sans-serif",
  };

  return (
    <div>
      <div
        ref={viewportRef}
        className="car-viewport"
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          borderRadius: 16,
          cursor: "grab",
          touchAction: "pan-y",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div style={{ display: "flex", gap: CAROUSEL_GAP }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              data-slide
              style={{
                flex: `0 0 calc((100% - ${CAROUSEL_GAP * (cols - 1)}px) / ${cols})`,
                aspectRatio: "4 / 5",
                borderRadius: 14,
                overflow: "hidden",
                position: "relative",
                background: "#F7F9FC",
              }}
            >
              {slide.type === "image" ? (
                <Image
                  src={slide.src}
                  alt={slide.label?.[lang] || `${altText} — ${i + 1}`}
                  fill
                  sizes={cols === 1 ? "80vw" : cols === 2 ? "45vw" : "28vw"}
                  style={{ objectFit: "contain" }}
                  loading={i < 3 ? "eager" : "lazy"}
                />
              ) : slide.type === "video" ? (
                <video
                  src={slide.src}
                  poster={slide.poster}
                  controls
                  controlsList="nodownload"
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  aria-label={slide.label?.[lang] || `${altText} — ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "contain", background: "#F7F9FC", display: "block" }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <motion.button
            onClick={prev}
            disabled={!canPrev}
            aria-label={t.portfolio.prev}
            whileHover={{ scale: 1.06, borderColor: "rgba(67,97,238,0.5)", color: "#4361EE" }}
            whileTap={{ scale: 0.95 }}
            style={{ ...arrowStyle, opacity: canPrev ? 1 : 0.35, cursor: canPrev ? "pointer" : "not-allowed" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>
          <motion.button
            onClick={next}
            disabled={!canNext}
            aria-label={t.portfolio.next}
            whileHover={{ scale: 1.06, borderColor: "rgba(67,97,238,0.5)", color: "#4361EE" }}
            whileTap={{ scale: 0.95 }}
            style={{ ...arrowStyle, opacity: canNext ? 1 : 0.35, cursor: canNext ? "pointer" : "not-allowed" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>
        </div>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`${t.portfolio.slide} ${i + 1}`}
              aria-current={current === i}
              style={{
                width: current === i ? 22 : 7,
                height: 7,
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: current === i ? "#4361EE" : "rgba(10,10,10,0.18)",
              }}
            />
          ))}
        </div>

        <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(10,10,10,0.5)", minWidth: 44, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
          {current + 1} / {pageCount}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ client }: { client: Client }) {
  const { t, lang } = useLang();
  const text = clientText(client, lang);
  const project = client.projects[0];
  const mediaSlides = project.slides.filter((s) => s.src !== "");
  const hasMedia = mediaSlides.length >= 2;
  const kpis = project.kpis ? project.kpis[lang] : null;
  const results = project.results ? project.results[lang] : null;
  const category = client.projects[0].category
    .map((key) => categoryLabels(key, t))
    .join(" · ");

  return (
    <motion.article initial={false} className="project-card">
<div className="project-info">
        <h3 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(24px, 3vw, 30px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", margin: "0 0 6px", lineHeight: 1.1 }}>
          {client.name}
        </h3>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#4361EE", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 16px" }}>
          {client.slug ? (
            <a href={`/secteurs/${client.slug}`} style={{ color: "#4361EE", textDecoration: "none", borderBottom: "1px solid rgba(67,97,238,0.35)", paddingBottom: 1 }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = "#4361EE"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(67,97,238,0.35)"; }}>
              {text.sector}
            </a>
          ) : (
            text.sector
          )}
        </p>
        <p style={{ fontSize: 15, color: "rgba(10,10,10,0.62)", lineHeight: 1.7, margin: "0 0 20px", maxWidth: 480 }}>
          {text.description}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
          {text.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: "rgba(10,10,10,0.6)", background: "rgba(10,10,10,0.045)", border: "1px solid rgba(10,10,10,0.08)", borderRadius: 6, padding: "4px 11px" }}>
              {tag}
            </span>
          ))}
        </div>
        {results && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4361EE", marginBottom: 12 }}>
              {t.portfolio.resultsTitle}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {results.map((kpi) => (
                <div key={kpi.label} style={{ flex: "1 1 150px", minWidth: 150, background: "rgba(67,97,238,0.05)", border: "1px solid rgba(67,97,238,0.18)", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#4169FF", lineHeight: 1.1 }}>
                    {kpi.value}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(10,10,10,0.55)", marginTop: 4 }}>
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {client.slug && (
          <a
            href={`/secteurs/${client.slug}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#4361EE", fontWeight: 600, fontSize: 14.5, textDecoration: "none", borderBottom: "1px solid rgba(67,97,238,0.35)", paddingBottom: 2, marginBottom: 22 }}
          >
            {t.portfolio.sectorCta} {text.sector} <IconArrowRight size={15} />
          </a>
        )}
        <motion.a
          href="/contact"
          whileHover={{ x: 4 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#4361EE", fontWeight: 700, fontSize: 15, textDecoration: "none", borderBottom: "1px solid rgba(67,97,238,0.35)", paddingBottom: 2 }}
        >
          {kpis ? t.portfolio.viewProject : t.portfolio.projectCta} <IconArrowRight size={16} />
        </motion.a>
      </div>

      <div className="project-media">
        {hasMedia ? (
          <PortfolioCarousel slides={mediaSlides} altText={client.name} ariaLabel={`${client.name} — ${t.portfolio.image}`} />
        ) : (
          <NeutralPanel client={client} category={category} />
        )}
      </div>
    </motion.article>
  );
}

function AudiovisualGrid({ client }: { client: Client }) {
  const { t, lang } = useLang();
  const project = client.projects[0];
  const slides = project.slides.filter((s) => s.type === "video" && s.src !== "");

  return (
    <motion.article initial={false} className="audiovisual-project">
      <h3 className="audiovisual-title">{t.portfolio.audiovisualTitle}</h3>
      <div className="audiovisual-video-grid">
        {slides.map((slide, i) => (
          <div key={i} className="audiovisual-video-item">
            <video
              src={slide.src}
              poster={slide.poster}
              controls
              controlsList="nodownload"
              playsInline
              muted
              preload="metadata"
              aria-label={slide.label?.[lang] || `Audiovisual — ${i + 1}`}
            />
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function categoryLabels(key: CategoryKey, t: ReturnType<typeof useLang>["t"]): string {
  const map: Record<CategoryKey, string> = {
    "digital-presence": t.portfolio.digitalPresence,
    "audiovisual-production": t.portfolio.audiovisualProduction,
  };
  return map[key];
}

export default function Portfolio() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("digital-presence");

  const categoryLabelsForFilter: Record<CategoryKey, string> = {
    "digital-presence": t.portfolio.digitalPresence,
    "audiovisual-production": t.portfolio.audiovisualProduction,
  };

  const filteredClients = clients
    .map((client) => ({
      ...client,
      projects: client.projects.filter((p) => p.category.includes(activeFilter)),
    }))
    .filter((client) => client.projects.length > 0);

  const stats = [
    { value: clients.length, label: t.portfolio.statsWorks },
    { value: 4, label: t.portfolio.statsSectors },
    { value: 3, label: t.portfolio.statsCountries },
  ];

  return (
    <main style={{ background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh" }}>
      <ScrollProgress />
      <Navbar initialSolid />

      {/* HERO */}
      <PageHero badge={t.portfolio.label} title1={t.portfolio.title1} title2={t.portfolio.title2} supporting={t.portfolio.subtitle}>
        <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap" }}>
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} dark />
          ))}
        </div>
      </PageHero>

      {/* FILTERS */}
      <section className="pf-filter-section">
        <div className="pf-filters" style={{ maxWidth: 1200, margin: "0 auto", justifyContent: "center" }}>
          {categoryKeys.map((key) => (
            <motion.button
              key={key}
              onClick={() => setActiveFilter(key)}
              aria-pressed={activeFilter === key}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className={activeFilter === key ? "pf-filter active" : "pf-filter"}
            >
              {categoryLabelsForFilter[key]}
            </motion.button>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ padding: "8px 24px 96px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              style={{ display: "flex", flexDirection: "column", gap: 28 }}
            >
              {filteredClients.map((client) => {
                const isAudiovisual = client.projects.some((p) => p.category.includes("audiovisual-production"));
                return isAudiovisual ? <AudiovisualGrid key={client.name} client={client} /> : <ProjectCard key={client.name} client={client} />;
              })}
            </motion.div>
          </AnimatePresence>

          {filteredClients.length === 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", color: "rgba(10,10,10,0.45)", padding: "80px 0", fontSize: 15 }}>
              {t.portfolio.noResults}
            </motion.p>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ position: "relative", padding: "110px 24px", overflow: "hidden", isolation: "isolate" }}>
        <Image src="/banners/banner2.jpg" alt={t.portfolio.bannerAlt} fill sizes="100vw" className="pf-cta-bg" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, rgba(7,27,69,0.74) 0%, rgba(7,27,69,0.86) 55%, rgba(7,27,69,0.97) 100%)", pointerEvents: "none" }} />
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto", textAlign: "center" }}
        >
          <h2 style={{ fontFamily: "var(--font-space), 'Space Grotesk', sans-serif", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#FFFFFF", margin: "0 0 14px" }}>
            {t.portfolio.ctaTitle1}
            <span style={{ color: "#6B8AFF" }}>{t.portfolio.ctaTitle2}</span> ?
          </h2>
          <p style={{ fontSize: "clamp(15px, 2vw, 17px)", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, margin: "0 auto 32px", maxWidth: 480 }}>
            {t.portfolio.ctaSubtitle}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 44px rgba(65,105,255,0.5)" }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#4169FF", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 12, textDecoration: "none", boxShadow: "0 8px 32px rgba(65,105,255,0.35)" }}
            >
              {t.portfolio.ctaBtn} <IconArrowRight size={16} />
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.18)", borderColor: "rgba(255,255,255,0.55)" }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "#FFFFFF", fontWeight: 600, fontSize: 16, padding: "14px 32px", borderRadius: 12, textDecoration: "none", border: "1px solid rgba(255,255,255,0.32)", backdropFilter: "blur(4px)" }}
            >
              {t.portfolio.ctaBack}
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        .pf-filter-section {
          padding: 56px 24px 48px;
        }
        .pf-filters { display: flex; gap: 20px; flex-wrap: wrap; }
        .pf-filter {
          padding: 12px 22px;
          border-radius: 999px;
          border: 1px solid rgba(10,10,10,0.1);
          background: #F7F9FC;
          color: rgba(10,10,10,0.65);
          font-size: 14;
          font-weight: 600;
          cursor: pointer;
          font-family: var(--font-inter), 'Inter', sans-serif;
          transition: all 0.2s;
          white-space: nowrap;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .pf-filter:hover {
          border-color: rgba(67,97,238,0.5);
          color: #4361EE;
          background: rgba(67,97,238,0.05);
        }
        .pf-filter.active {
          background: #4361EE;
          color: #fff;
          border-color: #4361EE;
          box-shadow: 0 4px 16px rgba(67,97,238,0.3);
        }
        .pf-filter.active:hover { color: #fff; background: #3551D6; }

        .project-card {
          display: grid;
          grid-template-columns: minmax(320px, 0.85fr) 1.15fr;
          gap: 48px;
          padding: 32px;
          border: 1px solid rgba(10,10,10,0.08);
          border-radius: 20px;
          background: #FFFFFF;
          align-items: start;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .project-card:hover {
          border-color: rgba(67,97,238,0.32);
          box-shadow: 0 10px 36px rgba(67,97,238,0.07);
        }
        .car-viewport:focus { outline: 2px solid rgba(67,97,238,0.5); outline-offset: 2px; }
        .car-viewport:focus-visible { outline: 2px solid rgba(67,97,238,0.6); outline-offset: 2px; }
        .car-viewport::-webkit-scrollbar { display: none; }

        .audiovisual-project { width: 100%; }
        .audiovisual-title {
          font-family: var(--font-space), 'Space Grotesk', sans-serif;
          font-size: clamp(20px, 3vw, 32px);
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #071B45;
          margin: 0 0 32px;
        }
        .audiovisual-video-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }
        .audiovisual-video-item {
          border-radius: 14px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid rgba(10,10,10,0.08);
        }
        .audiovisual-video-item video {
          width: 100%;
          height: auto;
          object-fit: cover;
          background: transparent;
          display: block;
        }

@media (max-width: 1024px) {
          .project-card { grid-template-columns: minmax(280px, 0.9fr) 1.1fr; gap: 32px; }
          .audiovisual-video-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 900px) {
          .project-card { grid-template-columns: 1fr; gap: 28px; padding: 26px; }
        }
        @media (max-width: 640px) {
          .pf-filter-section {
            padding-top: 32px;
            padding-bottom: 32px;
          }
          .pf-filters {
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: flex-start;
            padding: 4px 4px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .pf-filters::-webkit-scrollbar { display: none; }
          .pf-filter { flex-shrink: 0; }
          .project-card { padding: 20px; border-radius: 16px; }
          .audiovisual-video-grid { grid-template-columns: 1fr; }
          .audiovisual-title { margin-bottom: 20px; }
        }
        @media (max-width: 480px) {
          .pf-cta-bg { object-position: center 20% !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .car-viewport, .pf-filters, .project-card {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/variants";
import { useLang } from "@/i18n/LanguageContext";

const featuredPartners = [
  { name: "Monoprix", logo: "/logos/monoprix.svg" },
  { name: "Energy Rent a Car", logo: "/logos/clients/energy-rent-a-car.png" },
  { name: "Dar Al Hana", logo: "/logos/dar-al-hana.png" },
  { name: "Padel Pro Club", logo: "/logos/padel-pro-club.png" },
];

const partners = [
  { name: "Boom Snap", logo: "/logos/boomsnap.jpg" },
  { name: "Global Insights", logo: "/logos/global-insights.png" },
  { name: "Global Trust Finance", logo: "/logos/global-trust-finance.png" },
  { name: "Jasmin Travel", logo: "/logos/jasmin-travel.png" },
  { name: "PDS", logo: "/logos/pds.jpg" },
  { name: "Carthage Estates", logo: "/logos/carthage-estates.png" },
  { name: "Carthage Motors", logo: "/logos/carthage-motors.png" },
  { name: "Elite Academy", logo: "/logos/elite-academy.png" },
  { name: "Aussui", logo: "/logos/aussui.jpg" },
  { name: "Envnt", logo: "/logos/envnt.png" },
  { name: "Synergy Partners", logo: "/logos/synergy-partners.png" },
  { name: "Padel Arena", logo: "/logos/padel-arena.png" },
  { name: "Glow Essence", logo: "/logos/glow-essence.png" },
  { name: "Luxe Furniture", logo: "/logos/luxe-furniture.png" },
  { name: "Pure Beauty", logo: "/logos/pure-beauty.png" },
  { name: "Global Heights", logo: "/logos/global-heights.png" },
];

function LogoTrack({ logos, speed, ...rest }: { logos: typeof partners; speed: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="marquee-track"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 50,
        flexShrink: 0,
        animation: `marquee ${speed}s linear infinite`,
      }}
      {...rest}
    >
      {logos.map((p) => (
        <div
          key={p.name}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 80,
          }}
        >
          <Image
            src={p.logo}
            alt={p.name}
            width={150}
            height={80}
            loading="lazy"
            style={{
              height: 80,
              width: 150,
              objectFit: "contain",
              opacity: 0.75,
              filter: "grayscale(15%) brightness(0.96)",
              transition: "opacity 0.3s, filter 0.3s",
            }}
            onError={(e) => {
              const img = e.currentTarget;
              img.onerror = null;
              img.src = "/logo-placeholder.svg";
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLImageElement).style.opacity = "1";
              (e.target as HTMLImageElement).style.filter = "grayscale(0%) brightness(1)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLImageElement).style.opacity = "0.75";
              (e.target as HTMLImageElement).style.filter = "grayscale(15%) brightness(0.96)";
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Partners() {
  const { t } = useLang();

  return (
    <section
      style={{
        padding: "110px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(10,10,10,0.06)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at top, rgba(67,97,238,0.06), transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, padding: "0 24px" }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4361EE", display: "block", marginBottom: 14 }}>
            {t.partners.label}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {t.partners.title1}
            <span style={{ color: "#4361EE" }}>{t.partners.title2}</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(10,10,10,0.5)", lineHeight: 1.7, maxWidth: 720, margin: "0 auto 55px" }}>
            {t.partners.tagline}
          </p>
        </motion.div>
      </div>

      {/* FEATURED LOGOS — static, not part of the animated carousel */}
      <div className="pf-featured" style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto 64px", padding: "0 24px" }}>
        <div className="pf-featured-grid">
          {featuredPartners.map((p) => (
            <div key={p.name} className="pf-featured-card">
              <Image
                src={p.logo}
                alt={p.name}
                width={220}
                height={64}
                style={{ objectFit: "contain" }}
                className="pf-featured-logo"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.src = "/logo-placeholder.svg";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexWrap: "nowrap",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <LogoTrack logos={partners} speed={40} />
        <LogoTrack logos={partners} speed={40} aria-hidden="true" />
      </div>

      <style>{`
        .pf-featured-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          align-items: center;
          justify-items: center;
        }
        .pf-featured-card {
          width: 100%;
          max-width: 240px;
          min-height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          border: 1px solid rgba(10,10,10,0.08);
          border-radius: 16px;
          box-shadow: 0 8px 28px rgba(7,27,69,0.07);
          padding: 22px 28px;
          box-sizing: border-box;
        }
        .pf-featured-logo {
          width: auto;
          height: 56px;
          max-width: 100%;
        }
        @media (max-width: 900px) {
          .pf-featured-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .pf-featured-card { max-width: 320px; }
        }
        @media (max-width: 640px) {
          .pf-featured { margin-bottom: 52px; }
          .pf-featured-card { min-height: 88px; padding: 16px 18px; }
          .pf-featured-logo { height: 44px; }
        }
        @media (max-width: 480px) {
          .pf-featured-grid { grid-template-columns: 1fr; gap: 14px; }
          .pf-featured-card { max-width: 280px; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation-play-state: paused !important;
          }
        }
      `}</style>
    </section>
  );
}

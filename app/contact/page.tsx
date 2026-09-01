"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageHero from "@/components/sections/PageHero";
import { fadeInUp, staggerContainer } from "@/components/animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import { getSector } from "@/lib/sectors";
import type { SectorLang } from "@/lib/sectors";
import FreeDiagnosticForm from "@/components/forms/FreeDiagnosticForm";
import {
  IconCheck, IconMail, IconWhatsApp,
  IconLinkedIn, IconInstagram, IconFacebook,
} from "@/components/icons/Icons";

const WA_PHONE = "21694809417";
const WA_MSG: Record<"fr" | "en", string> = {
  fr: "Bonjour%20Proodz%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services.",
  en: "Hello%20Proodz%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.",
};
const waUrl = (lang: "fr" | "en") => `https://wa.me/${WA_PHONE}?text=${WA_MSG[lang]}`;
const MAIL_URL = "mailto:contact@proodz.com";

function sectionFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("section");
  if (raw === null) return null;
  return raw.trim() !== "" ? raw : null;
}

const spaceFont = "var(--font-space), 'Space Grotesk', sans-serif";
const interFont = "var(--font-inter), 'Inter', sans-serif";

function buildSocialItems(lang: "fr" | "en", t: ReturnType<typeof useLang>["t"]): { label: string; href: string; icon: ReactNode }[] {
  return [
    { label: t.footer.social.linkedIn, href: "https://www.linkedin.com/company/111124097/", icon: <IconLinkedIn size={20} color="currentColor" /> },
    { label: t.footer.social.instagram, href: "https://www.instagram.com/pro.odz/", icon: <IconInstagram size={20} color="currentColor" /> },
    { label: t.footer.social.facebook, href: "https://www.facebook.com/profile.php?id=61578354071155", icon: <IconFacebook size={20} color="currentColor" /> },
    { label: t.misc.whatsapp, href: waUrl(lang), icon: <IconWhatsApp size={20} color="currentColor" /> },
  ];
}

function FAQItem({ index, q, a, open, onToggle }: { index: number; q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(10,10,10,0.08)" }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
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
        <span style={{ fontSize: 15, fontWeight: 600, color: open ? "#4361EE" : "rgba(10,10,10,0.78)", transition: "color 0.2s" }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 20, color: "#4361EE", flexShrink: 0, fontWeight: 300, width: 26, height: 26, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "1px solid rgba(67,97,238,0.25)" }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        id={`faq-panel-${index}`}
        role="region"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <p style={{ fontSize: 14, color: "rgba(10,10,10,0.6)", lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
  const { t, lang } = useLang();
  const L = lang as SectorLang;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sectionSlug] = useState<string | null>(() => sectionFromUrl());
  const sector = sectionSlug ? getSector(sectionSlug) : null;

  const contactItems = [
    { icon: <IconWhatsApp size={20} color="#4361EE" />, label: t.contactPage.whatsappLabel, value: t.contactPage.whatsappValue, sub: t.contactPage.whatsappSub, href: waUrl(lang) },
    { icon: <IconMail size={20} color="#4361EE" />, label: t.contactPage.emailBlockLabel, value: t.contactPage.emailValue, sub: t.contactPage.emailSub, href: MAIL_URL },
  ];

  return (
    <main style={{ background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh" }}>
      <ScrollProgress />
      <Navbar initialSolid />

      {/* HERO */}
      <PageHero badge={t.contactPage.label} title1={t.contactPage.title1} title2={t.contactPage.title2} supporting={t.contactPage.subtitle}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            {t.contactPage.trustLine.split("·").map((c) => (
              <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
                <IconCheck size={13} color="#6B8AFF" /> {c.trim()}
              </span>
            ))}
          </div>
          {sector && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#FFFFFF", background: "rgba(65,105,255,0.18)", border: "1px solid rgba(107,138,255,0.5)", borderRadius: 999, padding: "8px 18px" }}>
              {t.contactPage.sectorBadge}: <strong style={{ color: "#6B8AFF" }}>{sector[L].name}</strong>
            </span>
          )}
        </div>
      </PageHero>

      {/* FORM + CONTACT */}
      <section id="form" style={{ padding: "48px 24px 80px", maxWidth: 1200, margin: "0 auto", scrollMarginTop: 110 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 44 }} className="contact-page-grid">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <FreeDiagnosticForm />
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="contact-col" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ fontFamily: spaceFont, fontSize: 22, fontWeight: 800, textTransform: "uppercase", margin: "0 0 28px" }}>
              {t.contactPage.coordTitle}
            </h2>

            {contactItems.map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 24, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(67,97,238,0.08)", border: "1px solid rgba(67,97,238,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "rgba(10,10,10,0.5)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>{item.label}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, color: "#4361EE", textDecoration: "none", fontWeight: 700 }}>
                    {item.value}
                  </a>
                  <p style={{ fontSize: 12.5, color: "rgba(10,10,10,0.55)", margin: "4px 0 0" }}>{item.sub}</p>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 4 }}>
              <p style={{ fontSize: 11, color: "rgba(10,10,10,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, marginBottom: 12 }}>
                {t.contactPage.socialLabel}
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {buildSocialItems(lang, t).map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, background: "#4361EE", borderColor: "#4361EE", color: "#FFFFFF" }}
                    transition={{ duration: 0.2 }}
                    style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(10,10,10,0.03)", border: "1px solid rgba(10,10,10,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4361EE", transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease" }}
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "56px 24px 72px", maxWidth: 800, margin: "0 auto" }}>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4361EE", display: "block", marginBottom: 8 }}>
            {t.contactPage.faqLabel}
          </span>
          <h2 style={{ fontFamily: spaceFont, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, textTransform: "uppercase", margin: "0 0 32px" }}>
            {t.contactPage.faqTitle1}<span style={{ color: "#4361EE" }}>{t.contactPage.faqTitle2}</span>
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {t.contactPage.faqs.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
              q={faq.q}
              a={faq.a}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
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
            {t.contactPage.ctaTitle1}<span style={{ color: "#6B8AFF" }}>{t.contactPage.ctaTitle2}</span>
          </motion.h2>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.75)", maxWidth: 520, margin: "0 auto 26px", lineHeight: 1.7 }}>
            {t.contactPage.ctaText}
          </p>
          <motion.a
            href="#form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ scale: 1.04, y: -1, boxShadow: "0 10px 34px rgba(65,105,255,0.45)" }}
            whileTap={{ scale: 0.98 }}
            style={{ display: "inline-block", background: "#4169FF", color: "#FFFFFF", fontWeight: 700, fontSize: 15, padding: "14px 30px", borderRadius: 12, textDecoration: "none" }}
          >
            {t.contactPage.ctaBtn} →
          </motion.a>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 992px) {
          .contact-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

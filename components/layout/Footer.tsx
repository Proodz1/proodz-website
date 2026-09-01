"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { footerColumn } from "../animations/variants";
import { useLang } from "@/i18n/LanguageContext";
import { IconFacebook, IconInstagram, IconLinkedIn, IconWhatsApp } from "../icons/Icons";

const WA_MSG: Record<"fr" | "en", string> = {
  fr: "Bonjour%20Proodz%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services.",
  en: "Hello%20Proodz%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.",
};
const waUrl = (lang: "fr" | "en") => `https://wa.me/21694809417?text=${WA_MSG[lang]}`;

function buildSocialLinks(lang: "fr" | "en", t: ReturnType<typeof useLang>["t"]): { label: string; href: string; icon: ReactNode }[] {
  return [
    { label: t.footer.social.facebook, href: "https://www.facebook.com/profile.php?id=61578354071155", icon: <IconFacebook size={18} color="currentColor" /> },
    { label: t.footer.social.instagram, href: "https://www.instagram.com/pro.odz/", icon: <IconInstagram size={18} color="currentColor" /> },
    { label: t.footer.social.linkedIn, href: "https://www.linkedin.com/company/111124097/", icon: <IconLinkedIn size={18} color="currentColor" /> },
    { label: t.misc.whatsapp, href: waUrl(lang), icon: <IconWhatsApp size={18} color="currentColor" /> },
  ];
}

export default function Footer() {
  const { t, lang } = useLang();
  const socialLinks = buildSocialLinks(lang, t);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/accompagnement", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/methode", label: t.nav.method },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "var(--navy)", padding: "48px 40px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 48, marginBottom: 40 }} className="footer-grid">
          <motion.div variants={footerColumn(0)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <Image
              src="/logos/proodz-logo.svg"
              alt="Proodz"
              width={150}
              height={27}
              style={{ objectFit: "contain", display: "block", width: "clamp(130px, 24vw, 150px)", height: "auto", marginBottom: 12, filter: "brightness(1.5)" }}
            />
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {t.footer.desc}
            </p>
          </motion.div>

          <motion.div variants={footerColumn(1)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              {t.footer.navTitle}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {navLinks.map((l) => (
                <motion.a key={l.label} href={l.href} whileHover={{ color: "#FFFFFF", x: 4 }} style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}>
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={footerColumn(2)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              {t.footer.contactTitle}
            </p>
            <a href="mailto:contact@proodz.com" style={{ color: "#6B8AFF", textDecoration: "none", fontSize: 14, display: "block", marginBottom: 8 }}>
              contact@proodz.com
            </a>
            <a href="tel:+21694809417" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14, display: "block", marginBottom: 16 }}>
              +216 94 809 417
            </a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -1, boxShadow: "0 6px 24px rgba(65,105,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "inline-block", background: "#4361EE", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 24px", borderRadius: 10, textDecoration: "none" }}
            >
              {t.nav.cta} →
            </motion.a>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, background: "#4361EE", borderColor: "#4361EE", color: "#FFFFFF" }}
                  transition={{ duration: 0.2 }}
                  style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B8AFF", transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease" }}
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{t.footer.copyright}</p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{t.footer.tagline}</p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          footer { padding: 32px 24px 24px !important; }
        }
      `}</style>
    </footer>
  );
}

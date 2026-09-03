"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { IconMenu, IconX } from "@/components/icons/Icons";

const MOBILE_MENU_ID = "mobile-nav-menu";

export default function Navbar({ initialSolid = false }: { initialSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(initialSolid);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, t, toggle } = useLang();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/accompagnement", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/methode", label: t.nav.method },
    { href: "/a-propos", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  };

  // Lock background scroll, close on Escape, and trap Tab inside the
  // open mobile menu so keyboard users never land on hidden content.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstLink = menuRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -68, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="site-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 40px",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(7,18,42,0.97)" : "rgba(255,255,255,0.92)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(10,10,15,0.06)",
      }}
    >
      <Link href="/" aria-label={t.nav.homeAria} style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <motion.span
          initial={{ opacity: 0, y: -5, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.035 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="brand-logo-wrap"
          style={{ display: "inline-flex", alignItems: "center", borderRadius: 8 }}
        >
        <Image
          src="/assets/logos/proodz-logo.svg"
          alt="Proodz"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/assets/logo-placeholder.svg"; }}
          width={132}
          height={24}
          priority
          style={{
            objectFit: "contain",
            display: "block",
            width: "clamp(108px, 20vw, 132px)",
            height: "auto",
            filter: scrolled ? "brightness(0) invert(1)" : "none",
            transition: "filter 0.3s ease",
          }}
        />
        </motion.span>
      </Link>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-desktop">
        {links.map((l) => (
          <motion.a
            key={l.href}
            href={l.href}
            whileHover={{ color: scrolled ? "#FFFFFF" : "#0A0A0F" }}
            style={{
              color: scrolled ? "rgba(255,255,255,0.78)" : "rgba(10,10,15,0.65)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              transition: "color 0.3s ease",
            }}
          >
            {l.label}
          </motion.a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <motion.button
          onClick={toggle}
          whileHover={{ borderColor: scrolled ? "rgba(255,255,255,0.45)" : "rgba(67,97,238,0.3)", color: scrolled ? "#FFFFFF" : "#0A0A0F" }}
          aria-label={t.misc.langToggle}
          style={{
            fontSize: 12,
            color: scrolled ? "rgba(255,255,255,0.7)" : "rgba(10,10,15,0.55)",
            border: scrolled ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(10,10,15,0.1)",
            padding: "10px 14px",
            minHeight: 42,
            borderRadius: 6,
            background: "transparent",
            cursor: "pointer",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            transition: "color 0.3s ease, border-color 0.3s ease",
          }}
        >
          <span style={{ color: scrolled ? (lang === "fr" ? "#FFFFFF" : "rgba(255,255,255,0.5)") : (lang === "fr" ? "#0A0A0F" : "rgba(10,10,15,0.4)") }}>FR</span>
          {" | "}
          <span style={{ color: scrolled ? (lang === "en" ? "#FFFFFF" : "rgba(255,255,255,0.5)") : (lang === "en" ? "#0A0A0F" : "rgba(10,10,15,0.4)") }}>EN</span>
        </motion.button>
        <motion.a
          href="/contact"
          data-ga-event="cta_click"
          data-ga-label="nav_audit_gratuit"
          whileHover={{ scale: 1.05, y: -1, boxShadow: "0 6px 24px rgba(67,97,238,0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="nav-cta-top"
          style={{
            background: "#4361EE",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            padding: "10px 24px",
            borderRadius: 8,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {t.nav.cta} →
        </motion.a>

        <button
          ref={burgerRef}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: scrolled ? "#FFFFFF" : "#0A0A0F",
            fontSize: 24,
            cursor: "pointer",
            padding: 8,
            transition: "color 0.3s ease",
          }}
          className="nav-burger"
          aria-label={menuOpen ? t.misc.menuClose : t.misc.menuOpen}
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          {menuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id={MOBILE_MENU_ID}
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.misc.menuOpen}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: 68,
              left: 0,
              right: 0,
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(10,10,15,0.08)",
              padding: "24px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              maxHeight: "calc(100vh - 68px)",
              overflowY: "auto",
            }}
            className="nav-mobile-menu"
          >
            <Image
              src="/assets/logos/proodz-logo.svg"
              alt="Proodz"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/assets/logo-placeholder.svg"; }}
              width={110}
              height={20}
              style={{ objectFit: "contain", display: "block", width: 110, height: "auto", marginBottom: 4 }}
            />
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMenuOpen(false)}
                style={{ color: "#0A0A0F", textDecoration: "none", fontSize: 16, fontWeight: 500 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="/contact"
              data-ga-event="cta_click"
              data-ga-label="nav_mobile_audit_gratuit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMenuOpen(false)}
              style={{
                background: "#4361EE",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "12px 24px",
                borderRadius: 10,
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              {t.nav.cta} →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
        @media (max-width: 640px) {
          .site-nav { padding: 0 16px !important; }
          .nav-cta-top { display: none !important; }
          .nav-burger { padding: 8px 4px !important; }
          .nav-mobile-menu { padding: 20px 16px !important; }
        }
        .brand-logo-wrap { filter: drop-shadow(0 0 0 rgba(61,90,255,0)); transition: filter 0.35s ease; }
        .brand-logo-wrap:hover { filter: drop-shadow(0 0 8px rgba(61,90,255,0.42)); }
      `}</style>
    </motion.nav>
  );
}

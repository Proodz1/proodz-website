"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fr } from "./fr";
import { en } from "./en";
import type { Translations } from "./types";

type Lang = "fr" | "en";

const LanguageContext = createContext<{
  lang: Lang;
  t: Translations;
  toggle: () => void;
}>({ lang: "fr", t: fr, toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("proodz-lang") as Lang | null;
    if (saved === "en") {
      const timeoutId = window.setTimeout(() => setLang("en"), 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => {
    const next = lang === "fr" ? "en" : "fr";
    setLang(next);
    localStorage.setItem("proodz-lang", next);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: lang === "fr" ? fr : en, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/i18n/LanguageContext";
import { getSector, buildSector } from "@/lib/sectors";
import type { SectorLang } from "@/lib/sectors";
import type { Translations } from "@/i18n/types";

type Meta = { title: string; description: string };

function metaFor(pathname: string, t: Translations, lang: "fr" | "en"): Meta | null {
  if (pathname === "/" || pathname === "") return t.seo.home;
  if (pathname.startsWith("/accompagnement")) return t.seo.accompagnement;
  if (pathname.startsWith("/methode")) return t.seo.methode;
  if (pathname.startsWith("/contact")) return t.seo.contact;
  if (pathname.startsWith("/portfolio")) return t.seo.portfolio;
  if (pathname.startsWith("/a-propos")) return t.seo.about;
  const m = pathname.match(/^\/secteurs\/([^/]+)/);
  if (m) {
    const sector = getSector(m[1]);
    if (sector) {
      const full = buildSector(sector, lang as SectorLang);
      return { title: full.seoTitle, description: full.seoDescription };
    }
  }
  return null;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function RouteMetadata() {
  const { t, lang } = useLang();
  const pathname = usePathname();
  const last = useRef("");

  useEffect(() => {
    const meta = metaFor(pathname ?? "/", t, lang);
    if (!meta) return;
    const key = `${lang}:${pathname}:${meta.title}`;
    if (key === last.current) return;
    last.current = key;
    document.documentElement.lang = lang;
    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:locale", lang === "fr" ? "fr_FR" : "en_US");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
  }, [pathname, t, lang]);

  return null;
}

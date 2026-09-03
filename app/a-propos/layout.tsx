import type { Metadata } from "next";
import { fr } from "@/i18n/fr";

export const metadata: Metadata = {
  title: fr.seo.about.title,
  description: fr.seo.about.description,
  openGraph: {
    title: fr.seo.about.title,
    description: fr.seo.about.description,
    url: "https://proodz.com/a-propos",
    siteName: "Proodz",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/banners/banner2.jpg", width: 2048, height: 1152, alt: fr.seo.about.title }],
  },
  alternates: { canonical: "/a-propos" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

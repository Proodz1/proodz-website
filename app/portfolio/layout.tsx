import type { Metadata } from "next";
import { fr } from "@/i18n/fr";

export const metadata: Metadata = {
  title: fr.seo.portfolio.title,
  description: fr.seo.portfolio.description,
  openGraph: {
    title: fr.seo.portfolio.title,
    description: fr.seo.portfolio.description,
    url: "https://proodz.com/portfolio",
    siteName: "Proodz",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/banners/banner2.jpg", width: 2048, height: 1152, alt: fr.seo.portfolio.title }],
  },
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

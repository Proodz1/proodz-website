import type { Metadata } from "next";
import { fr } from "@/i18n/fr";

export const metadata: Metadata = {
  title: fr.seo.methode.title,
  description: fr.seo.methode.description,
  openGraph: {
    title: fr.seo.methode.title,
    description: fr.seo.methode.description,
    url: "https://proodz.com/methode",
    siteName: "Proodz",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/banners/banner2.jpg", width: 2048, height: 1152, alt: fr.seo.methode.title }],
  },
  alternates: { canonical: "/methode" },
};

export default function MethodeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import { fr } from "@/i18n/fr";

export const metadata: Metadata = {
  title: fr.seo.accompagnement.title,
  description: fr.seo.accompagnement.description,
  openGraph: {
    title: fr.seo.accompagnement.title,
    description: fr.seo.accompagnement.description,
    url: "https://proodz.com/accompagnement",
    siteName: "Proodz",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/banners/banner2.jpg", width: 2048, height: 1152, alt: fr.seo.accompagnement.title }],
  },
  alternates: { canonical: "/accompagnement" },
};

export default function AccompagnementLayout({ children }: { children: React.ReactNode }) {
  return children;
}

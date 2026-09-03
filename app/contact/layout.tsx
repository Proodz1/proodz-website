import type { Metadata } from "next";
import { fr } from "@/i18n/fr";

export const metadata: Metadata = {
  title: fr.seo.contact.title,
  description: fr.seo.contact.description,
  openGraph: {
    title: fr.seo.contact.title,
    description: fr.seo.contact.description,
    url: "https://proodz.com/contact",
    siteName: "Proodz",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/assets/banners/banner2.jpg", width: 2048, height: 1152, alt: fr.seo.contact.title }],
  },
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

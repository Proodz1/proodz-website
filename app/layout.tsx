import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import LogoIntro from "@/components/animations/LogoIntro";
import RouteMetadata from "@/components/seo/RouteMetadata";
import JsonLd from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import ConsentBanner from "@/components/analytics/ConsentBanner";
import AnalyticsListener from "@/components/analytics/AnalyticsListener";
import Chatbot from "@/components/sections/Chatbot";
import { fr } from "@/i18n/fr";
import "./globals.css";

const spaceGrotesk = localFont({
  src: [
    { path: "./fonts/space-grotesk-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/space-grotesk-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/space-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://proodz.com"),
  title: fr.seo.home.title,
  description: fr.seo.home.description,
  keywords: fr.seo.home.keywords,
  openGraph: {
    title: fr.seo.home.title,
    description: fr.seo.home.description,
    url: "https://proodz.com",
    siteName: "Proodz",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/assets/banners/banner2.jpg", width: 2048, height: 1152, alt: fr.seo.home.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: fr.seo.home.title,
    description: fr.seo.home.description,
    images: ["/assets/banners/banner2.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen antialiased`}>
        <GoogleAnalytics />
        <Providers>
          <RouteMetadata />
          <JsonLd />
          <LogoIntro />
          {children}
          <Chatbot />
          <ConsentBanner />
          <AnalyticsListener />
        </Providers>
      </body>
    </html>
  );
}

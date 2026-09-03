import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSector, getAllSlugs, buildSector } from "@/lib/sectors";
import SectorClient from "./SectorClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  const fr = buildSector(sector, "fr");
  const url = `https://proodz.com/secteurs/${slug}`;
  return {
    title: fr.seoTitle,
    description: fr.seoDescription,
    alternates: {
      canonical: url,
      languages: { "fr-FR": url, "en-US": url },
    },
    openGraph: {
      title: fr.seoTitle,
      description: fr.seoDescription,
      url,
      siteName: "Proodz",
      locale: "fr_FR",
      type: "website",
      images: [{ url: "/assets/banners/banner2.jpg", width: 2048, height: 1152, alt: `Proodz — ${fr.name}` }],
    },
  };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSector(slug)) notFound();
  return <SectorClient slug={slug} />;
}

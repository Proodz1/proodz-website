import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUxCaseStudy, publishedUxCaseStudies } from "@/lib/ux-cases";
import { fr } from "@/i18n/fr";
import UxCaseClient from "./UxCaseClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedUxCaseStudies().map((c) => ({ "project-slug": c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ "project-slug": string }> }): Promise<Metadata> {
  const { "project-slug": slug } = await params;
  const cs = getUxCaseStudy(slug);
  if (!cs) return {};
  const url = `https://proodz.com/portfolio/ux-design/${slug}`;
  const title = `Proodz — ${cs.clientName} — ${fr.portfolio.uxDesign}`;
  return {
    title,
    description: cs.shortDescriptionFr,
    alternates: {
      canonical: url,
      languages: { "fr-FR": url, "en-US": url },
    },
    openGraph: {
      title,
      description: cs.shortDescriptionFr,
      url,
      siteName: "Proodz",
      locale: "fr_FR",
      type: "website",
      images: [{ url: cs.coverVisual, alt: cs.clientName }],
    },
  };
}

export default async function UxCasePage({ params }: { params: Promise<{ "project-slug": string }> }) {
  const { "project-slug": slug } = await params;
  const cs = getUxCaseStudy(slug);
  if (!cs) notFound();
  return <UxCaseClient slug={slug} />;
}
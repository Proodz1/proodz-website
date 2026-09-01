import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/sectors";

const BASE = "https://proodz.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/accompagnement",
    "/portfolio",
    "/methode",
    "/contact",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...getAllSlugs().map((slug) => ({
      url: `${BASE}/secteurs/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

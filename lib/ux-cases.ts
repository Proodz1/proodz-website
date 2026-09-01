export interface UxCaseStudy {
  slug: string;
  clientName: string;
  clientLogo?: string;
  category: "ux-design";
  coverVisual: string;
  shortDescriptionFr: string;
  shortDescriptionEn: string;
  introductionFr: string;
  introductionEn: string;
  challengeFr: string;
  challengeEn: string;
  approachFr: string;
  approachEn: string;
  deliverablesFr: string[];
  deliverablesEn: string[];
  visuals: string[];
  externalProjectUrl?: string;
  published: boolean;
}

const thryveVisuals = Array.from(
  { length: 15 },
  (_, i) => `/portfolio/thryve/th-${String(i + 1).padStart(2, "0")}.webp`,
);

export const uxCaseStudies: UxCaseStudy[] = [
  {
    slug: "thryve",
    clientName: "Thryve",
    category: "ux-design",
    coverVisual: "/portfolio/thryve/th-01.webp",
    shortDescriptionFr: "Concept de marque axé sur l'IA : identité, logo et direction artistique.",
    shortDescriptionEn: "AI-driven brand concept: identity, logo and art direction.",
    introductionFr:
      "Thryve est un concept de marque axé sur l'IA, conçu pour incarner l'innovation, l'intelligence et une transformation digitale fluide. Proodz a travaillé la direction artistique et l'identité visuelle de ce projet.",
    introductionEn:
      "Thryve is an AI-driven brand concept designed to embody innovation, intelligence and seamless digital transformation. Proodz developed the art direction and visual identity for this concept.",
    challengeFr:
      "Construire une identité visuelle qui représente la synergie entre la technologie et le potentiel humain, avec une esthétique à la fois épurée, moderne et dynamique.",
    challengeEn:
      "Build a visual identity that embodies the synergy between technology and human potential, with a sleek, modern and dynamic aesthetic.",
    approachFr:
      "Direction artistique complète : logo, identité visuelle, mascotte et déclinaisons graphiques pensées pour être cohérentes et adaptables sur tous les supports.",
    approachEn:
      "Full art direction: logo, visual identity, mascot and graphic extensions designed to be consistent and adaptable across all media.",
    deliverablesFr: ["Logo & mascotte", "Identité visuelle", "Direction artistique", "Déclinaisons graphiques"],
    deliverablesEn: ["Logo & mascot", "Visual identity", "Art direction", "Graphic extensions"],
    visuals: thryveVisuals,
    externalProjectUrl: "https://www.behance.net/gallery/219980797/Thryve-Branding",
    published: true,
  },
];

export const getUxCaseStudy = (slug: string) => uxCaseStudies.find((c) => c.slug === slug);

export const publishedUxCaseStudies = () => uxCaseStudies.filter((c) => c.published);
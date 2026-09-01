export const categoryKeys = ["digital-presence", "audiovisual-production"] as const;
export type CategoryKey = (typeof categoryKeys)[number];
export type ClientLang = "fr" | "en";

export interface Slide {
  type: "image" | "video";
  src: string;
  poster?: string;
  label?: { fr: string; en: string };
}

export interface ScopeKpi {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  slides: Slide[];
  category: CategoryKey[];
  kpis?: { fr: ScopeKpi[]; en: ScopeKpi[] };
  results?: { fr: ScopeKpi[]; en: ScopeKpi[] };
}

export interface Client {
  name: string;
  slug?: string;
  logo?: string;
  sector: { fr: string; en: string };
  description: { fr: string; en: string };
  tags: { fr: string[]; en: string[] };
  projects: Project[];
}

const immobilierImages = Array.from({ length: 9 }, (_, i) => `/portfolio/immobilier/immobilier-${i + 1}.png`);
const padelsImages = Array.from({ length: 10 }, (_, i) => `/portfolio/padels/padels-${i + 1}.png`);
const synergyImages = Array.from({ length: 10 }, (_, i) => `/portfolio/synergy/synergy-${i + 1}.png`);
const glowEssenceImages = Array.from({ length: 9 }, (_, i) => `/portfolio/glow-essence/glow-essence-${i + 1}.png`);
const cellsiusImages = Array.from({ length: 13 }, (_, i) => `/portfolio/cellsius/cellsius-img-${i + 1}.png`);
const cellsiusVideos = Array.from({ length: 8 }, (_, i) => `/portfolio/cellsius/cellsius-video-${i + 1}.mp4`);
const energyImages = Array.from({ length: 5 }, (_, i) => `/portfolio/energy/energy-${i + 1}.png`);
const energyVideo = "/portfolio/energy/energy-video-1.mp4";
const productionVideos = Array.from({ length: 35 }, (_, i) => `https://proodz.com/vid%C3%A9os/vid${i + 1}.mp4`);

const productionVideoLabels: { fr: string; en: string }[] = [
  { fr: "Nightlife & ambiance — Majorelle Tunis", en: "Nightlife & vibe — Majorelle Tunis" },
  { fr: "DJ set Omar — Shahba Music", en: "DJ set Omar — Shahba Music" },
  { fr: "Session musicale — Adnyl pour RoomRecords", en: "Music session — Adnyl for RoomRecords" },
  { fr: "Campagne visuelle — Campagn Art", en: "Visual campaign — Campagn Art" },
  { fr: "Session Not Even Noticed — Downtown Vibes", en: "Not Even Noticed session — Downtown Vibes" },
  { fr: "Set Acid Minimal — Zarrouki pour RoomRecords", en: "Acid Minimal set — Zarrouki for RoomRecords" },
  { fr: "Set DJ RoomRecords", en: "RoomRecords DJ set" },
  { fr: "Soirée Bipolarity", en: "Bipolarity night" },
  { fr: "Eyedentity — la magie de l'iris", en: "Eyedentity — the magic of the iris" },
  { fr: "Masterclass culinaire — Chef Marc-Aurel", en: "Culinary masterclass — Chef Marc-Aurel" },
  { fr: "Omnia Coffee Lounge — café & shisha", en: "Omnia Coffee Lounge — coffee & shisha" },
  { fr: "4 essentiels pour chaque voyage", en: "4 essentials for every trip" },
  { fr: "Teaser Matteo Bayrem — TOF", en: "Teaser Matteo Bayrem — TOF" },
  { fr: "Functional Training — entraînement complet", en: "Functional Training — full workout" },
  { fr: "Bitcall 5 — final", en: "Bitcall 5 — final" },
  { fr: "BodyPump — Oxygène Fitness & Performance", en: "BodyPump — Oxygène Fitness & Performance" },
  { fr: "Catamaran — croisière du 16 août", en: "Catamaran — August 16th cruise" },
  { fr: "Cura Sinda V01", en: "Cura Sinda V01" },
  { fr: "Crabe bleu — Académie des chefs", en: "Blue crab — Chefs Academy" },
  { fr: "Recette tunisienne en partenariat Houita", en: "Tunisian recipe in partnership with Houita" },
  { fr: "Aftermovie — nuit du 24 juin", en: "Aftermovie — the night of June 24th" },
  { fr: "Frames — Maestro Bayrem", en: "Frames — Maestro Bayrem" },
  { fr: "Petit-déjeuner chez Omnia — Ennasr", en: "Breakfast at Omnia — Ennasr" },
  { fr: "Gravity V02", en: "Gravity V02" },
  { fr: "Aftermovie — soirée du 23 juin", en: "Aftermovie — the evening of June 23rd" },
  { fr: "Mayyass — session", en: "Mayyass — session" },
  { fr: "Moma 01", en: "Moma 01" },
  { fr: "Moma 02", en: "Moma 02" },
  { fr: "Movari Islem V01", en: "Movari Islem V01" },
  { fr: "Tunis Open 2025 — moments forts", en: "Tunis Open 2025 — highlights" },
  { fr: "Lancement BodyPump 130 — Oxygène Lac 3", en: "BodyPump 130 launch — Oxygène Lac 3" },
  { fr: "Smoothie Power", en: "Smoothie Power" },
  { fr: "Production fais & client (WhatsApp)", en: "Fais client production (WhatsApp)" },
  { fr: "Chez Omnia — Ennasr", en: "At Omnia — Ennasr" },
  { fr: "Eyedentity — la beauté de vos yeux", en: "Eyedentity — the beauty of your eyes" },
];

export const clients: Client[] = [
  {
    name: "Glow Essence",
    slug: "marques-e-commerce",
    sector: { fr: "Cosmétique & Beauté", en: "Beauty & Wellness" },
    description: {
      fr: "Glow Essence est une marque qui développe son univers autour de la beauté et du bien-être. Proodz a accompagné la création de contenus visuels pensés pour renforcer son identité et sa présence digitale.",
      en: "Glow Essence is a beauty and wellness brand. Proodz supported the creation of visual content designed to strengthen its identity and digital presence.",
    },
    tags: { fr: ["Branding", "Création visuelle", "Social Media"], en: ["Branding", "Visual creation", "Social Media"] },
    projects: [
      {
        id: "ge-1",
        slides: glowEssenceImages.map((src, i) => ({
          type: "image" as const,
          src,
          label: { fr: `Création visuelle Glow Essence (${i + 1}/9)`, en: `Glow Essence visual creation (${i + 1}/9)` },
        })),
        category: ["digital-presence"],
        kpis: {
          fr: [
            { value: "9", label: "créations visuelles" },
            { value: "1080×1350", label: "format vertical 4:5" },
          ],
          en: [
            { value: "9", label: "visual creations" },
            { value: "1080×1350", label: "4:5 portrait format" },
          ],
        },
      },
    ],
  },
  {
    name: "Heights",
    slug: "immobilier",
    logo: "/logos/global-heights.png",
    sector: { fr: "Immobilier & Construction", en: "Real Estate & Construction" },
    description: {
      fr: "Promoteur immobilier haut de gamme. Production de visites virtuelles, vidéos de présentation de projets et supports de vente digitaux pour le marché international.",
      en: "Premium real estate developer. Production of virtual tours, project presentation videos and digital sales assets for the international market.",
    },
    tags: { fr: ["Création vidéo", "Digital", "Stratégie"], en: ["Video creation", "Digital", "Strategy"] },
    projects: [{ id: "hg-1", slides: immobilierImages.map((src) => ({ type: "image" as const, src, label: { fr: "Projet immobilier Heights", en: "Heights real estate project" } })), category: ["digital-presence"] }],
  },
  {
    name: "Padel Arena",
    slug: "sport-loisirs",
    logo: "/logos/padel-arena.png",
    sector: { fr: "Sport & Loisirs", en: "Sports & Leisure" },
    description: {
      fr: "Complexe de padel premium. Direction artistique, contenus visuels dynamiques pour les réseaux sociaux et supports de communication événementielle.",
      en: "Premium padel complex. Art direction, dynamic visual content for social media and event communication assets.",
    },
    tags: { fr: ["Branding", "Création visuelle", "Social Media"], en: ["Branding", "Visual creation", "Social Media"] },
    projects: [{ id: "pa-1", slides: padelsImages.map((src) => ({ type: "image" as const, src, label: { fr: "Complexe Padel Arena", en: "Padel Arena complex" } })), category: ["digital-presence"] }],
  },
  {
    name: "Synergy Partners",
    slug: "conseil-strategie",
    logo: "/logos/synergy-partners.png",
    sector: { fr: "Conseil & Stratégie", en: "Consulting & Strategy" },
    description: {
      fr: "Cabinet de conseil en stratégie et partenariats commerciaux. Identité visuelle premium, contenus corporate et supports de communication pour le marché international.",
      en: "Consulting firm in strategy and business partnerships. Premium visual identity, corporate content and communication assets for the international market.",
    },
    tags: { fr: ["Branding", "Stratégie", "Digital"], en: ["Branding", "Strategy", "Digital"] },
    projects: [{ id: "sp-1", slides: synergyImages.map((src) => ({ type: "image" as const, src, label: { fr: "Communication corporate Synergy", en: "Synergy corporate communication" } })), category: ["digital-presence"] }],
  },
  {
    name: "Cellsius",
    sector: { fr: "Climatisation & Confort", en: "Air Conditioning & Comfort" },
    description: {
      fr: "Cellsius propose des solutions de climatisation et de confort. Proodz accompagne la marque dans la création de contenus digitaux pour rendre son offre plus visible, plus claire et plus attractive sur les réseaux sociaux.",
      en: "Cellsius provides air-conditioning and comfort solutions. Proodz supports the brand with digital content designed to make its offer more visible, clear, and attractive on social media.",
    },
    tags: { fr: ["Création visuelle", "Social Media", "Contenu digital"], en: ["Visual creation", "Social Media", "Digital content"] },
    projects: [
      {
        id: "ce-1",
        slides: [
          ...cellsiusImages.map((src, i) => ({
            type: "image" as const,
            src,
            label: { fr: `Création visuelle Cellsius (${i + 1}/13)`, en: `Cellsius visual creation (${i + 1}/13)` },
          })),
          ...cellsiusVideos.map((src, i) => ({
            type: "video" as const,
            src,
            label: { fr: `Vidéo Cellsius (${i + 1}/8)`, en: `Cellsius video (${i + 1}/8)` },
          })),
        ],
        category: ["digital-presence"],
        kpis: {
          fr: [
            { value: "13", label: "créations visuelles" },
            { value: "8", label: "vidéos" },
            { value: "2", label: "formats de contenu (images & vidéos)" },
          ],
          en: [
            { value: "13", label: "visual creations" },
            { value: "8", label: "videos" },
            { value: "2", label: "content formats (images & videos)" },
          ],
        },
        results: {
          fr: [
            { value: "+8 000", label: "abonnés gagnés en 6 mois" },
            { value: "+160 %", label: "croissance (5 000 → 13 000)" },
            { value: "0 €", label: "budget publicitaire — 100 % organique" },
          ],
          en: [
            { value: "+8,000", label: "followers gained in 6 months" },
            { value: "+160%", label: "growth (5,000 → 13,000)" },
            { value: "$0", label: "ad spend — 100% organic" },
          ],
        },
      },
    ],
  },
  {
    name: "Energy Rent a Car",
    logo: "/logos/clients/energy-rent-a-car.png",
    sector: { fr: "Location de voitures", en: "Car Rental" },
    description: {
      fr: "Energy Rent a Car est une entreprise de location de voitures à Tunis. Proodz l’accompagne dans le renforcement de sa présence digitale afin de mieux présenter son offre, faciliter les demandes de réservation et attirer des clients qualifiés.",
      en: "Energy Rent a Car is a car-rental company based in Tunis. Proodz supports its digital presence to present its offer more clearly, facilitate booking enquiries, and attract qualified customers.",
    },
    tags: { fr: ["Web Design", "Création visuelle"], en: ["Web Design", "Visual creation"] },
    projects: [
      {
        id: "er-1",
        slides: [
          ...energyImages.map((src, i) => ({
            type: "image" as const,
            src,
            label: { fr: `Visuel Energy Rent a Car (${i + 1}/5)`, en: `Energy Rent a Car visual (${i + 1}/5)` },
          })),
          { type: "video" as const, src: energyVideo, label: { fr: "Vidéo Energy Rent a Car (1/1)", en: "Energy Rent a Car video (1/1)" } },
        ],
        category: ["digital-presence"],
      },
    ],
  },
  {
    name: "Proodz — Production Audiovisuelle",
    sector: { fr: "Production audiovisuelle", en: "Audiovisual production" },
    description: {
      fr: "Production audiovisuelle Proodz : captations d'événements, vidéos musicales, sessions live, contenus réseaux sociaux et films de marque pour nos clients, du tournage au montage final.",
      en: "Proodz audiovisual production: event coverage, music videos, live sessions, social media content and brand films for our clients, from filming to final edit.",
    },
    tags: { fr: ["Création vidéo", "Captation", "Montage"], en: ["Video creation", "Filming", "Editing"] },
    projects: [
      {
        id: "av-1",
        slides: productionVideos.map((src, i) => ({
          type: "video" as const,
          src,
          label: productionVideoLabels[i] || { fr: `Production audiovisuelle (${i + 1}/35)`, en: `Audiovisual production (${i + 1}/35)` },
        })),
        category: ["audiovisual-production"],
      },
    ],
  },
];

export const getClientByName = (name: string) => clients.find((c) => c.name === name);

export const clientText = (client: Client, lang: ClientLang) => ({
  sector: client.sector[lang],
  description: client.description[lang],
  tags: client.tags[lang],
});

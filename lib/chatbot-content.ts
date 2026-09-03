export type ChatAction =
  | { type: "bubble"; id: string }
  | { type: "link"; href: string }
  | { type: "diagnostic" }
  | { type: "whatsapp" }
  | { type: "call" }
  | { type: "email" };

export interface ChatOption {
  label: string;
  action: ChatAction;
}

export interface ChatBubble {
  text: string;
  options: ChatOption[];
}

export interface KeywordRule {
  match: string[];
  bubble: string;
}

export interface ChatbotContent {
  name: string;
  online: string;
  typing: string;
  placeholder: string;
  send: string;
  ariaOpen: string;
  ariaClose: string;
  whatsappUrl: string;
  bubbles: Record<string, ChatBubble>;
  keywords: KeywordRule[];
}

export type ChatbotLocale = "fr" | "en";

const WHATSAPP_URL =
  "https://wa.me/21694809417?text=Bonjour%20Proodz%2C%20je%20souhaite%20discuter%20de%20mon%20projet.";

const DIAG: ChatAction = { type: "diagnostic" };
const WA: ChatAction = { type: "whatsapp" };
const CALL: ChatAction = { type: "call" };
const EMAIL: ChatAction = { type: "email" };
const MENU: ChatAction = { type: "bubble", id: "welcome" };

const bubbleOption = (label: string, id: string): ChatOption => ({ label, action: { type: "bubble", id } });
const linkOption = (label: string, href: string): ChatOption => ({ label, action: { type: "link", href } });
const diagOption = (label: string): ChatOption => ({ label, action: DIAG });
const waOption = (label: string): ChatOption => ({ label, action: WA });
const callOption = (label: string): ChatOption => ({ label, action: CALL });
const emailOption = (label: string): ChatOption => ({ label, action: EMAIL });
const menuOption = (label: string): ChatOption => ({ label, action: MENU });

const keywords: KeywordRule[] = [
  { match: ["diagnostic", "audit"], bubble: "diagnostic" },
  { match: ["publicit", "ads", "advertising", "campagne", "annonce"], bubble: "service-ads" },
  { match: ["site", "website", "web", "landing", "refonte"], bubble: "service-site" },
  { match: ["prix", "tarif", "price", "pricing", "cost", "combien", "budget", "devis"], bubble: "prix" },
  { match: ["immobilier", "immo", "real estate", "promoteur"], bubble: "sector-immobilier" },
  { match: ["tourisme", "travel", "hotel", "hôtel", "voyage", "réservation", "reservation"], bubble: "sector-tourisme" },
  { match: ["automobile", "voiture", "voitures", "car rental", "concession", "location"], bubble: "sector-automobile" },
  { match: ["marque", "marques", "brand", "brands", "e-commerce", "ecommerce", "boutique", "shop"], bubble: "sector-marques" },
  { match: ["plus de clients", "clients", "customers", "customer", "prospects", "leads"], bubble: "sectors" },
  { match: ["whatsapp", "contact", "joindre", "téléphone", "telephone", "phone", "équipe", "equipe", "appel"], bubble: "contact" },
];

export const chatbotContent: Record<ChatbotLocale, ChatbotContent> = {
  fr: {
    name: "Proodz Assistant",
    online: "En ligne",
    typing: "En train d'écrire...",
    placeholder: "Tapez votre message...",
    send: "Envoyer",
    ariaOpen: "Ouvrir le chat",
    ariaClose: "Fermer le chat",
    whatsappUrl: WHATSAPP_URL,
    bubbles: {
      welcome: {
        text: "Bonjour 👋 Je suis l’assistant Proodz. Comment puis-je vous orienter aujourd’hui ?",
        options: [
          bubbleOption("Découvrir Proodz", "discover"),
          bubbleOption("Nos services", "services"),
          bubbleOption("Je veux plus de clients", "sectors"),
          bubbleOption("Demander un diagnostic gratuit", "diagnostic"),
          bubbleOption("Nous contacter (WhatsApp, appel, e-mail)", "contact"),
        ],
      },
      discover: {
        text: "Proodz est une agence de transformation digitale. Nous aidons les entreprises à clarifier leur stratégie, renforcer leur présence digitale et générer des opportunités mesurables.",
        options: [
          linkOption("Voir notre accompagnement", "/accompagnement"),
          linkOption("Voir nos réalisations", "/portfolio"),
          diagOption("Demander un diagnostic"),
        ],
      },
      services: {
        text: "Voici nos expertises :",
        options: [
          bubbleOption("Stratégie digitale", "service-strategie"),
          bubbleOption("Site web & expérience digitale", "service-site"),
          bubbleOption("Publicité & acquisition", "service-ads"),
          bubbleOption("Branding & contenu", "service-branding"),
          bubbleOption("Transformation digitale", "service-transformation"),
          bubbleOption("Analytics & croissance", "service-analytics"),
        ],
      },
      "service-strategie": {
        text: "Stratégie digitale — une feuille de route claire et mesurable : audit, positionnement, canaux et actions prioritaires pour atteindre vos objectifs.",
        options: [
          linkOption("Voir l'accompagnement", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          menuOption("Retour au menu"),
        ],
      },
      "service-site": {
        text: "Site web & expérience digitale — des sites et landing pages à haute performance, pensés en UX/UI et construits pour convertir.",
        options: [
          linkOption("Voir l'accompagnement", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          menuOption("Retour au menu"),
        ],
      },
      "service-ads": {
        text: "Publicité & acquisition — des campagnes Meta et Google data-driven pour générer des leads qualifiés et une acquisition mesurable.",
        options: [
          linkOption("Voir l'accompagnement", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          menuOption("Retour au menu"),
        ],
      },
      "service-branding": {
        text: "Branding & contenu — positionnement, identité visuelle et contenus stratégiques qui différencient et donnent envie.",
        options: [
          linkOption("Voir l'accompagnement", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          menuOption("Retour au menu"),
        ],
      },
      "service-transformation": {
        text: "Transformation digitale — modernisation de vos opérations, de vos outils et de votre organisation pour passer à l'échelle.",
        options: [
          linkOption("Voir l'accompagnement", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          menuOption("Retour au menu"),
        ],
      },
      "service-analytics": {
        text: "Analytics & croissance — reporting, tests et expérimentation continue pour piloter une croissance durable et mesurable.",
        options: [
          linkOption("Voir l'accompagnement", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          menuOption("Retour au menu"),
        ],
      },
      sectors: {
        text: "Dans quel secteur évoluez-vous ?",
        options: [
          bubbleOption("Immobilier", "sector-immobilier"),
          bubbleOption("Tourisme & voyage", "sector-tourisme"),
          bubbleOption("Automobile", "sector-automobile"),
          bubbleOption("Marques & e-commerce", "sector-marques"),
          bubbleOption("Mobilier & aménagement", "sector-mobilier"),
          bubbleOption("PME & services", "sector-pme"),
          bubbleOption("B2B industrie & export", "sector-b2b"),
          bubbleOption("Autre", "sector-autre"),
        ],
      },
      "sector-immobilier": {
        text: "L'immobilier se joue sur la visibilité et la confiance. Nous aidons promoteurs, agences et programmes à attirer des demandes qualifiées avec des sites premium et des campagnes orientées leads.",
        options: [
          linkOption("Découvrir notre approche", "/secteurs/immobilier"),
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
        ],
      },
      "sector-tourisme": {
        text: "Pour le tourisme, l'enjeu est de capter l'attention avant le départ et de transformer l'inspiration en demandes et réservations, toute l'année.",
        options: [
          linkOption("Découvrir notre approche", "/secteurs/tourisme"),
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
        ],
      },
      "sector-automobile": {
        text: "Dans l'automobile, nous rendons chaque véhicule plus visible et plus désirable, avec des pages orientées demandes, essais et réservations, et un suivi via WhatsApp.",
        options: [
          linkOption("Découvrir notre approche", "/secteurs/automobile"),
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
        ],
      },
      "sector-marques": {
        text: "Pour les marques et e-commerces, nous combinons positionnement, branding, contenus et acquisition pour transformer votre présence en croissance durable.",
        options: [
          linkOption("Découvrir notre approche", "/secteurs/marques-e-commerce"),
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
        ],
      },
      "sector-mobilier": {
        text: "Pour le mobilier et l'aménagement, nous valorisons vos produits avec une identité forte et des contenus premium qui transforment l'intérêt en demandes.",
        options: [
          linkOption("Découvrir notre approche", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
        ],
      },
      "sector-pme": {
        text: "Pour les PME et services, nous construisons une présence digitale claire qui inspire confiance et attire des clients réguliers, sans superflu.",
        options: [
          linkOption("Découvrir notre approche", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
        ],
      },
      "sector-b2b": {
        text: "Pour le B2B, l'industrie et l'export, nous structurons positionnement, contenus et campagnes pour générer des leads qualifiés, de la Tunisie vers le monde.",
        options: [
          linkOption("Découvrir notre approche", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
        ],
      },
      "sector-autre": {
        text: "Chaque secteur a ses enjeux. Nous commençons toujours par comprendre votre marché, votre objectif et votre situation pour construire une approche adaptée.",
        options: [
          linkOption("Découvrir notre approche", "/accompagnement"),
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
        ],
      },
      diagnostic: {
        text: "Très bien. En quelques étapes, nous allons comprendre votre secteur, votre objectif et votre situation actuelle.",
        options: [diagOption("Commencer le diagnostic gratuit →")],
      },
      prix: {
        text: "Nos accompagnements sont construits sur mesure : chaque projet est chiffré selon vos objectifs, votre secteur et votre budget. Discutons-en pour vous proposer l'offre adaptée.",
        options: [
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
          menuOption("Retour au menu"),
        ],
      },
      contact: {
        text: "Le plus rapide est de nous écrire sur WhatsApp. Vous pouvez aussi nous appeler ou nous écrire par e-mail.",
        options: [
          waOption("Parler sur WhatsApp"),
          callOption("Appeler Proodz"),
          emailOption("Écrire par e-mail"),
          diagOption("Demander un diagnostic"),
          menuOption("Retour au menu"),
        ],
      },
      fallback: {
        text: "Pour vous orienter précisément, choisissez une option ci-dessous ou échangez directement avec notre équipe sur WhatsApp.",
        options: [
          diagOption("Demander un diagnostic"),
          waOption("Parler sur WhatsApp"),
          menuOption("Retour au menu"),
        ],
      },
    },
    keywords,
  },
  en: {
    name: "Proodz Assistant",
    online: "Online",
    typing: "Typing...",
    placeholder: "Type your message...",
    send: "Send",
    ariaOpen: "Open chat",
    ariaClose: "Close chat",
    whatsappUrl: WHATSAPP_URL,
    bubbles: {
      welcome: {
        text: "Hello 👋 I’m the Proodz Assistant. How can I guide you today?",
        options: [
          bubbleOption("Discover Proodz", "discover"),
          bubbleOption("Our services", "services"),
          bubbleOption("I want more customers", "sectors"),
          bubbleOption("Request a free diagnostic", "diagnostic"),
          bubbleOption("Contact us (WhatsApp, call, email)", "contact"),
        ],
      },
      discover: {
        text: "Proodz is a digital transformation agency. We help businesses clarify their strategy, strengthen their digital presence and generate measurable opportunities.",
        options: [
          linkOption("See our support", "/accompagnement"),
          linkOption("See our work", "/portfolio"),
          diagOption("Request a diagnostic"),
        ],
      },
      services: {
        text: "Here are our areas of expertise:",
        options: [
          bubbleOption("Digital Strategy", "service-strategie"),
          bubbleOption("Web & Digital Experience", "service-site"),
          bubbleOption("Advertising & Acquisition", "service-ads"),
          bubbleOption("Branding & Content", "service-branding"),
          bubbleOption("Digital Transformation", "service-transformation"),
          bubbleOption("Analytics & Growth", "service-analytics"),
        ],
      },
      "service-strategie": {
        text: "Digital Strategy — a clear, measurable roadmap: audit, positioning, channels and priority actions to reach your goals.",
        options: [
          linkOption("See our support", "/accompagnement"),
          diagOption("Request a diagnostic"),
          menuOption("Back to menu"),
        ],
      },
      "service-site": {
        text: "Web & Digital Experience — high-performance websites and landing pages, designed with UX/UI excellence and built to convert.",
        options: [
          linkOption("See our support", "/accompagnement"),
          diagOption("Request a diagnostic"),
          menuOption("Back to menu"),
        ],
      },
      "service-ads": {
        text: "Advertising & Acquisition — data-driven Meta and Google campaigns that generate qualified leads and measurable acquisition.",
        options: [
          linkOption("See our support", "/accompagnement"),
          diagOption("Request a diagnostic"),
          menuOption("Back to menu"),
        ],
      },
      "service-branding": {
        text: "Branding & Content — positioning, visual identity and strategic content that set you apart and create desire.",
        options: [
          linkOption("See our support", "/accompagnement"),
          diagOption("Request a diagnostic"),
          menuOption("Back to menu"),
        ],
      },
      "service-transformation": {
        text: "Digital Transformation — modernizing your operations, tools and organization so your business can scale with confidence.",
        options: [
          linkOption("See our support", "/accompagnement"),
          diagOption("Request a diagnostic"),
          menuOption("Back to menu"),
        ],
      },
      "service-analytics": {
        text: "Analytics & Growth — reporting, testing and continuous experimentation to drive sustainable, measurable growth.",
        options: [
          linkOption("See our support", "/accompagnement"),
          diagOption("Request a diagnostic"),
          menuOption("Back to menu"),
        ],
      },
      sectors: {
        text: "Which sector do you operate in?",
        options: [
          bubbleOption("Real Estate", "sector-immobilier"),
          bubbleOption("Tourism & Travel", "sector-tourisme"),
          bubbleOption("Automotive", "sector-automobile"),
          bubbleOption("Brands & E-commerce", "sector-marques"),
          bubbleOption("Furniture & Furnishing", "sector-mobilier"),
          bubbleOption("SMBs & Services", "sector-pme"),
          bubbleOption("B2B, Industry & Export", "sector-b2b"),
          bubbleOption("Other", "sector-autre"),
        ],
      },
      "sector-immobilier": {
        text: "Real estate is won on visibility and trust. We help developers, agencies and programs attract qualified enquiries with premium websites and lead-driven campaigns.",
        options: [
          linkOption("Discover our approach", "/secteurs/immobilier"),
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
        ],
      },
      "sector-tourisme": {
        text: "In tourism, the goal is to capture attention before departure and turn inspiration into enquiries and bookings, all year round.",
        options: [
          linkOption("Discover our approach", "/secteurs/tourisme"),
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
        ],
      },
      "sector-automobile": {
        text: "In automotive, we make every vehicle more visible and desirable, with pages built for enquiries, test drives and bookings, plus WhatsApp follow-up.",
        options: [
          linkOption("Discover our approach", "/secteurs/automobile"),
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
        ],
      },
      "sector-marques": {
        text: "For brands and e-commerce, we combine positioning, branding, content and acquisition to turn your presence into sustainable growth.",
        options: [
          linkOption("Discover our approach", "/secteurs/marques-e-commerce"),
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
        ],
      },
      "sector-mobilier": {
        text: "For furniture and furnishing, we showcase your products with a strong identity and premium content that turns interest into enquiries.",
        options: [
          linkOption("Discover our approach", "/accompagnement"),
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
        ],
      },
      "sector-pme": {
        text: "For SMBs and services, we build a clear digital presence that builds trust and attracts recurring clients — without the fluff.",
        options: [
          linkOption("Discover our approach", "/accompagnement"),
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
        ],
      },
      "sector-b2b": {
        text: "For B2B, industry and export, we structure positioning, content and campaigns to generate qualified leads — from Tunisia to the world.",
        options: [
          linkOption("Discover our approach", "/accompagnement"),
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
        ],
      },
      "sector-autre": {
        text: "Every sector has its own challenges. We always start by understanding your market, your goal and your situation to build a tailored approach.",
        options: [
          linkOption("Discover our approach", "/accompagnement"),
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
        ],
      },
      diagnostic: {
        text: "Great. In a few steps, we'll understand your sector, your goal and your current situation.",
        options: [diagOption("Start the free diagnostic →")],
      },
      prix: {
        text: "Our engagements are built to measure: each project is priced according to your goals, your sector and your budget. Let's talk so we can offer you the right fit.",
        options: [
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
          menuOption("Back to menu"),
        ],
      },
      contact: {
        text: "The fastest way is to message us on WhatsApp. You can also call us or write to us by email.",
        options: [
          waOption("Chat on WhatsApp"),
          callOption("Call Proodz"),
          emailOption("Email us"),
          diagOption("Request a diagnostic"),
          menuOption("Back to menu"),
        ],
      },
      fallback: {
        text: "To guide you accurately, choose an option below or chat directly with our team on WhatsApp.",
        options: [
          diagOption("Request a diagnostic"),
          waOption("Chat on WhatsApp"),
          menuOption("Back to menu"),
        ],
      },
    },
    keywords,
  },
};

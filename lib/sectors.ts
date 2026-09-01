export type SectorLang = "fr" | "en";

export interface SectorTemplate {
  heroLabel: string;
  ctaPrimary: string;
  ctaSecondary: string;
  challengesTitle: string;
  approachTitle: string;
  servicesTitle: string;
  processTitle: string;
  process: { title: string; desc: string }[];
  workTitle: string;
  workSubtitle: string;
  faqTitle: string;
  finalTitle: string;
  finalHighlight: string;
  finalSubtitle: string;
  finalCta: string;
}

export interface SectorVariable {
  name: string;
  hint: string;
  heroLabelFull?: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  headlineHighlight: string;
  description: string;
  challenges: { title: string; desc: string }[];
  approach: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaPrimary?: string;
  challengesTitle?: string;
  approachTitle?: string;
  finalTitle?: string;
  finalHighlight?: string;
  finalCta?: string;
  finalSubtitle?: string;
  process?: { title: string; desc: string }[];
}

export interface Sector {
  slug: string;
  serviceIndexes: number[];
  projectIds: string[];
  ctaPrimaryService?: number;
  ctaSecondaryService?: number;
  heroTheme?: "navy" | "light";
  fr: SectorVariable;
  en: SectorVariable;
}

export interface SectorFull extends SectorTemplate {
  name: string;
  heroLabelFull?: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  headlineHighlight: string;
  description: string;
  challenges: { title: string; desc: string }[];
  approach: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  serviceIndexes: number[];
  projectIds: string[];
  ctaPrimaryService?: number;
  ctaSecondaryService?: number;
  heroTheme?: "navy" | "light";
}

export const sectorTemplate: Record<SectorLang, SectorTemplate> = {
  fr: {
    heroLabel: "Proodz pour le secteur ",
    ctaPrimary: "Demander un diagnostic gratuit",
    ctaSecondary: "Parler de mon projet",
    challengesTitle: "LES ENJEUX DU SECTEUR",
    approachTitle: "COMMENT PROODZ ACCOMPAGNE VOTRE CROISSANCE",
    servicesTitle: "NOS RECOMMANDATIONS POUR VOTRE SECTEUR",
    processTitle: "NOTRE PROCESSUS EN 5 ÉTAPES",
    process: [
      { title: "Diagnostic", desc: "Analyse de votre présence digitale, de vos priorités et de vos opportunités pour identifier les actions à fort impact." },
      { title: "Stratégie", desc: "Une feuille de route claire : positionnement, canaux, contenus et ressources pour atteindre vos objectifs." },
      { title: "Déploiement", desc: "Construction et mise en place : actifs digitaux, contenus, campagnes et outils de mesure." },
      { title: "Optimisation", desc: "Tests, ajustements et amélioration continue en fonction des données et des résultats." },
      { title: "Croissance", desc: "Passage à l'échelle des actions qui fonctionnent, pour une croissance durable et mesurable." },
    ],
    workTitle: "RÉALISATIONS DANS LE SECTEUR",
    workSubtitle: "Des collaborations concrètes dans votre secteur. Découvrez l'ensemble de nos projets sur le portfolio.",
    faqTitle: "QUESTIONS FRÉQUENTES",
    finalTitle: "PRÊT À TRANSFORMER VOTRE ",
    finalHighlight: "CROISSANCE ?",
    finalSubtitle: "Diagnostic initial gratuit · Réponse sous 24h · Sans engagement.",
    finalCta: "Demander un diagnostic gratuit",
  },
  en: {
    heroLabel: "Proodz for the ",
    ctaPrimary: "Request a free diagnostic",
    ctaSecondary: "Talk about my project",
    challengesTitle: "SECTOR CHALLENGES",
    approachTitle: "HOW PROODZ SUPPORTS YOUR GROWTH",
    servicesTitle: "RECOMMENDED FOR YOUR SECTOR",
    processTitle: "OUR 5-STEP PROCESS",
    process: [
      { title: "Diagnostic", desc: "Review of your digital presence, priorities and opportunities to identify high-impact actions." },
      { title: "Strategy", desc: "A clear roadmap: positioning, channels, content and resources to reach your goals." },
      { title: "Deployment", desc: "Build and launch: digital assets, content, campaigns and measurement tools." },
      { title: "Optimization", desc: "Testing, tuning and continuous improvement driven by data and results." },
      { title: "Growth", desc: "Scaling what works for sustainable, measurable growth." },
    ],
    workTitle: "WORK IN THE SECTOR",
    workSubtitle: "Real collaborations in your sector. Explore all our projects on the portfolio.",
    faqTitle: "FREQUENTLY ASKED QUESTIONS",
    finalTitle: "READY TO TRANSFORM YOUR ",
    finalHighlight: "GROWTH?",
    finalSubtitle: "Free initial diagnostic · Reply within 24h · No commitment.",
    finalCta: "Request a free diagnostic",
  },
};

export const sectors: Sector[] = [
  {
    slug: "immobilier",
    serviceIndexes: [1, 2, 3, 4, 5],
    projectIds: ["Heights"],
    ctaPrimaryService: 3,
    ctaSecondaryService: 5,
    fr: {
      name: "Immobilier",
      hint: "Vous évoluez dans l'immobilier ? Découvrir notre approche",
      heroLabelFull: "Proodz pour l'immobilier",
      seoTitle: "Agence marketing immobilier en Tunisie | Proodz",
      seoDescription: "Proodz accompagne les promoteurs, agences et projets immobiliers : sites et landing pages qui convertissent, campagnes orientées leads et suivi des demandes qualifiées.",
      headline: "TRANSFORMEZ VOTRE VISIBILITÉ EN",
      headlineHighlight: "DEMANDES QUALIFIÉES.",
      description: "Proodz accompagne les promoteurs immobiliers, agences et programmes immobiliers avec une stratégie digitale pensée pour attirer, convaincre et convertir les bons acquéreurs, investisseurs ou locataires.",
      ctaPrimary: "Demander un diagnostic immobilier gratuit",
      challengesTitle: "LES ENJEUX DU MARCHÉ IMMOBILIER",
      approachTitle: "UNE STRATÉGIE CONÇUE POUR CONVERTIR",
      challenges: [
        { title: "LA CONCURRENCE S'INTENSIFIE", desc: "Le nombre de projets immobiliers et de supports de communication augmente. Une présence digitale faible ou générique rend votre offre invisible." },
        { title: "GÉNÉRER DES DEMANDES QUALIFIÉES", desc: "L'objectif n'est pas d'augmenter le trafic pour le plaisir, mais d'attirer des prospects réellement prêts à s'engager." },
        { title: "INSPIRER CONFIANCE AVANT LE PREMIER CONTACT", desc: "Un projet se choisit sur la confiance. Le contenu, le site et la communication doivent convaincre avant le premier échange." },
      ],
      approach: [
        { title: "Sites & landing pages qui convertissent", desc: "Des pages claires et premium qui présentent vos projets et transforment chaque visite en demande d'information." },
        { title: "Campagnes Ads orientées leads", desc: "Meta et Google Ads ciblés pour capter acheteurs, investisseurs et locataires, avec un suivi précis des demandes." },
        { title: "Valorisation immobilière", desc: "Visuels, vidéos et contenus immersifs qui subliment vos biens et créent de l'émotion et de la confiance." },
        { title: "Optimisation & analytique", desc: "Pilotage des données, CRM et amélioration continue pour concentrer vos efforts sur ce qui convertit." },
      ],
      faqs: [
        { q: "Comment obtenir plus de demandes pour un projet immobilier ?", a: "Par une stratégie combinée : une présentation claire et premium de vos projets (site, visuels, vidéos), des campagnes ciblées sur les bons canaux et un suivi rigoureux des demandes pour concentrer vos efforts sur les prospects réellement intéressés." },
        { q: "Faut-il un site web dédié à chaque programme immobilier ?", a: "Pas nécessairement un site complet, mais une page ou landing page dédiée par programme est très recommandée : elle permet de présenter le projet, de générer des demandes ciblées et d'en mesurer précisément l'origine. Nous adaptons la structure à votre portefeuille de projets." },
        { q: "Quels canaux publicitaires sont les plus efficaces pour l'immobilier ?", a: "Cela dépend de votre cible (acheteurs, investisseurs, locataires) et de votre marché. En pratique, Google Ads capte les intentions de recherche et Meta touche des audiences à fort potentiel avec des contenus visuels. Nous définissons la combinaison la plus adaptée à votre objectif." },
        { q: "Comment mesurez-vous la qualité des leads ?", a: "Nous qualifions chaque demande selon son origine, son degré d'intérêt et son adéquation avec vos critères (budget, localisation, type de bien). Grâce au suivi dans un CRM et à l'analyse des sources, nous ajustons la stratégie pour améliorer la qualité, pas seulement le volume." },
      ],
      finalTitle: "PRÊT À ATTIRER LES ",
      finalHighlight: "BONS PROSPECTS ?",
      finalCta: "Demander mon diagnostic immobilier",
    },
    en: {
      name: "Real Estate",
      hint: "Do you work in real estate? Discover our approach",
      heroLabelFull: "Proodz for real estate",
      seoTitle: "Real estate marketing agency in Tunisia | Proodz",
      seoDescription: "Proodz supports developers, agencies and real estate projects: websites and landing pages that convert, lead-driven campaigns and qualified enquiry tracking.",
      headline: "TURN YOUR VISIBILITY INTO",
      headlineHighlight: "QUALIFIED ENQUIRIES.",
      description: "Proodz supports real estate developers, agencies and programs with a digital strategy designed to attract, convince and convert the right buyers, investors or tenants.",
      ctaPrimary: "Request a free real estate diagnostic",
      challengesTitle: "THE REAL ESTATE MARKET CHALLENGES",
      approachTitle: "A STRATEGY BUILT TO CONVERT",
      challenges: [
        { title: "INTENSIFYING COMPETITION", desc: "More real estate projects and marketing channels keep multiplying. A weak or generic digital presence makes your offer invisible." },
        { title: "GENERATE QUALIFIED ENQUIRIES", desc: "The goal is not traffic for its own sake, but prospects genuinely ready to engage." },
        { title: "BUILD TRUST BEFORE FIRST CONTACT", desc: "A project is chosen on trust. Content, website and communication must convince before the first conversation." },
      ],
      approach: [
        { title: "Websites & landing pages that convert", desc: "Clear, premium pages that present your projects and turn every visit into an enquiry." },
        { title: "Lead-driven ad campaigns", desc: "Targeted Meta and Google Ads to reach buyers, investors and tenants, with precise enquiry tracking." },
        { title: "Real estate showcase", desc: "Visuals, video and immersive content that elevate your properties and create emotion and trust." },
        { title: "Optimization & analytics", desc: "Data steering, CRM and continuous improvement to focus your efforts on what converts." },
      ],
      faqs: [
        { q: "How can we get more enquiries for a real estate project?", a: "Through a combined strategy: a clear, premium presentation of your projects (website, visuals, videos), targeted campaigns on the right channels and rigorous enquiry follow-up to focus on genuinely interested prospects." },
        { q: "Do we need a dedicated website for each real estate program?", a: "Not necessarily a full website, but a dedicated page or landing page per program is strongly recommended: it presents the project, generates targeted enquiries and lets you measure their source precisely. We adapt the structure to your project portfolio." },
        { q: "Which advertising channels are most effective for real estate?", a: "It depends on your target (buyers, investors, tenants) and your market. In practice, Google Ads captures search intent and Meta reaches high-potential audiences with visual content. We define the best combination for your goal." },
        { q: "How do you measure lead quality?", a: "We qualify each enquiry by source, level of interest and fit with your criteria (budget, location, property type). With CRM tracking and source analysis, we adjust the strategy to improve quality, not just volume." },
      ],
      finalTitle: "READY TO ATTRACT THE ",
      finalHighlight: "RIGHT PROSPECTS?",
      finalCta: "Request my real estate diagnostic",
    },
  },
  {
    slug: "sport-loisirs",
    serviceIndexes: [1, 2, 3, 4],
    projectIds: ["Padel Arena"],
    fr: {
      name: "Sport & Loisirs",
      hint: "Vous êtes un acteur du sport et des loisirs ? Découvrir notre approche",
      seoTitle: "Proodz pour le sport & loisirs — Marque, acquisition & fidélisation",
      seoDescription: "Proodz aide clubs et complexes sportifs à remplir leurs créneaux : identité de marque, présence digitale, acquisition de membres et fidélisation de la communauté.",
      headline: "FAITES DE VOTRE COMPLEXE UNE ",
      headlineHighlight: "DESTINATION RECHERCHÉE.",
      description: "Du club au complexe, Proodz construit une marque forte et une stratégie d'acquisition qui remplissent vos créneaux, fidélisent vos adhérents et développent votre communauté.",
      challenges: [
        { title: "Une concurrence locale", desc: "Clubs, salles et complexes se multiplient. Sans image différenciante, votre offre se confond avec celle des concurrents." },
        { title: "Le taux d'occupation", desc: "Des créneaux vides, ce sont des revenus perdus. L'acquisition et la promotion doivent être continues, pas ponctuelles." },
        { title: "L'engagement de la communauté", desc: "Un adhérent fidèle revient et recommande. Contenu et expérience digitale jouent un rôle clé dans la fidélisation." },
      ],
      approach: [
        { title: "Identité & marque", desc: "Positionnement, identité visuelle et direction artistique qui donnent à votre structure une image premium et cohérente." },
        { title: "Présence digitale", desc: "Sites, réseaux sociaux et contenus dynamiques qui mettent en valeur vos installations et votre ambiance." },
        { title: "Acquisition de membres", desc: "Campagnes ciblées pour attirer de nouveaux adhérents et remplir vos créneaux, avec un suivi des inscriptions." },
        { title: "Fidélisation & communauté", desc: "Stratégie éditoriale et social media pour maintenir l'engagement, développer la communauté et les recommandations." },
      ],
      faqs: [
        { q: "Comment attirer de nouveaux adhérents rapidement ?", a: "Par une combinaison de stratégie : une identité forte, des contenus qui montrent l'expérience, et des campagnes d'acquisition ciblées autour de votre zone de chalandise." },
        { q: "Gérez-vous les réseaux sociaux du club ?", a: "Oui. Nous définissons une stratégie éditoriale et produisons les contenus visuels adaptés, avec un planning et des performances suivies chaque mois." },
        { q: "Pouvons-nous lancer une opération d'inscription ou un événement ?", a: "Oui. Nous concevons les supports et les campagnes pour vos événements et promotions, en cohérence avec votre identité." },
      ],
    },
    en: {
      name: "Sports & Leisure",
      hint: "Do you work in sports & leisure? Discover our approach",
      seoTitle: "Proodz for sports & leisure — Brand, acquisition & retention",
      seoDescription: "Proodz helps clubs and sports venues fill their slots: brand identity, digital presence, member acquisition and community retention.",
      headline: "MAKE YOUR VENUE A ",
      headlineHighlight: "GO-TO DESTINATION.",
      description: "From club to complex, Proodz builds a strong brand and an acquisition strategy that fills your slots, retains members and grows your community.",
      challenges: [
        { title: "Local competition", desc: "Clubs, gyms and venues keep multiplying. Without a differentiating image, your offer blends in with the competition." },
        { title: "Occupancy rate", desc: "Empty slots mean lost revenue. Acquisition and promotion must be continuous, not one-off." },
        { title: "Community engagement", desc: "A loyal member comes back and recommends. Content and digital experience are key to retention." },
      ],
      approach: [
        { title: "Brand & identity", desc: "Positioning, visual identity and art direction that give your venue a premium, consistent image." },
        { title: "Digital presence", desc: "Websites, social media and dynamic content that showcase your facilities and atmosphere." },
        { title: "Member acquisition", desc: "Targeted campaigns to attract new members and fill your slots, with enrolment tracking." },
        { title: "Retention & community", desc: "Editorial and social media strategy to sustain engagement, grow the community and drive referrals." },
      ],
      faqs: [
        { q: "How can we attract new members quickly?", a: "Through a combination: a strong identity, content that showcases the experience, and targeted acquisition campaigns around your catchment area." },
        { q: "Do you manage the club's social media?", a: "Yes. We define an editorial strategy and produce the adapted visual content, with a schedule and performance tracked every month." },
        { q: "Can we run a membership or event campaign?", a: "Yes. We design the assets and campaigns for your events and promotions, consistent with your identity." },
      ],
    },
  },
  {
    slug: "conseil-strategie",
    serviceIndexes: [0, 2, 3, 5],
    projectIds: ["Synergy Partners"],
    fr: {
      name: "Conseil & Stratégie",
      hint: "Vous êtes un cabinet de conseil ? Découvrir notre approche",
      seoTitle: "Proodz pour conseil & stratégie — Crédibilité, identité & acquisition B2B",
      seoDescription: "Proodz aide cabinets de conseil et services professionnels à inspirer confiance : positionnement expert, identité corporate premium et acquisition de leads qualifiés.",
      headline: "INSTALLEZ VOTRE CABINET COMME UNE ",
      headlineHighlight: "AUTORITÉ DE SON MARCHÉ.",
      description: "Cabinets de conseil, d'avocats, services professionnels : Proodz construit une présence digitale crédible qui inspire confiance et attire des clients à forte valeur.",
      challenges: [
        { title: "La crédibilité avant tout", desc: "Un cabinet se choisit sur la confiance. Une présence digitale faible ou datée freine la prise de décision des prospects exigeants." },
        { title: "Des décideurs pressés", desc: "Vos cibles comparent en quelques minutes. Message, clarté et qualité visuelle déterminent le premier rendez-vous." },
        { title: "Une réputation internationale", desc: "Pour viser des clients à l'étranger, la cohérence de la marque et des contenus doit être irréprochable sur tous les marchés." },
      ],
      approach: [
        { title: "Positionnement expert", desc: "Nous structurons votre offre et votre discours pour que votre savoir-faire soit immédiatement compréhensible et différenciant." },
        { title: "Identité corporate premium", desc: "Identité visuelle, contenus corporate et supports qui reflètent le sérieux et la qualité de vos services." },
        { title: "Acquisition B2B", desc: "Stratégie de contenu et campagnes ciblées pour générer des leads qualifiés auprès de vos décideurs." },
        { title: "Croissance mesurée", desc: "Reporting et pilotage pour mesurer l'impact de chaque action et optimiser la conversion de vos prospects." },
      ],
      faqs: [
        { q: "Comment un cabinet de conseil peut-il se différencier en ligne ?", a: "Par un positionnement clair, une identité premium et des contenus qui démontrent l'expertise. Nous construisons cet écosystème digital de façon cohérente." },
        { q: "Vos méthodes sont-elles adaptées aux services professionnels ?", a: "Oui. Notre approche est conçue pour les offres à forte valeur ajoutée : discours de positionnement, contenu de crédibilité et acquisition ciblée de décideurs." },
        { q: "Peut-on cibler des clients internationaux ?", a: "Oui, avec des contenus adaptés et des campagnes multilingues orientées vers vos marchés cibles." },
      ],
    },
    en: {
      name: "Consulting & Strategy",
      hint: "Do you work in strategy consulting? Discover our approach",
      seoTitle: "Proodz for consulting & strategy — Credibility, identity & B2B acquisition",
      seoDescription: "Proodz helps consulting firms and professional services build trust: expert positioning, premium corporate identity and qualified lead acquisition.",
      headline: "MAKE YOUR FIRM A ",
      headlineHighlight: "MARKET AUTHORITY.",
      description: "Consulting firms, law firms, professional services: Proodz builds a credible digital presence that inspires trust and attracts high-value clients.",
      challenges: [
        { title: "Credibility first", desc: "A firm is chosen on trust. A weak or outdated digital presence blocks demanding prospects from making a decision." },
        { title: "Time-pressed decision-makers", desc: "Your targets compare within minutes. Message, clarity and visual quality decide the first meeting." },
        { title: "International reputation", desc: "To win clients abroad, brand and content consistency must be flawless across all markets." },
      ],
      approach: [
        { title: "Expert positioning", desc: "We structure your offer and message so your expertise is immediately understandable and differentiating." },
        { title: "Premium corporate identity", desc: "Visual identity, corporate content and assets that reflect the seriousness and quality of your services." },
        { title: "B2B acquisition", desc: "Content strategy and targeted campaigns to generate qualified leads among your decision-makers." },
        { title: "Measured growth", desc: "Reporting and steering to measure the impact of every action and optimize prospect conversion." },
      ],
      faqs: [
        { q: "How can a consulting firm stand out online?", a: "Through clear positioning, a premium identity and content that demonstrates expertise. We build that digital ecosystem coherently." },
        { q: "Are your methods adapted to professional services?", a: "Yes. Our approach is designed for high-value offers: positioning narrative, credibility content and targeted acquisition of decision-makers." },
        { q: "Can we target international clients?", a: "Yes, with adapted content and multilingual campaigns aimed at your target markets." },
      ],
    },
  },
  {
    slug: "tourisme",
    serviceIndexes: [1, 2, 4, 3, 5],
    projectIds: ["Wanderlust", "Jasmin Travel"],
    ctaPrimaryService: 3,
    ctaSecondaryService: 5,
    heroTheme: "navy",
    fr: {
      name: "Tourisme",
      hint: "Vous évoluez dans le tourisme ? Découvrir notre approche",
      heroLabelFull: "Proodz pour le tourisme",
      seoTitle: "Agence marketing tourisme en Tunisie | Proodz",
      seoDescription: "Proodz accompagne les agences de voyages, hôtels et marques touristiques avec une stratégie digitale orientée visibilité, demandes qualifiées et réservations.",
      headline: "FAITES DE VOTRE DESTINATION UNE ",
      headlineHighlight: "EXPÉRIENCE QUI ATTIRE.",
      description: "Proodz accompagne les acteurs du tourisme avec une stratégie digitale conçue pour inspirer, rassurer et transformer l'intérêt en demandes et réservations.",
      ctaPrimary: "Demander un diagnostic tourisme gratuit",
      challengesTitle: "LES ENJEUX DU TOURISME AUJOURD'HUI",
      approachTitle: "UNE STRATÉGIE QUI FAIT VOYAGER VOTRE MARQUE",
      challenges: [
        { title: "CAPTER L'ATTENTION AVANT LE DÉPART", desc: "Les voyageurs choisissent une destination, un hôtel ou une expérience bien avant de prendre contact. Votre présence digitale doit donner envie immédiatement." },
        { title: "TRANSFORMER L'INSPIRATION EN RÉSERVATION", desc: "Un contenu attractif ne suffit pas : vos campagnes, vos pages et vos parcours doivent simplifier la demande et la réservation." },
        { title: "RESTER VISIBLE AU-DELÀ DES SAISONS", desc: "Une stratégie claire permet de maintenir l'intérêt, d'adapter les campagnes et de cibler les bons marchés au bon moment." },
      ],
      approach: [
        { title: "Sites et pages de destination orientés demandes et réservations", desc: "Des pages claires et premium qui présentent vos offres et transforment chaque visite en demande ou réservation." },
        { title: "Campagnes Meta et Google Ads ciblées par marché, période et intention", desc: "Des campagnes adaptées à votre cible, à la saison et à l'intention pour capter les bons voyageurs au bon moment." },
        { title: "Vidéos, contenus et storytelling qui valorisent l'expérience", desc: "Des contenus immersifs qui donnent envie de voyager, rassurent et différencient votre destination ou votre offre." },
        { title: "Suivi des demandes, reporting et optimisation continue", desc: "Un pilotage des demandes et de la performance pour concentrer vos efforts sur ce qui convertit le mieux." },
      ],
      faqs: [
        { q: "Comment obtenir plus de demandes de réservation ?", a: "Nous travaillons le parcours complet : visibilité, contenu, campagnes, pages de conversion et suivi des demandes afin de faciliter le passage à l'action." },
        { q: "Faut-il investir dans Google Ads ou Meta Ads ?", a: "Les deux canaux peuvent être complémentaires. Le choix dépend de votre marché, de la saison, de votre offre et du moment où votre client prend sa décision." },
        { q: "Pouvez-vous toucher des voyageurs internationaux ?", a: "Oui. Nous adaptons les campagnes, les contenus et les parcours selon les marchés ciblés et les langues nécessaires." },
        { q: "Comment valoriser une expérience touristique ?", a: "Avec une combinaison de storytelling, visuels, vidéos, offres claires et pages qui donnent au voyageur les informations nécessaires pour prendre contact." },
      ],
      process: [
        { title: "Diagnostic", desc: "Analyse de votre présence digitale, de vos canaux et de votre parcours de réservation pour identifier les actions à fort impact." },
        { title: "Stratégie", desc: "Une feuille de route claire : marchés cibles, canaux, contenus et saisonnalité pour atteindre vos objectifs." },
        { title: "Création", desc: "Conception des actifs : sites, pages, visuels, vidéos et campagnes pensés pour inspirer et convertir." },
        { title: "Diffusion", desc: "Lancement et déploiement des campagnes et des contenus sur les bons marchés, au bon moment." },
        { title: "Optimisation", desc: "Suivi des performances, tests et ajustements continus pour améliorer durablement les résultats." },
      ],
      finalTitle: "PRÊT À ATTIRER PLUS DE ",
      finalHighlight: "VOYAGEURS ?",
      finalSubtitle: "Commencez par un diagnostic gratuit de votre visibilité, de vos campagnes et de votre parcours de réservation.",
      finalCta: "Demander mon diagnostic tourisme",
    },
    en: {
      name: "Tourism",
      hint: "Do you work in tourism? Discover our approach",
      heroLabelFull: "Proodz for tourism",
      seoTitle: "Tourism marketing agency in Tunisia | Proodz",
      seoDescription: "Proodz supports travel agencies, hotels and tourism brands with a digital strategy focused on visibility, qualified enquiries and bookings.",
      headline: "MAKE YOUR DESTINATION AN ",
      headlineHighlight: "EXPERIENCE THAT ATTRACTS.",
      description: "Proodz supports tourism businesses with a digital strategy designed to inspire, reassure and turn interest into enquiries and bookings.",
      ctaPrimary: "Request a free tourism diagnostic",
      challengesTitle: "TOURISM CHALLENGES TODAY",
      approachTitle: "A STRATEGY THAT TAKES YOUR BRAND FURTHER",
      challenges: [
        { title: "CAPTURE ATTENTION BEFORE DEPARTURE", desc: "Travelers choose a destination, hotel or experience long before reaching out. Your digital presence must inspire immediately." },
        { title: "TURN INSPIRATION INTO BOOKINGS", desc: "Attractive content is not enough: your campaigns, pages and journeys must simplify enquiry and booking." },
        { title: "STAY VISIBLE BEYOND THE SEASONS", desc: "A clear strategy keeps interest alive, adapts campaigns and targets the right markets at the right time." },
      ],
      approach: [
        { title: "Destination websites and pages built for enquiries and bookings", desc: "Clear, premium pages that present your offers and turn every visit into an enquiry or booking." },
        { title: "Meta and Google Ads campaigns targeted by market, period and intent", desc: "Campaigns adapted to your audience, the season and intent to reach the right travelers at the right time." },
        { title: "Video, content and storytelling that showcase the experience", desc: "Immersive content that inspires travel, reassures and sets your destination or offer apart." },
        { title: "Enquiry tracking, reporting and continuous optimization", desc: "Data-driven management of enquiries and performance to focus on what converts best." },
      ],
      faqs: [
        { q: "How can we get more booking enquiries?", a: "We work on the full journey: visibility, content, campaigns, conversion pages and enquiry follow-up to make taking action easy." },
        { q: "Should we invest in Google Ads or Meta Ads?", a: "Both channels can be complementary. The choice depends on your market, the season, your offer and when your customer decides." },
        { q: "Can you reach international travelers?", a: "Yes. We adapt campaigns, content and journeys to the target markets and the languages required." },
        { q: "How do you showcase a tourism experience?", a: "With a combination of storytelling, visuals, video, clear offers and pages that give travelers the information they need to get in touch." },
      ],
      process: [
        { title: "Diagnostic", desc: "Review of your digital presence, channels and booking journey to identify high-impact actions." },
        { title: "Strategy", desc: "A clear roadmap: target markets, channels, content and seasonality to reach your goals." },
        { title: "Creation", desc: "Design of assets: websites, pages, visuals, videos and campaigns built to inspire and convert." },
        { title: "Launch", desc: "Roll-out of campaigns and content on the right markets, at the right time." },
        { title: "Optimization", desc: "Performance tracking, testing and continuous tuning to improve results over time." },
      ],
      finalTitle: "READY TO ATTRACT MORE ",
      finalHighlight: "TRAVELERS?",
      finalSubtitle: "Start with a free diagnostic of your visibility, campaigns and booking journey.",
      finalCta: "Request my tourism diagnostic",
    },
  },
  {
    slug: "automobile",
    serviceIndexes: [1, 2, 4, 3, 5],
    projectIds: [],
    ctaPrimaryService: 3,
    ctaSecondaryService: 5,
    heroTheme: "navy",
    fr: {
      name: "Automobile",
      hint: "Vous êtes un acteur de l'automobile ? Découvrir notre approche",
      heroLabelFull: "PROODZ POUR L'AUTOMOBILE",
      seoTitle: "Agence marketing automobile en Tunisie | Proodz",
      seoDescription: "Proodz accompagne les concessions, marques automobiles et entreprises de location avec une stratégie digitale orientée visibilité, demandes qualifiées et réservations.",
      headline: "TRANSFORMEZ L'INTÉRÊT EN DEMANDES, ",
      headlineHighlight: "ESSAIS ET RÉSERVATIONS.",
      description: "Proodz accompagne les marques automobiles, concessions et entreprises de location avec une stratégie digitale conçue pour rendre chaque véhicule plus visible, plus désirable et plus facile à réserver.",
      ctaPrimary: "Demander un diagnostic automobile gratuit",
      challengesTitle: "LES ENJEUX DU SECTEUR AUTOMOBILE",
      approachTitle: "UNE STRATÉGIE QUI MET VOTRE OFFRE EN MOUVEMENT",
      challenges: [
        { title: "SE DÉMARQUER DANS UN MARCHÉ TRÈS CONCURRENTIEL", desc: "Vos véhicules, offres et services doivent être vus par les bonnes personnes au bon moment." },
        { title: "TRANSFORMER LA VISIBILITÉ EN DEMANDES RÉELLES", desc: "Une belle publication ne suffit pas : le parcours doit conduire vers un appel, un message, un essai ou une réservation." },
        { title: "RÉPONDRE RAPIDEMENT AUX PROSPECTS", desc: "Chaque demande doit pouvoir être suivie efficacement pour éviter de perdre des opportunités." },
      ],
      approach: [
        { title: "Sites et landing pages orientés réservations et demandes", desc: "Des pages claires et premium qui présentent vos véhicules et transforment chaque visite en demande, essai ou réservation." },
        { title: "Campagnes Meta et Google Ads pour générer des prospects", desc: "Des campagnes ciblées pour capter l'intention et attirer des prospects qualifiés, par offre et par marché." },
        { title: "Photos, vidéos et contenus qui valorisent chaque véhicule", desc: "Des visuels qui mettent en valeur chaque véhicule et donnent envie de réserver ou de prendre contact." },
        { title: "Parcours WhatsApp, CRM et suivi des demandes", desc: "Un suivi structuré des demandes pour répondre rapidement et ne laisser aucune opportunité de côté." },
        { title: "Reporting et optimisation continue des performances", desc: "Un pilotage des résultats pour concentrer vos efforts sur ce qui génère le plus de demandes." },
      ],
      faqs: [
        { q: "Comment générer plus de demandes pour une location ou un véhicule ?", a: "Nous travaillons la visibilité, les campagnes, les visuels et le parcours de conversion afin de guider le prospect vers une demande, un appel ou une réservation." },
        { q: "Faut-il investir dans Meta Ads ou Google Ads ?", a: "Les deux peuvent être complémentaires. Google capte souvent une intention directe, tandis que Meta permet de toucher de nouvelles audiences avec des visuels et des offres adaptées." },
        { q: "Pouvez-vous connecter les demandes à WhatsApp ?", a: "Oui. Nous pouvons structurer le parcours pour diriger les prospects vers WhatsApp ou vers un système de suivi adapté à votre activité." },
        { q: "Comment valoriser plusieurs véhicules ou offres ?", a: "Avec une organisation claire : pages dédiées, contenus adaptés, campagnes par offre et suivi des résultats pour identifier ce qui génère le plus de demandes." },
      ],
      process: [
        { title: "Diagnostic", desc: "Analyse de votre présence digitale, de vos canaux et de votre parcours de demande pour identifier les actions à fort impact." },
        { title: "Stratégie", desc: "Une feuille de route claire : cibles, canaux, contenus et offres pour atteindre vos objectifs." },
        { title: "Création", desc: "Conception des actifs : sites, pages, visuels, photos, vidéos et campagnes pensés pour inspirer et convertir." },
        { title: "Diffusion", desc: "Lancement et déploiement des campagnes et des contenus auprès des bonnes audiences, au bon moment." },
        { title: "Optimisation", desc: "Suivi des performances, tests et ajustements continus pour améliorer durablement les résultats." },
      ],
      finalTitle: "PRÊT À FAIRE AVANCER VOTRE ",
      finalHighlight: "ACQUISITION ?",
      finalSubtitle: "Commencez par un diagnostic gratuit de votre visibilité, de vos campagnes et de votre parcours de demande.",
      finalCta: "Demander mon diagnostic automobile",
    },
    en: {
      name: "Automotive",
      hint: "Do you work in the automotive industry? Discover our approach",
      heroLabelFull: "PROODZ FOR AUTOMOTIVE",
      seoTitle: "Automotive marketing agency in Tunisia | Proodz",
      seoDescription: "Proodz supports dealerships, automotive brands and rental companies with a digital strategy focused on visibility, qualified enquiries and bookings.",
      headline: "TURN INTEREST INTO ENQUIRIES, ",
      headlineHighlight: "TEST DRIVES AND BOOKINGS.",
      description: "Proodz supports automotive brands, dealerships and rental companies with a digital strategy designed to make every vehicle more visible, more desirable and easier to book.",
      ctaPrimary: "Request a free automotive diagnostic",
      challengesTitle: "AUTOMOTIVE SECTOR CHALLENGES",
      approachTitle: "A STRATEGY THAT SETS YOUR OFFER IN MOTION",
      challenges: [
        { title: "STAND OUT IN A HIGHLY COMPETITIVE MARKET", desc: "Your vehicles, offers and services must be seen by the right people at the right time." },
        { title: "TURN VISIBILITY INTO REAL ENQUIRIES", desc: "A great post is not enough: the journey must lead to a call, a message, a test drive or a booking." },
        { title: "RESPOND TO PROSPECTS QUICKLY", desc: "Every enquiry must be tracked effectively so opportunities are never missed." },
      ],
      approach: [
        { title: "Booking- and enquiry-focused websites and landing pages", desc: "Clear, premium pages that present your vehicles and turn every visit into an enquiry, test drive or booking." },
        { title: "Meta and Google Ads campaigns to generate prospects", desc: "Targeted campaigns that capture intent and attract qualified prospects, per offer and per market." },
        { title: "Photos, videos and content that showcase every vehicle", desc: "Visuals that highlight each vehicle and make people want to book or get in touch." },
        { title: "WhatsApp journeys, CRM and enquiry follow-up", desc: "Structured enquiry tracking to respond quickly and never leave an opportunity behind." },
        { title: "Reporting and continuous performance optimization", desc: "Data-driven result management to focus on what generates the most enquiries." },
      ],
      faqs: [
        { q: "How can we generate more enquiries for a rental or a vehicle?", a: "We work on visibility, campaigns, visuals and the conversion journey to guide prospects toward an enquiry, a call or a booking." },
        { q: "Should we invest in Meta Ads or Google Ads?", a: "Both can be complementary. Google often captures direct intent, while Meta reaches new audiences with adapted visuals and offers." },
        { q: "Can you connect enquiries to WhatsApp?", a: "Yes. We can structure the journey to direct prospects to WhatsApp or to a tracking system suited to your business." },
        { q: "How do you showcase multiple vehicles or offers?", a: "With a clear structure: dedicated pages, adapted content, campaigns per offer and result tracking to identify what generates the most enquiries." },
      ],
      process: [
        { title: "Diagnostic", desc: "Review of your digital presence, channels and enquiry journey to identify high-impact actions." },
        { title: "Strategy", desc: "A clear roadmap: audiences, channels, content and offers to reach your goals." },
        { title: "Creation", desc: "Design of assets: websites, pages, visuals, photos, videos and campaigns built to inspire and convert." },
        { title: "Launch", desc: "Roll-out of campaigns and content to the right audiences, at the right time." },
        { title: "Optimization", desc: "Performance tracking, testing and continuous tuning to improve results over time." },
      ],
      finalTitle: "READY TO MOVE YOUR ",
      finalHighlight: "ACQUISITION FORWARD?",
      finalSubtitle: "Start with a free diagnostic of your visibility, campaigns and enquiry journey.",
      finalCta: "Request my automotive diagnostic",
    },
  },
  {
    slug: "marques-e-commerce",
    serviceIndexes: [3, 1, 4, 2, 5],
    projectIds: ["Cosmetic", "Glou"],
    ctaPrimaryService: 4,
    ctaSecondaryService: 3,
    heroTheme: "navy",
    fr: {
      name: "Marques & e-commerce",
      hint: "Vous êtes une marque ou un e-commerce ? Découvrir notre approche",
      heroLabelFull: "PROODZ POUR LES MARQUES & E-COMMERCE",
      seoTitle: "Agence marketing e-commerce et branding en Tunisie | Proodz",
      seoDescription: "Proodz accompagne les marques et e-commerces avec une stratégie digitale alliant branding, contenu, acquisition, conversion et croissance durable.",
      headline: "FAITES DE VOTRE MARQUE UNE ",
      headlineHighlight: "EXPÉRIENCE QUI ATTIRE ET CONVERTIT.",
      description: "Proodz aide les marques et e-commerces à clarifier leur positionnement, valoriser leurs produits et transformer leur présence digitale en croissance durable.",
      ctaPrimary: "Demander un diagnostic e-commerce gratuit",
      challengesTitle: "LES ENJEUX DES MARQUES AUJOURD'HUI",
      approachTitle: "UNE MARQUE FORTE, UN PARCOURS QUI CONVERTIT",
      challenges: [
        { title: "SE DIFFÉRENCIER DANS UN MARCHÉ SATURÉ", desc: "Une identité cohérente et une proposition claire sont essentielles pour capter l'attention et créer de la préférence." },
        { title: "TRANSFORMER L'AUDIENCE EN CLIENTS", desc: "Le trafic, les abonnés et les vues n'ont de valeur que s'ils contribuent à des demandes, des ventes ou une relation durable." },
        { title: "GARDER UNE COMMUNICATION COHÉRENTE", desc: "Vos contenus, vos publicités, votre site et vos offres doivent raconter la même histoire et rendre l'achat plus simple." },
      ],
      approach: [
        { title: "Positionnement, identité visuelle et direction créative", desc: "Une marque claire et cohérente qui se distingue, inspire confiance et crée de la préférence." },
        { title: "Sites e-commerce et landing pages orientés conversion", desc: "Des pages qui présentent vos produits et guident le visiteur vers l'achat ou la demande." },
        { title: "Contenus, vidéos et storytelling de marque", desc: "Des contenus qui racontent votre histoire, valorisent vos produits et développent votre communauté." },
        { title: "Campagnes Meta et Google Ads pour l'acquisition", desc: "Des campagnes ciblées pour attirer les bonnes audiences et transformer l'attention en ventes." },
        { title: "Reporting, analyse et optimisation continue", desc: "Un pilotage des performances pour concentrer vos efforts sur ce qui convertit le mieux." },
      ],
      faqs: [
        { q: "Comment faire connaître une nouvelle marque ?", a: "Nous commençons par clarifier votre positionnement, vos cibles et votre message, puis nous construisons les contenus, les pages et les campagnes adaptés à vos objectifs." },
        { q: "Pouvez-vous améliorer un site e-commerce existant ?", a: "Oui. Nous analysons le parcours, les pages produits, les messages, les appels à l'action et les sources d'acquisition pour identifier les priorités d'amélioration." },
        { q: "Faut-il investir dans le branding avant la publicité ?", a: "Une identité et un message cohérents améliorent l'efficacité de la publicité. L'ordre dépend toutefois de votre situation, de votre offre et de vos objectifs immédiats." },
        { q: "Comment mesurez-vous la performance d'une marque en ligne ?", a: "Nous suivons les indicateurs utiles à votre objectif : trafic, demandes, ventes, coût d'acquisition, engagement et évolution des performances dans le temps." },
      ],
      process: [
        { title: "Diagnostic", desc: "Analyse de votre positionnement, de votre présence digitale et de votre parcours de conversion pour identifier les actions à fort impact." },
        { title: "Positionnement", desc: "Clarification de votre positionnement, de vos cibles et de votre message pour différencier votre marque." },
        { title: "Création", desc: "Conception des actifs : identité, contenus, vidéos, site et pages pensés pour attirer et convertir." },
        { title: "Acquisition", desc: "Lancement et déploiement des campagnes et des contenus auprès des bonnes audiences." },
        { title: "Optimisation", desc: "Suivi des performances, tests et ajustements continus pour améliorer durablement les résultats." },
      ],
      finalTitle: "PRÊT À FAIRE GRANDIR VOTRE ",
      finalHighlight: "MARQUE ?",
      finalSubtitle: "Commencez par un diagnostic gratuit de votre positionnement, de votre présence digitale et de vos opportunités de croissance.",
      finalCta: "Demander mon diagnostic e-commerce",
    },
    en: {
      name: "Brands & E-commerce",
      hint: "Do you run a brand or e-commerce? Discover our approach",
      heroLabelFull: "PROODZ FOR BRANDS & E-COMMERCE",
      seoTitle: "E-commerce and branding marketing agency in Tunisia | Proodz",
      seoDescription: "Proodz supports brands and e-commerce businesses with a digital strategy combining branding, content, acquisition, conversion and sustainable growth.",
      headline: "MAKE YOUR BRAND AN ",
      headlineHighlight: "EXPERIENCE THAT ATTRACTS AND CONVERTS.",
      description: "Proodz helps brands and e-commerce businesses clarify their positioning, showcase their products and turn their digital presence into sustainable growth.",
      ctaPrimary: "Request a free e-commerce diagnostic",
      challengesTitle: "BRAND CHALLENGES TODAY",
      approachTitle: "A STRONG BRAND, A JOURNEY THAT CONVERTS",
      challenges: [
        { title: "STAND OUT IN A SATURATED MARKET", desc: "A coherent identity and a clear proposition are essential to capture attention and build preference." },
        { title: "TURN AUDIENCE INTO CUSTOMERS", desc: "Traffic, followers and views only matter if they contribute to enquiries, sales or a lasting relationship." },
        { title: "KEEP COMMUNICATION CONSISTENT", desc: "Your content, ads, website and offers must tell the same story and make buying easier." },
      ],
      approach: [
        { title: "Positioning, visual identity and creative direction", desc: "A clear, coherent brand that stands out, builds trust and creates preference." },
        { title: "Conversion-focused e-commerce websites and landing pages", desc: "Pages that showcase your products and guide visitors toward a purchase or enquiry." },
        { title: "Content, video and brand storytelling", desc: "Content that tells your story, highlights your products and grows your community." },
        { title: "Meta and Google Ads campaigns for acquisition", desc: "Targeted campaigns that reach the right audiences and turn attention into sales." },
        { title: "Reporting, analytics and continuous optimization", desc: "Data-driven performance management to focus on what converts best." },
      ],
      faqs: [
        { q: "How do you make a new brand known?", a: "We start by clarifying your positioning, targets and message, then build the content, pages and campaigns suited to your goals." },
        { q: "Can you improve an existing e-commerce website?", a: "Yes. We analyze the journey, product pages, messaging, calls to action and acquisition sources to identify improvement priorities." },
        { q: "Should we invest in branding before advertising?", a: "A coherent identity and message improve advertising efficiency. The order however depends on your situation, offer and immediate goals." },
        { q: "How do you measure a brand's performance online?", a: "We track the metrics that matter for your goal: traffic, enquiries, sales, acquisition cost, engagement and performance trends over time." },
      ],
      process: [
        { title: "Diagnostic", desc: "Review of your positioning, digital presence and conversion journey to identify high-impact actions." },
        { title: "Positioning", desc: "Clarification of your positioning, targets and message to differentiate your brand." },
        { title: "Creation", desc: "Design of assets: identity, content, video, website and pages built to attract and convert." },
        { title: "Acquisition", desc: "Launch and roll-out of campaigns and content to reach the right audiences." },
        { title: "Optimization", desc: "Performance tracking, testing and continuous tuning to improve results over time." },
      ],
      finalTitle: "READY TO GROW YOUR ",
      finalHighlight: "BRAND?",
      finalSubtitle: "Start with a free diagnostic of your positioning, digital presence and growth opportunities.",
      finalCta: "Request my e-commerce diagnostic",
    },
  },
];

export const getSector = (slug: string): Sector | undefined => sectors.find((s) => s.slug === slug);

export const getAllSlugs = (): string[] => sectors.map((s) => s.slug);

export const buildSector = (sector: Sector, lang: SectorLang): SectorFull => {
  const v = sector[lang];
  const tpl = sectorTemplate[lang];
  return {
    ...tpl,
    ...v,
    serviceIndexes: sector.serviceIndexes,
    projectIds: sector.projectIds,
    ctaPrimaryService: sector.ctaPrimaryService,
    ctaSecondaryService: sector.ctaSecondaryService,
    heroTheme: sector.heroTheme,
  };
};

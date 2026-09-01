export interface Translations {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    method: string;
    contact: string;
    cta: string;
    homeAria: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    stats: { label: string }[];
    bannerAlt: string;
  };
  whyUs: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    cards: { title: string; desc: string; tags: string[] }[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  sectors: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    contactLine: string;
  };
  services: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    items: { title: string; desc: string; tags: string[] }[];
  };
  showreel: {
    label: string;
    title1: string;
    title2: string;
    placeholder: string;
    ariaPlay: string;
  };
  process: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    steps: { title: string; desc: string }[];
  };
  partners: {
    label: string;
    title1: string;
    title2: string;
    tagline: string;
  };
  ctaBand: {
    title1: string;
    title2: string;
    subtitle: string;
    supporting: string;
    formBtn: string;
    checks: string[];
    bannerAlt: string;
  };
  contactForm: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    infoEmail: string;
    infoPhone: string;
  };
  footer: {
    desc: string;
    navTitle: string;
    contactTitle: string;
    copyright: string;
    tagline: string;
    social: {
      facebook: string;
      instagram: string;
      linkedIn: string;
    };
  };
  // Portfolio page
  portfolio: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    all: string;
    digitalPresence: string;
    audiovisualProduction: string;
    uxDesign: string;
    webDevelopment: string;
    audiovisualTitle: string;
    statsWorks: string;
    statsSectors: string;
    statsCountries: string;
    video: string;
    image: string;
    noResults: string;
    ctaTitle1: string;
    ctaTitle2: string;
    ctaSubtitle: string;
    ctaBtn: string;
    ctaBack: string;
    imageSoon: string;
    projectCta: string;
    sectorCta: string;
    prev: string;
    next: string;
    slide: string;
    bannerAlt: string;
    viewWork: string;
    seeViewCaseStudy: string;
    scopeTitle: string;
    viewProject: string;
    resultsTitle: string;
  };
  // UX case study detail page
  uxCase: {
    back: string;
    categoryLabel: string;
    overviewTitle: string;
    contextLabel: string;
    challengeLabel: string;
    approachLabel: string;
    deliverablesLabel: string;
    visualsTitle: string;
    seeOriginal: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBtn: string;
    ctaBack: string;
  };
  // Accompagnement page
  accompagnement: {
    heroLabel: string;
    heroStatement1: string;
    heroStatement2: string;
    heroSupporting: string;
    heroCta: string;
    heroSecondaryCta: string;
    brandStatement: string;
    outcomesLabel: string;
    pillars: {
      id: string;
      number: string;
      title: string;
      promise: string;
      services: {
        title: string;
        sentence: string;
        capabilities: string[];
      }[];
      outcomes: string[];
      cta: string;
    }[];
    processLabel: string;
    processSteps: { title: string; desc: string }[];
    finalStatement1: string;
    finalStatement2: string;
    finalCta: string;
    finalSecondaryCta: string;
    finalReassurance: string;
  };
  // Méthode page
  methode: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    statsLabels: string[];
    outputLabel: string;
    checklistLabel: string;
    principlesLabel: string;
    principlesTitle1: string;
    principlesTitle2: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBtn: string;
    ctaSeeExpertises: string;
    steps: {
      title: string;
      duration: string;
      subtitle: string;
      desc: string;
      output: string;
      checklist: string[];
    }[];
    principles: { title: string; desc: string }[];
  };
  // Contact page
  contactPage: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
    trustLine: string;
    intentsLabel: string;
    sectorBadge: string;
    intents: { id: string; title: string; desc: string; service: string; external?: boolean }[];
    joinText: string;
    joinLink: string;
    formTitle1: string;
    formTitle2: string;
    formNote: string;
    nameLabel: string;
    companyLabel: string;
    emailLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    servicePlaceholder: string;
    serviceOptions: string[];
    budgetLabel: string;
    budgetPlaceholder: string;
    budgetOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    checks: string[];
    coordTitle: string;
    whatsappLabel: string;
    whatsappValue: string;
    whatsappSub: string;
    emailBlockLabel: string;
    emailValue: string;
    emailSub: string;
    socialLabel: string;
    faqLabel: string;
    faqTitle1: string;
    faqTitle2: string;
    faqs: { q: string; a: string }[];
    ctaTitle1: string;
    ctaTitle2: string;
    ctaText: string;
    ctaBtn: string;
    requiredError: string;
    emailError: string;
    successTitle: string;
    successText: string;
    successCta: string;
  };
  freeDiagnostic: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    stepPrefix: string;
    stepOf: string;
    stepShort: string[];
    stepHeadings: string[];
    stepSubtitles: string[];
    sectors: { slug: string; label: string }[];
    objectives: string[];
    situations: string[];
    budgets: string[];
    budgetNote: string;
    fields: {
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
    };
    back: string;
    continueBtn: string;
    submitBtn: string;
    trustLine: string;
    requiredError: string;
    emailError: string;
    phoneError: string;
    submitError: string;
    successTitle: string;
    successText: string;
    summaryTitle: string;
    summaryLabels: {
      sector: string;
      objective: string;
      situation: string;
      budget: string;
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
    };
    whatsappBtn: string;
    whatsappMsg: string;
    sendAnother: string;
    progressAria: string;
  };
  seo: {
    home: { title: string; description: string; keywords?: string };
    accompagnement: { title: string; description: string };
    methode: { title: string; description: string };
    contact: { title: string; description: string };
    portfolio: { title: string; description: string };
  };
  notFound: {
    code: string;
    title: string;
    subtitle: string;
    cta: string;
    back: string;
  };
  misc: {
    langToggle: string;
    menuOpen: string;
    menuClose: string;
    skipIntro: string;
    skipIntroShort: string;
    whatsapp: string;
  };
}

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://proodz.com/#organization",
        name: "Proodz",
        url: "https://proodz.com",
        logo: {
          "@type": "ImageObject",
          url: "https://proodz.com/assets/logos/proodz-logo.svg",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+216-94-809-417",
          email: "contact@proodz.com",
          contactType: "sales",
          areaServed: "TN",
          availableLanguage: ["fr", "en"],
        },
        sameAs: [
          "https://www.linkedin.com/company/111124097/",
          "https://www.instagram.com/pro.odz/",
          "https://www.facebook.com/profile.php?id=61578354071155",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://proodz.com/#website",
        url: "https://proodz.com",
        name: "Proodz",
        description: "Agence de transformation digitale : stratégie, création et acquisition.",
        inLanguage: "fr-FR",
        publisher: { "@id": "https://proodz.com/#organization" },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

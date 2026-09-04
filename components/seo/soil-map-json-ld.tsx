import { defaultLocale, dictionaries } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

/** Structured data always describes the default locale, matching how metadata is generated site-wide. */
const soilMapFaqItems = dictionaries[defaultLocale].soilMap.faq.items;

export function SoilMapJsonLd() {
  const organizationId = `${siteConfig.url}/#organization`;
  const pageUrl = `${siteConfig.url}/mapa-suelos-buenos-aires`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: "Mapa de Suelos de Buenos Aires | SuelosAR",
        description: "Consultá el mapa de suelos de la Provincia de Buenos Aires con SuelosAR. Cartografía de suelos, Cartas de Suelo y herramientas GIS basadas en fuentes del INTA, también offline.",
        inLanguage: "es-AR",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${siteConfig.url}/#software-application` },
        publisher: { "@id": organizationId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Mapa de Suelos de Buenos Aires", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: soilMapFaqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
    />
  );
}

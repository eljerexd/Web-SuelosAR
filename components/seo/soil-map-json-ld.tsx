import { SOIL_MAP_FAQ_ITEMS } from "@/components/soil-map/soil-map-data";
import { siteConfig } from "@/lib/site";

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
        mainEntity: SOIL_MAP_FAQ_ITEMS.map((item) => ({
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

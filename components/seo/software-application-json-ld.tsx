import { siteConfig } from "@/lib/site";

export function SoftwareApplicationJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SuelosAR",
    url: siteConfig.url,
    applicationCategory: "GIS Application",
    operatingSystem: ["Android", "Windows"],
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ARS",
    },
    description: "Aplicación GIS independiente para consultar cartografía de suelos de la Provincia de Buenos Aires.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
    />
  );
}

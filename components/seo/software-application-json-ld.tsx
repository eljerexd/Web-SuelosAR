import { siteConfig } from "@/lib/site";
import brandIcon from "@/public/icons/icon-512.png";
import { downloads } from "@/lib/downloads";

export function SoftwareApplicationJsonLd() {
  const organizationId = `${siteConfig.url}/#organization`;
  const applicationId = `${siteConfig.url}/#software-application`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "SuelosAR",
        url: siteConfig.url,
        logo: new URL(brandIcon.src, siteConfig.url).toString(),
        email: siteConfig.contactEmail,
        sameAs: [siteConfig.githubUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: "SuelosAR",
        alternateName: "SuelosAR GIS",
        inLanguage: "es-AR",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": applicationId,
        name: "SuelosAR",
        alternateName: "SuelosAR GIS",
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image`,
        screenshot: [
          `${siteConfig.url}/images/screenshots/hero-windows.png`,
          `${siteConfig.url}/images/screenshots/hero-android.png`,
        ],
        applicationCategory: "UtilitiesApplication",
        applicationSubCategory: "GIS Application",
        operatingSystem: ["Android 10 or later", "Windows 10", "Windows 11"],
        softwareRequirements: "Android 10 or later, or Windows 10/11",
        downloadUrl: [
          new URL(downloads.android.route, siteConfig.url).toString(),
          new URL(downloads.windows.route, siteConfig.url).toString(),
        ],
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "ARS",
          availability: "https://schema.org/OnlineOnly",
        },
        publisher: { "@id": organizationId },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Provincia de Buenos Aires",
          containedInPlace: {
            "@type": "Country",
            name: "Argentina",
          },
        },
        description: "Aplicación GIS independiente para consultar mapas y Cartas de Suelo de la Provincia de Buenos Aires, basados en cartografía publicada por el INTA.",
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

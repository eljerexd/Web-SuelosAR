import { defaultLocale, dictionaries } from "@/lib/i18n/dictionaries";
import type { ProvinceConfig } from "@/lib/provinces";
import { siteConfig } from "@/lib/site";

interface SoilMapJsonLdProps {
  province: ProvinceConfig;
  /** Same title passed to `createPageMetadata` for this page, kept in sync with `<title>`. */
  pageTitle: string;
  /** Same description passed to `createPageMetadata` for this page. */
  pageDescription: string;
}

/** Structured data always describes the default locale, matching how metadata is generated site-wide. */
export function SoilMapJsonLd({ province, pageTitle, pageDescription }: SoilMapJsonLdProps) {
  const organizationId = `${siteConfig.url}/#organization`;
  const pageUrl = `${siteConfig.url}${province.path}`;
  const faqItems = dictionaries[defaultLocale][province.dictionaryKey].faq.items;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `${pageTitle} | SuelosAR`,
        description: pageDescription,
        inLanguage: "es-AR",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${siteConfig.url}/#software-application` },
        publisher: { "@id": organizationId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: pageTitle, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
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

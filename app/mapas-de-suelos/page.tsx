import { SoilMapCatalog } from "@/components/catalog/soil-map-catalog";
import { createPageMetadata } from "@/lib/metadata";
import { defaultLocale, dictionaries } from "@/lib/i18n/dictionaries";

const catalogCopy = dictionaries[defaultLocale].catalog;

export const metadata = createPageMetadata(
  catalogCopy.metaTitle,
  catalogCopy.metaDescription,
  "/mapas-de-suelos",
);

export default function SoilMapsCatalogPage() {
  return <SoilMapCatalog />;
}

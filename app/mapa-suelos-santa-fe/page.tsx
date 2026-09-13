import { SoilMapJsonLd } from "@/components/seo/soil-map-json-ld";
import { SoilMapContent } from "@/components/soil-map/soil-map-content";
import { createPageMetadata } from "@/lib/metadata";
import { santaFeProvince } from "@/lib/provinces";

const title = "Mapa de Suelos de Santa Fe";
const description = "Consultá las 213 series de suelo de Santa Fe con SuelosAR: documento consolidado de 640 páginas del INTA EEA Rafaela, herramientas GIS y uso offline.";

export const metadata = createPageMetadata(title, description, santaFeProvince.path);

export default function MapaSuelosSantaFePage() {
  return (
    <>
      <SoilMapJsonLd province={santaFeProvince} pageTitle={title} pageDescription={description} />
      <SoilMapContent province={santaFeProvince} />
    </>
  );
}

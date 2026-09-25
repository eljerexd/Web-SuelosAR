import { SoilMapJsonLd } from "@/components/seo/soil-map-json-ld";
import { SoilMapContent } from "@/components/soil-map/soil-map-content";
import { createPageMetadata } from "@/lib/metadata";
import { buenosAiresProvince } from "@/lib/provinces";

const title = "Mapa de Suelos de Buenos Aires";
const description = "Mapa de suelos de la Provincia de Buenos Aires con SuelosAR. Cartografía, Cartas de Suelo y herramientas GIS basadas en fuentes del INTA, también offline.";
export const metadata = createPageMetadata(title, description, buenosAiresProvince.path);

export default function MapaSuelosBuenosAiresPage() {
  return (
    <>
      <SoilMapJsonLd province={buenosAiresProvince} pageTitle={title} pageDescription={description} />
      <SoilMapContent province={buenosAiresProvince} />
    </>
  );
}

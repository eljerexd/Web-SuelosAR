import { SoilMapJsonLd } from "@/components/seo/soil-map-json-ld";
import { SoilMapContent } from "@/components/soil-map/soil-map-content";
import { createPageMetadata } from "@/lib/metadata";
import { buenosAiresProvince } from "@/lib/provinces";

const title = "Mapa y Cartas de Suelo de Buenos Aires";
const description = "Mapa de suelos de Buenos Aires y 386 Cartas de Suelo en PDF, basados en cartografía oficial publicada por el INTA. Consultalos con SuelosAR, incluso sin conexión.";
export const metadata = createPageMetadata(title, description, buenosAiresProvince.path);

export default function MapaSuelosBuenosAiresPage() {
  return (
    <>
      <SoilMapJsonLd province={buenosAiresProvince} pageTitle={title} pageDescription={description} />
      <SoilMapContent province={buenosAiresProvince} />
    </>
  );
}

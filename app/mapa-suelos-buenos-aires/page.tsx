import { SoilMapJsonLd } from "@/components/seo/soil-map-json-ld";
import { SoilMapContent } from "@/components/soil-map/soil-map-content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Mapa de Suelos de Buenos Aires",
  "Consultá el mapa de suelos de la Provincia de Buenos Aires con SuelosAR. Cartografía de suelos, Cartas de Suelo y herramientas GIS basadas en fuentes del INTA, también offline.",
  "/mapa-suelos-buenos-aires",
);

export default function MapaSuelosBuenosAiresPage() {
  return (
    <>
      <SoilMapJsonLd />
      <SoilMapContent />
    </>
  );
}

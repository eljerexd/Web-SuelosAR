import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Fuentes de cartografía de suelos",
  "Consultá la procedencia, cobertura y criterios de verificación de las Cartas de Suelo de Buenos Aires utilizadas por SuelosAR.",
  "/data-sources",
);

export default function DataSourcesPage() {
  return <LegalPage pageKey="dataSources" />;
}

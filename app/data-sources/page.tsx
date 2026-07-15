import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Fuentes de datos",
  "Procedencia, titularidad, cobertura y criterios de verificación de la información cartográfica utilizada por SuelosAR.",
  "/data-sources",
);

export default function DataSourcesPage() {
  return <LegalPage pageKey="dataSources" />;
}

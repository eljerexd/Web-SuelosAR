import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Aviso legal",
  "Independencia institucional, alcance informativo y limitaciones aplicables al uso de SuelosAR.",
  "/disclaimer",
);

export default function DisclaimerPage() {
  return <LegalPage pageKey="disclaimer" />;
}

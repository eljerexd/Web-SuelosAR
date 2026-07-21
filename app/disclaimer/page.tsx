import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Aviso legal e independencia",
  "Conocé el alcance informativo de SuelosAR, su independencia del INTA y las limitaciones aplicables al uso de la cartografía de suelos.",
  "/disclaimer",
);

export default function DisclaimerPage() {
  return <LegalPage pageKey="disclaimer" />;
}

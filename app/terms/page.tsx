import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Términos de uso",
  "Condiciones aplicables al uso profesional, académico y educativo de SuelosAR.",
  "/terms",
);

export default function TermsPage() {
  return <LegalPage pageKey="terms" />;
}

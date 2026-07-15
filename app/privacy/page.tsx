import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Política de privacidad",
  "Cómo SuelosAR trata las preferencias, los permisos del dispositivo y la información necesaria para sus funciones.",
  "/privacy",
);

export default function PrivacyPage() {
  return <LegalPage pageKey="privacy" />;
}

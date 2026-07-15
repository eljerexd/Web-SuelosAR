import { FinalCta } from "@/components/cta/final-cta";
import { Faq } from "@/components/faq/faq";
import { Features } from "@/components/features/features";
import { ScreenshotGallery } from "@/components/gallery/screenshot-gallery";
import { Hero } from "@/components/home/hero";
import { AvailablePlatforms } from "@/components/platforms/available-platforms";
import { SoftwareApplicationJsonLd } from "@/components/seo/software-application-json-ld";

export default function Home() {
  return (
    <main id="contenido" tabIndex={-1} className="outline-none">
      <SoftwareApplicationJsonLd />
      <Hero />
      <Features />
      <AvailablePlatforms />
      <ScreenshotGallery />
      <Faq />
      <FinalCta />
    </main>
  );
}

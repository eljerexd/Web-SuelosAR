import { FinalCta } from "@/components/cta/final-cta";
import { Faq } from "@/components/faq/faq";
import { Features } from "@/components/features/features";
import { ScreenshotGallery } from "@/components/gallery/screenshot-gallery";
import { Hero } from "@/components/home/hero";
import { AvailablePlatforms } from "@/components/platforms/available-platforms";

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <Features />
      <AvailablePlatforms />
      <ScreenshotGallery />
      <Faq />
      <FinalCta />
    </main>
  );
}

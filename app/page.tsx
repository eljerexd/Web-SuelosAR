import type { Metadata } from "next";

import { FinalCta } from "@/components/cta/final-cta";
import { Faq } from "@/components/faq/faq";
import { Features } from "@/components/features/features";
import { ScreenshotGallery } from "@/components/gallery/screenshot-gallery";
import { Hero } from "@/components/home/hero";
import { AvailablePlatforms } from "@/components/platforms/available-platforms";
import { SoftwareApplicationJsonLd } from "@/components/seo/software-application-json-ld";
import { getLatestReleaseMetadata } from "@/lib/downloads";
import { indexableRobots } from "@/lib/metadata";

export const metadata: Metadata = {
  robots: indexableRobots,
};

function formatReleaseDate(publishedAt: string) {
  const parts = new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(new Date(publishedAt));
  const value = (type: Intl.DateTimeFormatPartTypes) => (
    parts.find((part) => part.type === type)?.value.replace(".", "") ?? ""
  );

  return `${value("day")} ${value("month")} ${value("year")}`;
}

export default async function Home() {
  const release = await getLatestReleaseMetadata();
  const releaseLabel = release
    ? `${release.version.startsWith("v") ? release.version : `v${release.version}`} · ${formatReleaseDate(release.publishedAt)}`
    : null;

  return (
    <main id="contenido" tabIndex={-1} className="outline-none">
      <SoftwareApplicationJsonLd />
      <Hero releaseLabel={releaseLabel} />
      <Features />
      <AvailablePlatforms />
      <ScreenshotGallery />
      <Faq />
      <FinalCta />
    </main>
  );
}

import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const indexableRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function createPageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    robots: indexableRobots,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_AR",
      alternateLocale: ["en_US"],
      url: path,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SuelosAR, cartografía digital de suelos" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/opengraph-image", alt: "SuelosAR, cartografía digital de suelos" }],
    },
  };
}

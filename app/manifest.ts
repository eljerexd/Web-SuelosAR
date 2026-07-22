import type { MetadataRoute } from "next";

import { dictionaries, defaultLocale } from "@/lib/i18n/dictionaries";
import brandIcon from "@/public/icons/icon-512.png";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "SuelosAR",
    short_name: "SuelosAR",
    description: dictionaries[defaultLocale].meta.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8faf5",
    theme_color: "#2f6842",
    lang: "es-AR",
    categories: ["education", "productivity", "utilities"],
    icons: [
      {
        src: brandIcon.src,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

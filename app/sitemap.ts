import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-18T00:00:00-03:00");
  const routes = ["", "/mapa-suelos-buenos-aires", "/privacy", "/terms", "/data-sources", "/disclaimer"];

  return routes.map((route, index) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: index <= 1 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : index === 1 ? 0.8 : 0.5,
  }));
}

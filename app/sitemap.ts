import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-18T00:00:00-03:00");
  const routes = ["", "/mapa-suelos-buenos-aires", "/mapa-suelos-santa-fe", "/privacy", "/terms", "/data-sources", "/disclaimer"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" || route.startsWith("/mapa-suelos") ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.startsWith("/mapa-suelos") ? 0.8 : 0.5,
  }));
}

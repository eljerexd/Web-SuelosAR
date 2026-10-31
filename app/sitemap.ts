import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Significant content/link changes verified in Git, not production deployment dates.
  // Keep dates explicit; omit lastModified for routes without a verified date.
  const lastModifiedByRoute: Partial<Record<string, string>> = {
    "": "2026-10-10", // 996a5ca: Google Play destination and offline APK CTA.
    "/mapa-suelos-buenos-aires": "2026-10-10", // 996a5ca: Android links now open Google Play.
    "/mapa-suelos-santa-fe": "2026-10-10", // Same shared provincial download links.
    "/mapas-de-suelos": "2026-10-30", // New catalog route and province discovery links.
    "/privacy": "2026-07-15", // 552ee17: current privacy content.
    "/terms": "2026-07-15", // 552ee17: current terms content.
    "/data-sources": "2026-09-13", // b83410f: Santa Fe provenance and coverage.
    "/disclaimer": "2026-07-15", // 552ee17: current disclaimer content.
  };
  const routes = ["", "/mapa-suelos-buenos-aires", "/mapa-suelos-santa-fe", "/mapas-de-suelos", "/privacy", "/terms", "/data-sources", "/disclaimer"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    ...(lastModifiedByRoute[route] ? { lastModified: lastModifiedByRoute[route] } : {}),
    changeFrequency: route === "" || route.startsWith("/mapa-suelos") || route === "/mapas-de-suelos" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.startsWith("/mapa-suelos") || route === "/mapas-de-suelos" ? 0.8 : 0.5,
  }));
}

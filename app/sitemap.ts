import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Significant content/link changes verified in Git, not production deployment dates.
  // Keep dates explicit; omit lastModified for routes without a verified date.
  const lastModifiedByRoute: Partial<Record<string, string>> = {
    "": "2026-11-05", // e9e1ff5: meaningful homepage copy and provincial discovery links.
    "/mapa-suelos-buenos-aires": "2026-11-05", // e9e1ff5: provincial title, description, and copy.
    "/mapa-suelos-santa-fe": "2026-11-05", // e9e1ff5: provincial coverage and document description.
    "/mapas-de-suelos": "2026-10-31", // c556fc5: catalog route created.
    "/privacy": "2026-11-05", // 27bdb02: substantial privacy policy rewrite.
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

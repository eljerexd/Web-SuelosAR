import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contains the required local Next.js structure and i18n foundation", async () => {
  const [packageJson, layout, page, themeProvider, dictionaries, i18nProvider] = await Promise.all([
    readFile(new URL("package.json", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("components/theme/theme-provider.tsx", root), "utf8"),
    readFile(new URL("lib/i18n/dictionaries.ts", root), "utf8"),
    readFile(new URL("components/i18n/i18n-provider.tsx", root), "utf8"),
  ]);

  const manifest = JSON.parse(packageJson);
  assert.equal(manifest.scripts.dev, "next dev");
  assert.equal(manifest.scripts.build, "next build");
  assert.match(layout, /lang=\{defaultLocale\}/);
  assert.match(layout, /<I18nProvider>/);
  assert.match(page, /<Hero \/>/);
  assert.match(page, /<AvailablePlatforms \/>/);
  assert.match(page, /<Features \/>/);
  assert.match(page, /<ScreenshotGallery \/>/);
  assert.doesNotMatch(page, /<WhySuelosAR \/>/);
  assert.match(page, /<Faq \/>/);
  assert.match(page, /<FinalCta \/>/);
  assert.match(themeProvider, /suelosar-theme/);
  assert.match(dictionaries, /defaultLocale: Locale = "es-AR"/);
  assert.match(dictionaries, /independent GIS application for Buenos Aires Province soil maps and soil surveys/);
  assert.match(dictionaries, /cartography published by INTA/);
  assert.match(dictionaries, /Android 10 or later and Windows 10\/11/);
  assert.match(i18nProvider, /useSyncExternalStore/);
});

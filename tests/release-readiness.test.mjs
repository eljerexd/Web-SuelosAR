import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("download links resolve the newest GitHub release assets without fixed filenames", async () => {
  const [downloads, route, button, hero, cta] = await Promise.all([
    readFile(new URL("lib/downloads.ts", root), "utf8"),
    readFile(new URL("app/download/[platform]/route.ts", root), "utf8"),
    readFile(new URL("components/downloads/release-download-link.tsx", root), "utf8"),
    readFile(new URL("components/home/hero.tsx", root), "utf8"),
    readFile(new URL("components/cta/final-cta.tsx", root), "utf8"),
  ]);

  assert.match(downloads, /route: "\/download\/android"/);
  assert.match(downloads, /route: "\/download\/windows"/);
  assert.match(downloads, /api\.github\.com\/repos\/eljerexd\/suelosar\/releases\/latest/);
  assert.match(downloads, /browser_download_url/);
  assert.match(downloads, /extension: "\.apk"/);
  assert.match(downloads, /extension: "\.exe"/);
  assert.match(downloads, /preferredName: "android"/);
  assert.match(downloads, /preferredName: "setup"/);
  assert.match(downloads, /cachedRelease/);
  assert.doesNotMatch(downloads, /releases\/latest\/download/);
  assert.match(route, /getLatestReleaseAssets/);
  assert.match(route, /download-unavailable/);
  assert.match(button, /data-release-status/);
  assert.match(button, /downloads\[platform\]\.route/);
  assert.match(hero, /ReleaseDownloadLink/);
  assert.match(cta, /ReleaseDownloadLink/);
});

test("legal, discovery, and social metadata routes exist", async () => {
  const requiredFiles = [
    "app/privacy/page.tsx",
    "app/terms/page.tsx",
    "app/data-sources/page.tsx",
    "app/disclaimer/page.tsx",
    "app/robots.ts",
    "app/sitemap.ts",
    "app/manifest.ts",
    "app/opengraph-image.tsx",
    "components/seo/software-application-json-ld.tsx",
  ];

  await Promise.all(requiredFiles.map((path) => access(new URL(path, root))));

  const openGraphImage = await readFile(new URL("app/opengraph-image.tsx", root), "utf8");
  assert.match(openGraphImage, /width: 1200, height: 630/);
});

test("SEO discovery routes share the production origin without blocking noindex pages", async () => {
  const [site, layout, sitemap, robots, structuredData] = await Promise.all([
    readFile(new URL("lib/site.ts", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/sitemap.ts", root), "utf8"),
    readFile(new URL("app/robots.ts", root), "utf8"),
    readFile(new URL("components/seo/software-application-json-ld.tsx", root), "utf8"),
  ]);

  assert.match(site, /url: "https:\/\/web-suelos-ar\.vercel\.app"/);
  assert.doesNotMatch(site, /suelosar\.app/);
  assert.match(layout, /metadataBase: new URL\(siteConfig\.url\)/);
  assert.match(sitemap, /siteConfig\.url/);
  assert.match(robots, /siteConfig\.url/);
  assert.doesNotMatch(robots, /download-unavailable/);
  assert.match(structuredData, /siteConfig\.url/);
});

test("footer contains real legal and contact destinations", async () => {
  const [dictionary, footer, site] = await Promise.all([
    readFile(new URL("lib/i18n/dictionaries.ts", root), "utf8"),
    readFile(new URL("components/layout/footer.tsx", root), "utf8"),
    readFile(new URL("lib/site.ts", root), "utf8"),
  ]);

  assert.doesNotMatch(dictionary, /coming soon|próximamente/i);
  assert.match(dictionary, /href: "\/privacy"/);
  assert.match(dictionary, /href: "\/terms"/);
  assert.match(dictionary, /href: "\/data-sources"/);
  assert.match(dictionary, /href: "\/disclaimer"/);
  assert.match(footer, /siteConfig\.githubUrl/);
  assert.match(footer, /mailto:/);
  assert.match(site, /github\.com\/eljerexd\/Web-SuelosAR/);
});

test("critical marketing content is visible in server-rendered motion states", async () => {
  const files = [
    "components/home/hero.tsx",
    "components/platforms/available-platforms.tsx",
    "components/platforms/platform-card.tsx",
    "components/gallery/screenshot-gallery.tsx",
    "components/faq/faq.tsx",
    "components/cta/final-cta.tsx",
  ];
  const contents = await Promise.all(files.map((path) => readFile(new URL(path, root), "utf8")));

  for (const content of contents) {
    assert.doesNotMatch(content, /initial=\{[^\n]*opacity:\s*0/);
  }
});

test("every referenced product screenshot exists", async () => {
  const sourceFiles = [
    "components/home/hero-device-showcase.tsx",
    "components/features/features.tsx",
    "lib/i18n/dictionaries.ts",
  ];
  const contents = await Promise.all(sourceFiles.map((path) => readFile(new URL(path, root), "utf8")));
  const screenshots = new Set(
    contents.flatMap((content) => [...content.matchAll(/"(\/images\/screenshots\/[^"]+)"/g)].map((match) => match[1])),
  );

  assert.ok(screenshots.size > 0);
  await Promise.all([...screenshots].map((path) => access(new URL(`public${path}`, root))));
});

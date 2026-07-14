import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contains the required local Next.js structure", async () => {
  const [packageJson, layout, page, themeProvider] = await Promise.all([
    readFile(new URL("package.json", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("components/theme/theme-provider.tsx", root), "utf8"),
  ]);

  const manifest = JSON.parse(packageJson);
  assert.equal(manifest.scripts.dev, "next dev");
  assert.equal(manifest.scripts.build, "next build");
  assert.match(layout, /lang="es-AR"/);
  assert.match(page, /<Hero \/>/);
  assert.match(themeProvider, /suelosar-theme/);
});

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("GA4 and existing measurement providers require consent and production host", async () => {
  const [analytics, suite, consentUi, dictionaries] = await Promise.all([
    readFile(new URL("lib/analytics.ts", root), "utf8"),
    readFile(new URL("components/analytics/analytics-suite.tsx", root), "utf8"),
    readFile(new URL("components/analytics/google-analytics.tsx", root), "utf8"),
    readFile(new URL("lib/i18n/dictionaries.ts", root), "utf8"),
  ]);

  assert.match(analytics, /NEXT_PUBLIC_GA_MEASUREMENT_ID/);
  assert.match(analytics, /hostname === productionHostname/);
  assert.match(analytics, /web-suelos-ar\.vercel\.app/);
  assert.match(analytics, /navigator\.webdriver/);
  assert.match(analytics, /getAnalyticsConsent\(\) === "accepted"/);
  assert.match(suite, /consent !== "accepted" \|\| !hostnameAllowed/);
  assert.match(consentUi, /consent === "accepted"/);
  assert.match(consentUi, /strategy="afterInteractive"/);
  assert.match(analytics, /send_page_view: false/);
  assert.match(analytics, /ga-disable-\$\{measurementId\}/);
  assert.doesNotMatch(analytics, /gtag\("consent"/);
  assert.match(dictionaries, /Accept analytics/);
  assert.match(dictionaries, /Reject analytics/);
});

test("analytics events avoid arbitrary query parameters and model downloads as clicks only", async () => {
  const [analytics, docs] = await Promise.all([
    readFile(new URL("lib/analytics.ts", root), "utf8"),
    readFile(new URL("docs/analytics-setup.md", root), "utf8"),
  ]);

  assert.match(analytics, /utm_source.*utm_medium.*utm_campaign/);
  assert.doesNotMatch(analytics, /searchParams\.forEach/);
  assert.match(analytics, /"download_click"/);
  assert.doesNotMatch(analytics, /"download_complete"|"download_request"/);
  assert.match(docs, /does not emit `download_request` or `download_complete`/);
});

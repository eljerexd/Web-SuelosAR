import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  adminGitHubAccountId,
  isAuthorizedAdminSession,
  isAuthorizedGitHubAccountId,
} from "../lib/admin-authorization.mjs";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("admin authorization uses only the verified immutable GitHub account ID", () => {
  assert.equal(adminGitHubAccountId, "223554037");
  assert.equal(isAuthorizedGitHubAccountId(223554037), true);
  assert.equal(isAuthorizedGitHubAccountId("223554037"), true);
  assert.equal(isAuthorizedGitHubAccountId("eljerexd"), false);
  assert.equal(isAuthorizedGitHubAccountId("other-account"), false);
  assert.equal(isAuthorizedGitHubAccountId("123456"), false);
  assert.equal(isAuthorizedGitHubAccountId(null), false);
});

test("dashboard authorization requires the server-derived administrator session claim", () => {
  assert.equal(isAuthorizedAdminSession({ user: { isAdmin: true } }), true);
  assert.equal(isAuthorizedAdminSession({ user: { isAdmin: false } }), false);
  assert.equal(isAuthorizedAdminSession({ user: {} }), false);
  assert.equal(isAuthorizedAdminSession(null), false);
});

test("dashboard page and metrics API authorize before reading or returning metrics", async () => {
  const page = await read("../app/admin/metricas/page.tsx");
  const api = await read("../app/api/admin/metrics/route.ts");
  assert.ok(page.indexOf("if (!await hasAdminSession()) notFound()") < page.indexOf("getAndroidPlayClickCount()"));
  assert.ok(api.indexOf("if (!await hasAdminSession())") < api.indexOf("getAndroidPlayClickCount()"));
  assert.match(page, /index: false, follow: false/);
  assert.doesNotMatch(await read("../app/sitemap.ts"), /admin\/metricas/);
});

test("public click counting is anonymous, same-origin, credential-free, and globally rate limited", async () => {
  const client = await read("../lib/android-play-click.ts");
  const route = await read("../app/api/metrics/android-play-click/route.ts");
  const metrics = await read("../lib/metrics.ts");
  assert.match(client, /credentials: "omit"/);
  assert.match(client, /keepalive: true/);
  assert.match(client, /isTrustedClick/);
  assert.match(route, /origin === expectedOrigin/);
  assert.match(route, /fetchSite === "same-origin"/);
  assert.match(metrics, /maxClicksPerWindow = 120/);
  assert.match(metrics, /EXPIRE/);
  assert.match(metrics, /enableTelemetry: false/);
  assert.match(metrics, /process\.env\.KV_REST_API_URL/);
  assert.match(metrics, /process\.env\.KV_REST_API_TOKEN/);
  assert.doesNotMatch(metrics, /UPSTASH_REDIS_REST_(?:URL|TOKEN)|KV_REST_API_READ_ONLY_TOKEN|Redis\.fromEnv/);
  assert.doesNotMatch(metrics, /user.?agent|ip.?address|fingerprint/i);
});

test("Redis setup documents only the Vercel KV write credentials", async () => {
  const example = await read("../.env.example");
  const docs = await read("../docs/metrics-setup.md");
  assert.match(example, /^KV_REST_API_URL=$/m);
  assert.match(example, /^KV_REST_API_TOKEN=$/m);
  assert.doesNotMatch(example, /UPSTASH_REDIS_REST_|KV_REST_API_READ_ONLY_TOKEN/);
  assert.match(docs, /KV_REST_API_URL/);
  assert.match(docs, /KV_REST_API_TOKEN/);
  assert.match(docs, /does not use `KV_REST_API_READ_ONLY_TOKEN`/);
  assert.doesNotMatch(docs, /`UPSTASH_REDIS_REST_(?:URL|TOKEN)`/);
});

test("Auth.js blocks all non-admin GitHub accounts and uses JWT sessions", async () => {
  const auth = await read("../auth.ts");
  assert.match(auth, /session: \{ strategy: "jwt"/);
  assert.match(auth, /account\?\.provider === "github" && isAuthorizedGitHubAccountId\(profile\?\.id\)/);
  assert.match(auth, /githubAccountId/);
  assert.match(auth, /target\.origin !== base\.origin/);
  assert.match(auth, /target\.protocol !== "https:"/);
  assert.match(auth, /scope: "read:user"/);
  assert.doesNotMatch(auth, /user:email|\/user\/emails/);
});

test("public layout has no analytics consent UI or general analytics providers", async () => {
  const layout = await read("../app/layout.tsx");
  const packageJson = await read("../package.json");
  assert.doesNotMatch(layout, /AnalyticsConsentBanner|AnalyticsSuite|GoogleAnalytics|SpeedInsights/);
  assert.doesNotMatch(packageJson, /@vercel\/analytics|@vercel\/speed-insights/);
});

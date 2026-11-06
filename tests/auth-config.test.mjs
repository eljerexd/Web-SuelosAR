import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { Auth, skipCSRFCheck } from "@auth/core";
import GitHub from "@auth/core/providers/github";

const authSource = await readFile(new URL("../auth.ts", import.meta.url), "utf8");

test("runtime Auth.js config explicitly requires the GitHub OAuth credentials", () => {
  assert.match(authSource, /function createAuthConfig\(\)/);
  assert.match(authSource, /const clientId = process\.env\.AUTH_GITHUB_ID/);
  assert.match(authSource, /const clientSecret = process\.env\.AUTH_GITHUB_SECRET/);
  assert.match(authSource, /if \(!clientId \|\| !clientSecret\)[\s\S]*?throw new Error/);
  assert.match(authSource, /GitHub\(\{\s*clientId,\s*clientSecret,/);
  assert.match(authSource, /NextAuth\(\(\) => createAuthConfig\(\)\)/);
  assert.match(authSource, /hasAuthGithubId: Boolean\(clientId\)/);
  assert.match(authSource, /hasAuthGithubSecret: Boolean\(clientSecret\)/);
  assert.doesNotMatch(authSource, /console\.(?:info|log|warn)\([^\n]*(?:clientId|clientSecret)/);
});

test("configured GitHub provider emits an authorization URL with its client ID", async () => {
  const response = await Auth(
    new Request("https://example.test/api/auth/signin/github", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "",
    }),
    {
      secret: "test-only-secret-not-used-outside-this-test",
      trustHost: true,
      basePath: "/api/auth",
      skipCSRFCheck,
      providers: [GitHub({
        clientId: "test-github-client-id",
        clientSecret: "test-github-client-secret",
        authorization: { params: { scope: "read:user" } },
      })],
    },
  );

  assert.equal(response.status, 302);
  const authorizationUrl = new URL(response.headers.get("location"));
  assert.equal(authorizationUrl.origin, "https://github.com");
  assert.equal(authorizationUrl.searchParams.get("client_id"), "test-github-client-id");
  assert.notEqual(authorizationUrl.searchParams.get("client_id"), "undefined");
});

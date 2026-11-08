# SuelosAR aggregate metrics

The website stores two anonymous aggregate metrics: Google Play button clicks grouped by Buenos Aires calendar day, and daily snapshots of GitHub's cumulative `.exe` asset download totals for published application releases. The GitHub value is not a completed-transfer, installation, or website-attribution count. Time-series collection starts when this version is deployed; older daily history cannot be reconstructed from the existing totals.

## Upstash Redis (Vercel Marketplace)

1. From the Vercel project, open **Integrations / Marketplace**, add the Upstash Redis integration, and create or connect a Redis database.
2. Connect the database to this Vercel project. The Vercel integration provides the server-only `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables. This application reads those variables directly; do not create duplicate `UPSTASH_REDIS_REST_*` variables. The application needs the write-capable token to atomically increment the counter. It does not use `KV_REST_API_READ_ONLY_TOKEN`.
3. Redeploy after the variables are available. Do not prefix credentials with `NEXT_PUBLIC_` and do not commit them.

Redis persists the single metric total `suelosar:aggregate:android-google-play-clicks:v1`. A short-lived, global minute-window integer counter enforces a cap of 120 accepted clicks per minute. It expires automatically and has no visitor-specific key, IP address, or identifier.

The chart additionally stores one aggregate hash field per Buenos Aires date at `suelosar:aggregate:android-google-play-clicks:daily:v1`. These are counts only, with no user or request identifiers. The original lifetime total remains available.

## Windows download history (Vercel Cron)

Add a server-only `CRON_SECRET` variable in Vercel Production. Generate a long random secret and keep it encrypted; never prefix it with `NEXT_PUBLIC_`. `vercel.json` schedules `/api/cron/snapshot-installer-downloads` daily at 03:00 UTC (midnight in Buenos Aires). Vercel supplies the bearer authorization using `CRON_SECRET`; the route checks it before reading GitHub or writing Redis. Each successful run stores only the current aggregate GitHub-reported `.exe` download total keyed by date. The dashboard derives daily changes from adjacent snapshots. The first snapshot is only a baseline, missed runs can combine changes into a later day, and GitHub does not provide historical daily counts. This is not a completed-download metric.

## GitHub OAuth / Auth.js

1. In GitHub **Settings → Developer settings → OAuth Apps**, create an OAuth App for SuelosAR administration.
2. Set the production homepage URL to `https://web-suelos-ar.vercel.app` and the authorization callback URL to `https://web-suelos-ar.vercel.app/api/auth/callback/github`. Auth requests only the GitHub `read:user` scope and sanitizes the profile down to its numeric ID; it does not request or store an email address.
3. In Vercel Production environment variables, add `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_SECRET`, and `AUTH_URL=https://web-suelos-ar.vercel.app`. Generate `AUTH_SECRET` with `npx auth secret`. Keep `AUTH_GITHUB_SECRET`, `AUTH_SECRET`, and `KV_REST_API_TOKEN` marked sensitive/encrypted and server-only. Never use a `NEXT_PUBLIC_` prefix. The Redis URL is server-only as well.
4. The only administrator is checked by immutable GitHub account ID `223554037` (verified for `eljerexd` through GitHub's public user API). The ID is not an authentication credential. Auth.js uses encrypted JWT sessions and no user database. OAuth state validation remains enabled; production redirect callbacks are restricted to the canonical HTTPS origin.
5. Use a separate GitHub OAuth App for local development, with callback `http://localhost:3000/api/auth/callback/github` and `AUTH_URL=http://localhost:3000`; never reuse or expose the production client secret.
6. Sign in at `/api/auth/signin?callbackUrl=%2Fadmin%2Fmetricas`. Direct dashboard access and the metrics read API return 404 unless the server-validated JWT belongs to the configured numeric administrator ID.

Auth.js session cookies are used only for administrator authentication. They do not identify website visitors or participate in click counting. The click request omits credentials, accepts only same-origin requests, filters untrusted synthetic clicks in the browser, and uses the global Redis rate cap as non-invasive abuse protection. No IP-based rate limits or per-visitor records are used.

## Remove the old GA4 setting

After deploying and verifying this replacement, manually remove `NEXT_PUBLIC_GA_MEASUREMENT_ID` from the Vercel project's Environment Variables, then redeploy. The application no longer reads that variable. Remove the same variable from any local `.env` file.

## Operational notes

- Public pages, navigation, and downloads do not depend on Redis or Auth.js configuration. If Redis is unavailable, a click still navigates to Google Play; the anonymous increment may be lost. The admin dashboard fails closed when auth is not configured and shows unavailable counts if a provider cannot be reached.
- GitHub's release-asset `download_count` is cached for 15 minutes and summed for `.exe` assets on published application releases. It can include requests from any source and cannot verify completed transfers or installations.
- Vercel, Upstash, and GitHub may process or retain technical request metadata under their own operational policies and settings. This project does not copy that metadata into the metrics store.
- The dashboard is not considered production-ready/private until the external OAuth and Redis setup is complete and the administrator, unauthorized-account, direct-API, and secret-exposure checks pass on the deployed HTTPS site.

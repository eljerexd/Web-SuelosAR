# SuelosAR website analytics

## Production configuration

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-E1VNRFR2LG` in the Vercel **Production** environment, then redeploy. The value is a public GA4 measurement ID, not a Measurement Protocol secret. `.env.example` documents the same variable for local setup, but local and preview traffic is intentionally not sent. Tracking also stays disabled when the browser reports WebDriver automation. GA4 uses basic consent blocking: its script is not loaded and no consent-mode pings are sent before acceptance. It loads only on `web-suelos-ar.vercel.app` after a visitor accepts analytics. The consent choice is stored in `localStorage` under `suelosar-analytics-consent-v1`; visitors can change it on `/privacy`.

The privacy choice gates GA4, Vercel Analytics, and Speed Insights. Rejecting or withdrawing consent prevents further events and attempts to remove this site's `_ga` cookies. Vercel documents Web Analytics as cookie-free and based on an expiring request-derived hash; Speed Insights reports Web Vitals. If storage is blocked, consent is treated as undecided and analytics remain disabled.

## GA4 property privacy settings

These settings belong to the GA4 property and cannot be changed by this source repository. Before relying on production reports:

1. In **Admin → Data collection and modification → Data collection**, keep Google Signals disabled. Google's configuration also sets `allow_google_signals: false` and `allow_ad_personalization_signals: false` on the web tag.
2. In the web data stream's **Google tag settings**, retain the disabled ad-signal flags configured by the site (`allow_google_signals: false` and `allow_ad_personalization_signals: false`). Do not enable advertising personalization for this stream.
3. In **Admin → Data streams → Web → Enhanced measurement**, turn off enhanced measurements not needed. The site sends its own App Router page views, so disable enhanced-measurement page views based on browser history to avoid duplicates. Scrolls, outbound clicks, downloads, site search and video events are not needed for this implementation.
4. Do not enable Google Ads linking, remarketing, or other advertising features unless the privacy notice and consent design are reviewed first.
5. If the owner has a stable office IP, configure an internal traffic rule under **Admin → Data streams → Web → Configure tag settings → Define internal traffic**, then create/test an internal-traffic data filter. Do not guess an IP or activate a filter before testing it.

The app only carries `utm_source`, `utm_medium`, and `utm_campaign` into the first page view, and only when each value is a short, safe token. Other query-string keys are omitted. The initial external referrer is reduced to its origin; internal referrers retain only a public pathname. This preserves organic/direct/referral and ordinary campaign attribution without collecting arbitrary query strings.

## Events and reporting

| Event | Parameters | Meaning |
| --- | --- | --- |
| `page_view` | `page_path`, `page_location`, `page_title`, `page_referrer` | One manual event per App Router pathname, without arbitrary query data. |
| `catalog_navigation_click` | `link_location`, `page_path` | A click to the provincial catalog from the navbar, footer, or closing CTA. |
| `catalog_view` | `page_path` | A consented visit to `/mapas-de-suelos`. |
| `province_link_click` | `province`, `link_location`, `page_path` | A click to Buenos Aires or Santa Fe from the catalog card, homepage text, FAQ, or cross-province link. |
| `province_page_view` | `province`, `page_path` | A consented visit to a published provincial page. |
| `feature_step_view` | `feature_id`, `page_path` | A feature step with at least 35% of its element visible; each stable feature ID is sent once per page mount, even if the user scrolls back. |
| `download_click` | `platform`, `download_format`, `button_location`, `page_path`, optional `app_version` | A click only. It is not a successful download or installation. |

In GA4, add custom dimensions for `platform`, `download_format`, `button_location`, `province`, `link_location`, and `feature_id` if they are needed in standard reports. Mark `download_click` as a key event if that click is the chosen website conversion; do not label it an install. To build a funnel, use Explore → Funnel exploration with `page_view` → `feature_step_view` (optional) → `catalog_view` or `province_page_view` → `download_click`. Use Traffic acquisition reports for session source/medium and campaign attribution.

## Download and installation measurement limits

The website's `/download/android` and `/download/windows` routes resolve a release asset and return a `307` redirect. A click or redirect cannot confirm that the destination accepted the request or that the full file arrived. Therefore this implementation deliberately does not emit `download_request` or `download_complete`. Use Google Play Console for Play listing acquisition/install metrics and GitHub release asset counts or hosting transfer logs for APK/EXE delivery where available. Do not proxy the large installers through Vercel functions.

### Future application telemetry specification (not implemented here)

The Flutter/Windows application repositories are outside this task. A future telemetry design should send events through an authenticated, rate-limited backend rather than expose a GA4 Measurement Protocol API secret in the app. Suggested event names are `app_first_launch` and, if Windows installer instrumentation can verify it, `app_install_success`. Send only `platform`, app version, event timestamp, and a random per-install identifier; do not send account, location, device serial, or user contact data. Generate the identifier randomly on first launch, store it locally, and make the backend idempotent on `(installation_id, event_name)` to prevent duplicate first-launch events. Document retention and deletion before enabling this pipeline. No backend or app telemetry was created by this website change.

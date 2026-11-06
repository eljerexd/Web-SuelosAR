/**
 * The `eljerexd/Web-SuelosAR` repository publishes releases for two different things: this
 * website ("SuelosAR Web vX.X.X") and the SuelosAR application ("SuelosAR vX.X.X"). GitHub's
 * `releases/latest` endpoint only tracks the single most recently published release regardless
 * of which one it is, so it cannot be trusted here — the download buttons must instead list every
 * release and pick the newest one that is NOT a web release.
 */
export const GITHUB_RELEASES_API_URL = "https://api.github.com/repos/eljerexd/Web-SuelosAR/releases?per_page=100";
export const GOOGLE_PLAY_ANDROID_URL = "https://play.google.com/store/apps/details?id=ar.com.suelosar";

const GOOGLE_PLAY_LISTING_URL = `${GOOGLE_PLAY_ANDROID_URL}&hl=es_AR&gl=AR`;

/** Last known-good application release, used only when the GitHub API is unreachable. */
const ANDROID_FALLBACK_DOWNLOAD_URL = "https://github.com/eljerexd/Web-SuelosAR/releases/download/1.5.1/SuelosAR-Android-v1.5.12.apk";
const WINDOWS_FALLBACK_DOWNLOAD_URL = "https://github.com/eljerexd/Web-SuelosAR/releases/download/1.5.1/SuelosAR-Setup.exe";

export const downloads = {
  android: {
    route: "/download/android",
    filename: "SuelosAR-Android.apk",
    contentType: "application/vnd.android.package-archive",
    extension: ".apk",
    fallbackUrl: ANDROID_FALLBACK_DOWNLOAD_URL,
  },
  windows: {
    route: "/download/windows",
    filename: "SuelosAR-Windows.exe",
    contentType: "application/vnd.microsoft.portable-executable",
    extension: ".exe",
    fallbackUrl: WINDOWS_FALLBACK_DOWNLOAD_URL,
  },
} as const;

export type DownloadPlatform = keyof typeof downloads;

/** Standard Android destination used by all regular website download buttons. */
export const ANDROID_DOWNLOAD_URL = GOOGLE_PLAY_ANDROID_URL;
/** Intentional exception: the homepage closing CTA offers the directly downloadable APK. */
export const ANDROID_APK_DOWNLOAD_URL = downloads.android.route;
export const WINDOWS_DOWNLOAD_URL = downloads.windows.route;

export function isDownloadPlatform(value: string): value is DownloadPlatform {
  return value in downloads;
}

interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
  download_count?: number;
}

interface GitHubRelease {
  tag_name?: string;
  name?: string | null;
  published_at?: string;
  draft?: boolean;
  prerelease?: boolean;
  assets?: GitHubReleaseAsset[];
}

export interface LatestReleaseMetadata {
  version: string;
  publishedAt: string;
}

export interface GooglePlayReleaseMetadata {
  version: string;
  publishedAt: string;
}

/** Matches release names/tags used for website releases, e.g. "SuelosAR Web v1.2.0" or "Web_v1.2.0". */
const WEB_RELEASE_PATTERN = /\bweb\b/i;

function isAppRelease(release: GitHubRelease) {
  if (release.draft || release.prerelease) return false;
  const label = release.name || release.tag_name || "";
  return label.length > 0 && !WEB_RELEASE_PATTERN.test(label);
}

/** Fetches all published application releases (never website releases), with each page cached by Next.js. */
async function fetchPublishedAppReleases() {
  try {
    const releases: GitHubRelease[] = [];
    for (let page = 1; page <= 100; page += 1) {
      const separator = GITHUB_RELEASES_API_URL.includes("?") ? "&" : "?";
      const response = await fetch(`${GITHUB_RELEASES_API_URL}${separator}page=${page}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 900 },
      });

      if (!response.ok) return null;
      const batch = await response.json() as GitHubRelease[];
      if (!Array.isArray(batch)) return null;
      releases.push(...batch);
      if (batch.length < 100) break;
    }

    return releases
      .filter(isAppRelease)
      .filter((release): release is GitHubRelease & { published_at: string } => (
        Boolean(release.published_at) && !Number.isNaN(Date.parse(release.published_at!))
      ))
      .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
  } catch {
    return null;
  }
}

/** Fetches every published SuelosAR app release and returns the newest first. */
async function fetchLatestAppRelease() {
  const releases = await fetchPublishedAppReleases();
  return releases?.[0] ?? null;
}

/** GitHub's aggregate .exe asset count; it does not confirm completion or website attribution. */
export async function getGitHubReportedWindowsInstallerDownloads(): Promise<number | null> {
  const releases = await fetchPublishedAppReleases();
  if (!releases) return null;

  return releases.reduce((total, release) => total + (release.assets ?? [])
    .filter((asset) => asset.name.toLowerCase().endsWith(".exe"))
    .reduce((assetTotal, asset) => assetTotal + (Number.isSafeInteger(asset.download_count) && asset.download_count! >= 0 ? asset.download_count! : 0), 0), 0);
}

export async function getLatestReleaseMetadata(): Promise<LatestReleaseMetadata | null> {
  const release = await fetchLatestAppRelease();

  if (!release?.tag_name || !release.published_at) return null;

  return {
    version: release.tag_name,
    publishedAt: release.published_at,
  };
}

/**
 * Extracts the public version and update timestamp exposed by Google Play's listing payload.
 * These fields are not a documented Google Play API, so invalid or changed markup deliberately
 * results in no metadata instead of falling back to a potentially different GitHub release.
 */
function parseGooglePlayReleaseMetadata(listingHtml: string): GooglePlayReleaseMetadata | null {
  const version = listingHtml.match(/"141":\[\[\["([^"\\]+)"\]\]/)?.[1];
  const publishedTimestamp = listingHtml.match(/"146":\[\["[^"\\]+",\[(\d{10,13})/)?.[1];

  if (!version || !publishedTimestamp) return null;

  const numericTimestamp = Number(publishedTimestamp);
  const publishedAt = new Date(publishedTimestamp.length === 10 ? numericTimestamp * 1000 : numericTimestamp);

  if (Number.isNaN(publishedAt.getTime())) return null;

  return { version, publishedAt: publishedAt.toISOString() };
}

/**
 * Google Play is the authoritative Android metadata source. The request stays server-side and
 * is revalidated hourly; failures intentionally render no Android version/date label.
 */
export async function getGooglePlayReleaseMetadata(): Promise<GooglePlayReleaseMetadata | null> {
  try {
    const response = await fetch(GOOGLE_PLAY_LISTING_URL, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "Mozilla/5.0 (compatible; SuelosARWeb/1.0)",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    return parseGooglePlayReleaseMetadata(await response.text());
  } catch {
    return null;
  }
}

/** Resolves the newest application release asset and preserves the existing URL as fallback. */
export async function resolveLatestDownloadUrl(platform: DownloadPlatform) {
  const download = downloads[platform];
  const release = await fetchLatestAppRelease();
  const asset = release?.assets?.find(({ name, browser_download_url: url }) => (
    name.toLowerCase().endsWith(download.extension)
    && url.startsWith("https://")
  ));

  return asset?.browser_download_url ?? download.fallbackUrl;
}

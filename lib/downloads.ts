/**
 * The `eljerexd/Web-SuelosAR` repository publishes releases for two different things: this
 * website ("SuelosAR Web vX.X.X") and the SuelosAR application ("SuelosAR vX.X.X"). GitHub's
 * `releases/latest` endpoint only tracks the single most recently published release regardless
 * of which one it is, so it cannot be trusted here — the download buttons must instead list every
 * release and pick the newest one that is NOT a web release.
 */
export const GITHUB_RELEASES_API_URL = "https://api.github.com/repos/eljerexd/Web-SuelosAR/releases?per_page=100";

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

/** Stable routes used by every existing download button. */
export const ANDROID_DOWNLOAD_URL = downloads.android.route;
export const WINDOWS_DOWNLOAD_URL = downloads.windows.route;

export function isDownloadPlatform(value: string): value is DownloadPlatform {
  return value in downloads;
}

interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
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

/** Matches release names/tags used for website releases, e.g. "SuelosAR Web v1.2.0" or "Web_v1.2.0". */
const WEB_RELEASE_PATTERN = /\bweb\b/i;

function isAppRelease(release: GitHubRelease) {
  if (release.draft || release.prerelease) return false;
  const label = release.name || release.tag_name || "";
  return label.length > 0 && !WEB_RELEASE_PATTERN.test(label);
}

/** Fetches every release and returns the newest one that belongs to the application, never the website. */
async function fetchLatestAppRelease() {
  try {
    const response = await fetch(GITHUB_RELEASES_API_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    const releases = await response.json() as GitHubRelease[];
    const appReleases = releases
      .filter(isAppRelease)
      .filter((release): release is GitHubRelease & { published_at: string } => (
        Boolean(release.published_at) && !Number.isNaN(Date.parse(release.published_at!))
      ))
      .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));

    return appReleases[0] ?? null;
  } catch {
    return null;
  }
}

export async function getLatestReleaseMetadata(): Promise<LatestReleaseMetadata | null> {
  const release = await fetchLatestAppRelease();

  if (!release?.tag_name || !release.published_at) return null;

  return {
    version: release.tag_name,
    publishedAt: release.published_at,
  };
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

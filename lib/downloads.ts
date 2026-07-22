export const GITHUB_RELEASES_API_URL = "https://api.github.com/repos/eljerexd/Web-SuelosAR/releases/latest";

const ANDROID_FALLBACK_DOWNLOAD_URL = "https://github.com/eljerexd/Web-SuelosAR/releases/latest/download/SuelosAR-Android.apk";
const WINDOWS_FALLBACK_DOWNLOAD_URL = "https://github.com/eljerexd/Web-SuelosAR/releases/latest/download/SuelosAR-Setup.exe";

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
  assets?: GitHubReleaseAsset[];
}

/** Resolves the newest matching release asset and preserves the existing URL as fallback. */
export async function resolveLatestDownloadUrl(platform: DownloadPlatform) {
  const download = downloads[platform];

  try {
    const response = await fetch(GITHUB_RELEASES_API_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 300 },
    });

    if (!response.ok) return download.fallbackUrl;

    const release = await response.json() as GitHubRelease;
    const asset = release.assets?.find(({ name, browser_download_url: url }) => (
      name.toLowerCase().endsWith(download.extension)
      && url.startsWith("https://")
    ));

    return asset?.browser_download_url ?? download.fallbackUrl;
  } catch {
    return download.fallbackUrl;
  }
}

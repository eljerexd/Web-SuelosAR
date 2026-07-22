export const GITHUB_RELEASES_API_URL = "https://api.github.com/repos/eljerexd/suelosar/releases/latest";

export const downloads = {
  android: {
    route: "/download/android",
    extension: ".apk",
    preferredName: "android",
  },
  windows: {
    route: "/download/windows",
    extension: ".exe",
    preferredName: "setup",
  },
} as const;

export type DownloadPlatform = keyof typeof downloads;
export type ReleaseAssetUrls = Record<DownloadPlatform, string | null>;

interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
  state?: string;
}

interface GitHubRelease {
  assets: GitHubReleaseAsset[];
}

let cachedRelease: GitHubRelease | null = null;
let pendingReleaseRequest: Promise<GitHubRelease> | null = null;

export function isDownloadPlatform(value: string): value is DownloadPlatform {
  return value in downloads;
}

function isSecureDownloadUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isReleaseAsset(value: unknown): value is GitHubReleaseAsset {
  if (!value || typeof value !== "object") return false;

  const asset = value as Partial<GitHubReleaseAsset>;
  return typeof asset.name === "string"
    && typeof asset.browser_download_url === "string"
    && isSecureDownloadUrl(asset.browser_download_url)
    && (asset.state === undefined || asset.state === "uploaded");
}

/** Selects by extension first, then applies the preferred platform name when available. */
export function selectReleaseAsset(assets: readonly GitHubReleaseAsset[], platform: DownloadPlatform) {
  const { extension, preferredName } = downloads[platform];
  const matchingAssets = assets.filter((asset) => asset.name.toLowerCase().endsWith(extension));

  return matchingAssets.find((asset) => asset.name.toLowerCase().includes(preferredName))
    ?? matchingAssets[0]
    ?? null;
}

/**
 * Shares one GitHub request between every download button in the current runtime.
 * Successful responses remain in memory; a failed request is cleared so a later mount can retry.
 */
async function getLatestRelease() {
  if (cachedRelease) return cachedRelease;
  if (pendingReleaseRequest) return pendingReleaseRequest;

  pendingReleaseRequest = fetch(GITHUB_RELEASES_API_URL, {
    cache: "no-store",
    headers: { Accept: "application/vnd.github+json" },
  }).then(async (response) => {
    if (!response.ok) throw new Error(`GitHub Releases API returned ${response.status}.`);

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("assets" in payload) || !Array.isArray(payload.assets)) {
      throw new Error("GitHub Releases API returned an invalid payload.");
    }

    cachedRelease = { assets: payload.assets.filter(isReleaseAsset) };
    return cachedRelease;
  }).finally(() => {
    pendingReleaseRequest = null;
  });

  return pendingReleaseRequest;
}

/** Resolves the newest published Android and Windows assets without relying on filenames. */
export async function getLatestReleaseAssets(): Promise<ReleaseAssetUrls> {
  const release = await getLatestRelease();

  return {
    android: selectReleaseAsset(release.assets, "android")?.browser_download_url ?? null,
    windows: selectReleaseAsset(release.assets, "windows")?.browser_download_url ?? null,
  };
}

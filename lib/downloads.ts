export const downloads = {
  android: {
    route: "/download/android",
    filename: "SuelosAR-Android.apk",
    contentType: "application/vnd.android.package-archive",
  },
  windows: {
    route: "/download/windows",
    filename: "SuelosAR-Windows.exe",
    contentType: "application/vnd.microsoft.portable-executable",
  },
} as const;

export type DownloadPlatform = keyof typeof downloads;

/** Stable download routes. Adding the installer files requires no component changes. */
export const ANDROID_DOWNLOAD_URL = "https://github.com/eljerexd/Web-SuelosAR/releases/latest/download/SuelosAR-Android.apk";
export const WINDOWS_DOWNLOAD_URL = "https://github.com/eljerexd/Web-SuelosAR/releases/latest/download/SuelosAR-Setup.exe";

export function isDownloadPlatform(value: string): value is DownloadPlatform {
  return value in downloads;
}

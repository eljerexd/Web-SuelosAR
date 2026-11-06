/** Queues a same-origin anonymous count request without delaying the external Play Store navigation. */
export function recordAndroidPlayButtonClick(isTrustedClick: boolean) {
  if (!isTrustedClick || typeof window === "undefined") return;

  void fetch("/api/metrics/android-play-click", {
    method: "POST",
    body: "",
    credentials: "omit",
    keepalive: true,
    mode: "same-origin",
    cache: "no-store",
  }).catch(() => undefined);
}

export const analyticsConsentStorageKey = "suelosar-analytics-consent-v1";
const analyticsConsentEvent = "suelosar-analytics-consent-change";
const productionHostname = "web-suelos-ar.vercel.app";

export type AnalyticsConsent = "accepted" | "rejected" | null;
export type AnalyticsConsentState = AnalyticsConsent | "checking";
export type AnalyticsEventName =
  | "download_click"
  | "catalog_view"
  | "catalog_navigation_click"
  | "province_link_click"
  | "province_page_view"
  | "feature_step_view";

type AnalyticsParameter = string | number | boolean;
type AnalyticsParameters = Record<string, AnalyticsParameter>;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: Gtag;
  }
}

export function isAnalyticsHostAllowed(
  hostname: string,
  nodeEnv = process.env.NODE_ENV,
  isAutomatedTest = typeof navigator !== "undefined" && navigator.webdriver,
) {
  return nodeEnv === "production" && hostname === productionHostname && !isAutomatedTest;
}

export function getAnalyticsMeasurementId() {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return value && /^G-[A-Z0-9]+$/.test(value) ? value : null;
}

export function getAnalyticsConsent(): AnalyticsConsentState {
  if (typeof window === "undefined") return "checking";

  try {
    const value = window.localStorage.getItem(analyticsConsentStorageKey);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function getServerAnalyticsConsent(): AnalyticsConsentState {
  return "checking";
}

export function subscribeToAnalyticsConsent(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleStorage = (event: StorageEvent) => {
    if (event.key === analyticsConsentStorageKey || event.key === null) callback();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(analyticsConsentEvent, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(analyticsConsentEvent, callback);
  };
}

function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const cookies = document.cookie.split(";").map((cookie) => cookie.trim().split("=")[0]);
  const analyticsCookies = cookies.filter((name) => name === "_ga" || name.startsWith("_ga_"));

  for (const name of analyticsCookies) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    if (window.location.hostname.includes(".")) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
    }
  }
}

function setGoogleAnalyticsDisabled(disabled: boolean) {
  if (typeof window === "undefined") return;
  const measurementId = getAnalyticsMeasurementId();
  if (!measurementId) return;

  const globals = window as unknown as Record<string, unknown>;
  // Google's opt-out flag stops subsequent collection without sending a Consent Mode ping.
  globals[`ga-disable-${measurementId}`] = disabled;
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  if (typeof window === "undefined") return;

  try {
    if (consent === null) window.localStorage.removeItem(analyticsConsentStorageKey);
    else window.localStorage.setItem(analyticsConsentStorageKey, consent);
  } catch {
    // A blocked or full local storage must not prevent the site from working.
  }

  if (consent !== "accepted") {
    setGoogleAnalyticsDisabled(true);
    clearAnalyticsCookies();
  } else {
    setGoogleAnalyticsDisabled(false);
  }

  window.dispatchEvent(new Event(analyticsConsentEvent));
}

export function isAnalyticsEnabled(hostname = typeof window === "undefined" ? "" : window.location.hostname) {
  return Boolean(
    getAnalyticsMeasurementId()
    && isAnalyticsHostAllowed(hostname)
    && getAnalyticsConsent() === "accepted",
  );
}

export function getSafePageLocation(includeCampaign = false) {
  if (typeof window === "undefined") return "";

  const currentUrl = new URL(window.location.href);
  const safeUrl = new URL(currentUrl.pathname, currentUrl.origin);

  if (includeCampaign) {
    for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
      const value = currentUrl.searchParams.get(key);
      if (value && /^[a-zA-Z0-9._~-]{1,80}$/.test(value)) safeUrl.searchParams.set(key, value);
    }
  }

  return safeUrl.toString();
}

function getSafeReferrer(previousPath?: string | null) {
  if (typeof window === "undefined") return "";

  try {
    const referrer = previousPath
      ? new URL(previousPath, window.location.origin)
      : new URL(document.referrer);
    return referrer.origin === window.location.origin
      ? `${referrer.origin}${referrer.pathname}`
      : referrer.origin;
  } catch {
    return "";
  }
}

export function trackAnalyticsEvent(name: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (!isAnalyticsEnabled() || !window.gtag) return;

  window.gtag("event", name, {
    ...parameters,
    page_location: getSafePageLocation(),
    transport_type: "beacon",
  });
}

export function trackDownloadClick(
  platform: "android" | "windows",
  downloadFormat: "google_play" | "apk" | "exe",
  buttonLocation: "hero" | "final_cta" | "province_hero" | "province_closing",
  appVersion?: string,
) {
  trackAnalyticsEvent("download_click", {
    platform,
    download_format: downloadFormat,
    button_location: buttonLocation,
    page_path: window.location.pathname,
    ...(appVersion ? { app_version: appVersion } : {}),
  });
}

export function trackProvinceLinkClick(province: "buenos_aires" | "santa_fe", linkLocation: "catalog_card" | "homepage_text" | "faq" | "cross_province") {
  trackAnalyticsEvent("province_link_click", {
    province,
    link_location: linkLocation,
    page_path: window.location.pathname,
  });
}

export function trackCatalogNavigationClick(linkLocation: "navbar" | "footer" | "final_cta") {
  trackAnalyticsEvent("catalog_navigation_click", {
    link_location: linkLocation,
    page_path: window.location.pathname,
  });
}

export function initializeGoogleAnalytics(measurementId: string) {
  if (typeof window === "undefined" || !isAnalyticsEnabled()) return;

  setGoogleAnalyticsDisabled(false);
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: getSafePageLocation(true),
    page_referrer: getSafeReferrer(),
  });
}

export function trackPageView(pathname: string, previousPath: string | null) {
  if (!isAnalyticsEnabled() || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: pathname,
    page_location: getSafePageLocation(previousPath === null),
    page_title: document.title,
    page_referrer: getSafeReferrer(previousPath),
    transport_type: "beacon",
  });

  if (pathname === "/mapas-de-suelos") {
    trackAnalyticsEvent("catalog_view", { page_path: pathname });
  } else if (pathname === "/mapa-suelos-buenos-aires") {
    trackAnalyticsEvent("province_page_view", { province: "buenos_aires", page_path: pathname });
  } else if (pathname === "/mapa-suelos-santa-fe") {
    trackAnalyticsEvent("province_page_view", { province: "santa_fe", page_path: pathname });
  }
}

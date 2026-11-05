"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import {
  getAnalyticsConsent,
  getAnalyticsMeasurementId,
  getServerAnalyticsConsent,
  initializeGoogleAnalytics,
  isAnalyticsHostAllowed,
  subscribeToAnalyticsConsent,
  trackPageView,
} from "@/lib/analytics";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeToAnalyticsConsent, getAnalyticsConsent, getServerAnalyticsConsent);
  const [scriptReady, setScriptReady] = useState(false);
  const lastTrackedPath = useRef<string | null>(null);
  const measurementId = getAnalyticsMeasurementId();
  const hostnameAllowed = typeof window !== "undefined" && isAnalyticsHostAllowed(window.location.hostname);
  const shouldLoad = Boolean(measurementId && hostnameAllowed && consent === "accepted");

  useEffect(() => {
    if (!shouldLoad || !scriptReady || !pathname || lastTrackedPath.current === pathname) return;

    trackPageView(pathname, lastTrackedPath.current);
    lastTrackedPath.current = pathname;
  }, [pathname, scriptReady, shouldLoad]);

  if (!shouldLoad || !measurementId) return null;

  return (
    <Script
      id="google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
      onReady={() => {
        initializeGoogleAnalytics(measurementId);
        setScriptReady(true);
      }}
    />
  );
}

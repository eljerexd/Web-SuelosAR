"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useSyncExternalStore } from "react";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { getAnalyticsConsent, getServerAnalyticsConsent, isAnalyticsHostAllowed, subscribeToAnalyticsConsent } from "@/lib/analytics";

export function AnalyticsSuite() {
  const consent = useSyncExternalStore(subscribeToAnalyticsConsent, getAnalyticsConsent, getServerAnalyticsConsent);
  const hostnameAllowed = typeof window !== "undefined" && isAnalyticsHostAllowed(window.location.hostname);

  if (consent !== "accepted" || !hostnameAllowed) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics />
    </>
  );
}

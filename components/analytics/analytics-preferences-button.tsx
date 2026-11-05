"use client";

import { useI18n } from "@/components/i18n/i18n-provider";
import { setAnalyticsConsent } from "@/lib/analytics";

export function AnalyticsPreferencesButton() {
  const { dictionary } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setAnalyticsConsent(null)}
      className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-[var(--primary)] underline decoration-[var(--outline-variant)] underline-offset-4 transition-colors hover:decoration-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
    >
      {dictionary.analyticsConsent.managePreference}
    </button>
  );
}

"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { useI18n } from "@/components/i18n/i18n-provider";
import { getAnalyticsConsent, getServerAnalyticsConsent, setAnalyticsConsent, subscribeToAnalyticsConsent } from "@/lib/analytics";

export function AnalyticsConsentBanner() {
  const consent = useSyncExternalStore(subscribeToAnalyticsConsent, getAnalyticsConsent, getServerAnalyticsConsent);
  const { dictionary } = useI18n();
  const copy = dictionary.analyticsConsent;

  if (consent !== null) return null;

  return (
    <aside
      aria-label={copy.title}
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto w-[calc(100%-1.5rem)] max-w-3xl rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container)] p-4 text-[var(--on-surface)] shadow-[var(--shadow-soft)] sm:inset-x-5 sm:bottom-5 sm:w-[calc(100%-2.5rem)] sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold">{copy.title}</h2>
          <p className="mt-1 text-sm leading-5 text-[var(--on-surface-variant)]">
            {copy.description}{" "}
            <Link href="/privacy" className="font-medium text-[var(--primary)] underline decoration-[var(--outline-variant)] underline-offset-2 hover:decoration-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]">
              {copy.privacyLink}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col-reverse gap-2 min-[380px]:flex-row">
          <button
            type="button"
            onClick={() => setAnalyticsConsent("rejected")}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--outline)] px-4 text-sm font-semibold text-[var(--on-surface)] transition-colors hover:bg-[var(--surface-container-high)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {copy.reject}
          </button>
          <button
            type="button"
            onClick={() => setAnalyticsConsent("accepted")}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--on-primary)] transition-[filter] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </aside>
  );
}

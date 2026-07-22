"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Landmark, MapPinned, WifiOff } from "lucide-react";

import { ReleaseDownloadLink } from "@/components/downloads/release-download-link";
import { useI18n } from "@/components/i18n/i18n-provider";

const trustIcons = [MapPinned, Landmark, WifiOff] as const;
const easing = [0.22, 1, 0.36, 1] as const;

export function FinalCta() {
  const reducedMotion = useReducedMotion();
  const { dictionary } = useI18n();

  return (
    <section id="download" className="scroll-mt-20 px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:pb-28" aria-labelledby="final-cta-title">
      <motion.div className="relative isolate mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--surface-container)] px-6 py-14 text-center shadow-[var(--shadow-soft)] sm:px-10 sm:py-16 lg:px-16 lg:py-20" initial={reducedMotion ? false : { opacity: 1, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reducedMotion ? 0 : 0.65, ease: easing }}>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-container)] opacity-35 blur-[100px] dark:opacity-20" aria-hidden="true" />
        <h2 id="final-cta-title" className="mx-auto max-w-4xl text-4xl font-bold tracking-[-0.05em] text-[var(--on-surface)] sm:text-5xl lg:text-6xl">{dictionary.cta.title}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8">{dictionary.cta.description}</p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <ReleaseDownloadLink platform="android" label={dictionary.cta.downloadAndroid} loadingMessage={dictionary.downloads.loading} fallbackMessage={dictionary.downloads.fallback} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--on-primary)] shadow-[0_10px_28px_rgb(47_104_66/0.14)] transition-[box-shadow,filter] duration-300 hover:brightness-105 hover:shadow-[0_14px_34px_rgb(47_104_66/0.18)]" whileHover={reducedMotion ? undefined : { y: -2, scale: 1.012, transition: { duration: 0.26, ease: easing } }} whileTap={reducedMotion ? undefined : { scale: 0.985 }} />
          <ReleaseDownloadLink platform="windows" label={dictionary.cta.downloadWindows} loadingMessage={dictionary.downloads.loading} fallbackMessage={dictionary.downloads.fallback} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--on-primary)] shadow-[0_10px_28px_rgb(47_104_66/0.14)] transition-[box-shadow,filter] duration-300 hover:brightness-105 hover:shadow-[0_14px_34px_rgb(47_104_66/0.18)]" whileHover={reducedMotion ? undefined : { y: -2, scale: 1.012, transition: { duration: 0.26, ease: easing } }} whileTap={reducedMotion ? undefined : { scale: 0.985 }} />
        </div>
        <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3" aria-label={dictionary.cta.trustLabel}>
          {dictionary.cta.badges.map((label, index) => { const Icon = trustIcons[index]; return <li key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--on-surface-variant)]"><Icon aria-hidden="true" size={15} strokeWidth={1.8} />{label}</li>; })}
        </ul>
      </motion.div>
    </section>
  );
}

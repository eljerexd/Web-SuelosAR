"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useI18n } from "@/components/i18n/i18n-provider";
import { DeviceMockup } from "@/components/ui/device-mockup";

export interface ScreenshotItem { src: string; title: string; description: string; screenPosition?: string; }
export interface ScreenshotGalleryProps { screenshots?: readonly ScreenshotItem[]; }

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const reducedMotion = useReducedMotion();
  const { dictionary } = useI18n();
  const items = screenshots ?? dictionary.gallery.items;
  const galleryGrid = items.length <= 2
    ? "mx-auto max-w-4xl sm:grid-cols-2"
    : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="screenshots" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 lg:py-28" aria-labelledby="screenshots-title">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div className="mx-auto max-w-3xl text-center" initial={reducedMotion ? false : { opacity: 1, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <h2 id="screenshots-title" className="text-4xl font-bold tracking-[-0.045em] text-[var(--on-surface)] sm:text-5xl">{dictionary.gallery.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8">{dictionary.gallery.subtitle}</p>
        </motion.div>
        <div className={`mt-12 grid grid-cols-1 gap-x-12 gap-y-14 lg:mt-14 lg:gap-x-14 lg:gap-y-16 ${galleryGrid}`}>
          {items.map((screenshot, index) => (
            <motion.article key={screenshot.src} data-screenshot-index={index} className="flex min-w-0 flex-col items-center text-center" initial={reducedMotion ? false : { opacity: 1, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : (index % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div className="flex w-full justify-center" whileHover={reducedMotion ? undefined : { y: -4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}>
                <DeviceMockup screenSrc={screenshot.src} screenAlt={`${screenshot.title} ${dictionary.gallery.screenAltSuffix}`} deviceLabel={dictionary.accessibility.deviceMockup} screenPosition={screenshot.screenPosition} screenFit="contain" className="w-full max-w-[17.25rem] sm:max-w-[18.25rem] xl:max-w-[19.5rem]" />
              </motion.div>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em] text-[var(--on-surface)]">{screenshot.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--on-surface-variant)]">{screenshot.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

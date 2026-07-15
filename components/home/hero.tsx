"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CircleDollarSign, Database, PanelsTopLeft, ShieldCheck, Smartphone, WifiOff } from "lucide-react";

import { HeroDeviceShowcase } from "@/components/home/hero-device-showcase";
import { useI18n } from "@/components/i18n/i18n-provider";
import { ANDROID_DOWNLOAD_URL, WINDOWS_DOWNLOAD_URL } from "@/lib/downloads";

const trustIcons = [CircleDollarSign, WifiOff, Database, ShieldCheck] as const;
const easing = [0.22, 1, 0.36, 1] as const;
const textItem = { hidden: { opacity: 1, y: 18 }, visible: { opacity: 1, y: 0 } };

export function Hero() {
  const reducedMotion = Boolean(useReducedMotion());
  const { dictionary } = useI18n();

  return (
    <section className="relative isolate overflow-hidden px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:min-h-[calc(100svh-5rem)] lg:py-16" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_38%,var(--hero-glow)_0%,transparent_39%),radial-gradient(circle_at_14%_16%,var(--primary-container)_0%,transparent_30%)] opacity-80 dark:opacity-45" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-28 top-[8%] -z-10 h-[28rem] w-[28rem] rounded-[44%_56%_62%_38%] bg-[var(--primary-container)] opacity-30 blur-[110px] dark:opacity-15" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-36 bottom-[-20%] -z-10 h-[25rem] w-[32rem] rounded-[58%_42%_38%_62%] bg-[var(--primary)] opacity-[0.08] blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_76%_43%,transparent_38%,var(--surface)_92%)] opacity-[0.18]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.018]" style={{ backgroundImage: "radial-gradient(rgba(38,55,40,0.7) 0.55px, transparent 0.55px)", backgroundSize: "4px 4px" }} aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-24">
        <motion.div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left" initial={reducedMotion ? false : "hidden"} animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.085, delayChildren: reducedMotion ? 0 : 0.08 } } }}>
          <motion.p variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.58, ease: easing }} className="inline-flex items-center gap-2 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 px-3.5 py-1.5 text-xs font-semibold tracking-[0.04em] text-[var(--on-surface-variant)] shadow-sm backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
            {dictionary.hero.label}
          </motion.p>

          <motion.h1 id="hero-title" variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.68, ease: easing }} className="mt-9 text-[2.8rem] font-bold leading-[1.02] tracking-[-0.058em] text-[var(--on-surface)] sm:text-6xl lg:text-[4rem] xl:text-[4.55rem]">
            <span className="block">{dictionary.hero.titleLineOne}</span>
            <span className="mt-1 block text-[var(--on-surface-variant)]">{dictionary.hero.titleLineTwo}</span>
          </motion.h1>

          <motion.p variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.62, ease: easing }} className="mx-auto mt-9 max-w-lg text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8 lg:mx-0">{dictionary.hero.description}</motion.p>

          <motion.div variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.6, ease: easing }} className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <motion.a href={ANDROID_DOWNLOAD_URL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--on-primary)] shadow-[0_8px_22px_rgb(47_104_66/0.13)] transition-[box-shadow,filter] duration-300 hover:brightness-105 hover:shadow-[0_12px_28px_rgb(47_104_66/0.18)]" whileHover={reducedMotion ? undefined : { y: -2, transition: { duration: 0.28, ease: easing } }} whileTap={reducedMotion ? undefined : { scale: 0.99 }}>
              <Smartphone aria-hidden="true" size={18} /> {dictionary.hero.downloadAndroid}
            </motion.a>
            <motion.a href={WINDOWS_DOWNLOAD_URL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--on-primary)] shadow-[0_8px_22px_rgb(47_104_66/0.13)] transition-[box-shadow,filter] duration-300 hover:brightness-105 hover:shadow-[0_12px_28px_rgb(47_104_66/0.18)]" whileHover={reducedMotion ? undefined : { y: -2, transition: { duration: 0.28, ease: easing } }} whileTap={reducedMotion ? undefined : { scale: 0.99 }}>
              <PanelsTopLeft aria-hidden="true" size={18} /> {dictionary.hero.downloadWindows}
            </motion.a>
          </motion.div>

          <motion.p variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.5, ease: easing }} className="mt-3 text-center text-xs font-medium text-[var(--on-surface-variant)]/90">{dictionary.hero.compatibility}</motion.p>

          <motion.ul variants={textItem} transition={{ duration: reducedMotion ? 0 : 0.58, ease: easing }} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 lg:justify-start" aria-label={dictionary.accessibility.applicationCapabilities}>
            {dictionary.hero.badges.map((label, index) => { const Icon = trustIcons[index]; return <li key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--on-surface-variant)]"><Icon aria-hidden="true" size={15} strokeWidth={1.8} />{label}</li>; })}
          </motion.ul>
        </motion.div>

        <HeroDeviceShowcase androidAlt={dictionary.hero.androidScreenAlt} windowsAlt={dictionary.hero.windowsScreenAlt} androidLabel={dictionary.accessibility.androidDevice} windowsLabel={dictionary.accessibility.windowsDevice} />
      </div>
    </section>
  );
}

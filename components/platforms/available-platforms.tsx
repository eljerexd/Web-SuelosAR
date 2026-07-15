"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PanelsTopLeft, Smartphone } from "lucide-react";

import { useI18n } from "@/components/i18n/i18n-provider";
import { PlatformCard } from "@/components/platforms/platform-card";

const platformIcons = [Smartphone, PanelsTopLeft] as const;

export function AvailablePlatforms() {
  const reducedMotion = useReducedMotion();
  const { dictionary } = useI18n();

  return (
    <section id="platforms" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 lg:py-28" aria-labelledby="platforms-title">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div className="mx-auto max-w-3xl text-center" initial={reducedMotion ? false : { opacity: 1, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <h2 id="platforms-title" className="text-4xl font-bold tracking-[-0.045em] text-[var(--on-surface)] sm:text-5xl">{dictionary.platforms.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8">{dictionary.platforms.subtitle}</p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6 lg:mt-14">
          {dictionary.platforms.cards.map((platform, index) => (
            <PlatformCard key={platform.title} icon={platformIcons[index]} {...platform} index={index} reducedMotion={Boolean(reducedMotion)} />
          ))}
        </div>
      </div>
    </section>
  );
}

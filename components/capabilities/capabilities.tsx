"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Layers, MapPinned, RefreshCw, WifiOff, type LucideIcon } from "lucide-react";

import { useI18n } from "@/components/i18n/i18n-provider";

const capabilityIcons = [MapPinned, Layers, WifiOff, RefreshCw] as const;
const easing = [0.22, 1, 0.36, 1] as const;

interface CapabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  reducedMotion: boolean;
}

function CapabilityCard({ icon: Icon, title, description, index, reducedMotion }: CapabilityCardProps) {
  return (
    <motion.article
      className="group h-full rounded-[1.75rem] border border-[var(--outline-variant)] bg-[var(--surface-container)]/68 p-6 shadow-[var(--shadow-soft)] transition-[background-color,box-shadow] duration-300 hover:bg-[var(--surface-container-high)] hover:shadow-md sm:p-7"
      initial={reducedMotion ? false : { opacity: 1, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reducedMotion ? 0 : 0.52, delay: reducedMotion ? 0 : index * 0.07, ease: easing }}
      whileHover={reducedMotion ? undefined : { y: -3, scale: 1.003, transition: { duration: 0.24, ease: easing } }}
    >
      <div className="grid size-11 place-items-center rounded-2xl bg-[var(--primary-container)] text-[var(--on-primary-container)]">
        <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[var(--on-surface)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--on-surface-variant)]">{description}</p>
    </motion.article>
  );
}

export function Capabilities() {
  const reducedMotion = Boolean(useReducedMotion());
  const { dictionary } = useI18n();

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:py-24" aria-labelledby="capabilities-title">
      <div className="mx-auto w-full max-w-7xl">
        <motion.h2
          id="capabilities-title"
          className="text-center text-4xl font-bold tracking-[-0.045em] text-[var(--on-surface)] sm:text-5xl"
          initial={reducedMotion ? false : { opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reducedMotion ? 0 : 0.56, ease: easing }}
        >
          {dictionary.capabilities.title}
        </motion.h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 xl:grid-cols-4">
          {dictionary.capabilities.items.map((item, index) => (
            <CapabilityCard key={item.title} icon={capabilityIcons[index]} {...item} index={index} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

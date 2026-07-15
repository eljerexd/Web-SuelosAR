"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface PlatformCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  versionLabel: string;
  version: string;
  requirementsLabel: string;
  requirements: string;
  index: number;
  reducedMotion: boolean;
}

/** Reusable installer card for current and future SuelosAR platforms. */
export function PlatformCard({ icon: Icon, title, description, versionLabel, version, requirementsLabel, requirements, index, reducedMotion }: PlatformCardProps) {
  return (
    <motion.article
      className="group flex h-full flex-col rounded-[1.75rem] border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 p-6 shadow-[var(--shadow-soft)] transition-[background-color,box-shadow] duration-300 hover:bg-[var(--surface-container-high)] hover:shadow-md sm:p-7"
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0 : 0.56, delay: reducedMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: -4, scale: 1.004, transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="grid size-12 place-items-center rounded-2xl bg-[var(--primary-container)] text-[var(--on-primary-container)]"><Icon aria-hidden="true" size={23} strokeWidth={1.8} /></div>
      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-[var(--on-surface)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--on-surface-variant)] sm:text-base sm:leading-7">{description}</p>
      <dl className="mt-7 grid gap-4 border-t border-[var(--outline-variant)] pt-5">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">{versionLabel}</dt>
          <dd className="mt-1 text-sm font-semibold text-[var(--on-surface)] sm:text-base">{version}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">{requirementsLabel}</dt>
          <dd className="mt-1 text-sm leading-6 text-[var(--on-surface-variant)]">{requirements}</dd>
        </div>
      </dl>
    </motion.article>
  );
}

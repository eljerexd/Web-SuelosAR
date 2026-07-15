"use client";

import { motion } from "framer-motion";
import type { RefCallback } from "react";

import { LaptopMockup } from "@/components/ui/laptop-mockup";

interface FeatureStoryProps {
  title: string;
  description: string;
  imageAlt: string;
  src: string;
  index: number;
  total: number;
  active: boolean;
  stepRef: RefCallback<HTMLElement>;
  reducedMotion?: boolean;
}

/** One scroll chapter in the Features product tour, with its mobile screenshot. */
export function FeatureStory({ title, description, imageAlt, src, index, total, active, stepRef, reducedMotion = false }: FeatureStoryProps) {
  const label = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const progress = (index + 1) / total;

  return (
    <motion.article
      ref={stepRef}
      className={`flex flex-col justify-center rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 p-5 shadow-[var(--shadow-soft)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:p-8 lg:min-h-[69svh] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${active ? "lg:translate-y-0 lg:opacity-100" : "lg:translate-y-3 lg:opacity-40"}`}
      aria-current={active ? "step" : undefined}
    >
      <div>
        <p className={`text-xs font-semibold tracking-[0.16em] transition-colors duration-300 motion-reduce:transition-none ${active ? "text-[var(--primary)]" : "text-[var(--on-surface-variant)]"}`}>{label}</p>
        <div className="mt-3 h-px w-24 overflow-hidden rounded-full bg-[var(--outline-variant)]" aria-hidden="true">
          <motion.div
            className="h-full w-full origin-left bg-[var(--primary)]"
            initial={false}
            animate={{ scaleX: active ? progress : 0, opacity: active ? 1 : 0.35 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
      <h3 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-[var(--on-surface)] sm:text-4xl">{title}</h3>
      <p className="mt-5 max-w-lg text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8">{description}</p>

      <div className="mt-9 lg:hidden">
        <LaptopMockup screenSrc={src} screenAlt={imageAlt} deviceLabel={title} className="w-full" priority={index === 0} />
      </div>
    </motion.article>
  );
}

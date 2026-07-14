"use client";

import { motion } from "framer-motion";

import { BrandMark } from "@/components/brand/brand-mark";
import { siteConfig } from "@/lib/site";

const item = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-10rem)] items-center justify-center overflow-hidden px-5 py-16 sm:px-8" aria-labelledby="hero-title">
      <motion.div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12, delayChildren: 0.08 }}
      >
        <motion.div variants={item} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          <BrandMark />
        </motion.div>
        <motion.h1 id="hero-title" className="mt-8 text-5xl font-bold tracking-[-0.045em] text-[var(--on-surface)] sm:text-7xl" variants={item} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          {siteConfig.name}
        </motion.h1>
        <motion.p className="mt-5 max-w-xl text-lg leading-8 text-[var(--on-surface-variant)] sm:text-xl" variants={item} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          {siteConfig.subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}

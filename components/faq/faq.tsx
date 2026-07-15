"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

import { FaqItem } from "@/components/faq/faq-item";
import { useI18n } from "@/components/i18n/i18n-provider";

export function Faq() {
  const reducedMotion = useReducedMotion();
  const { dictionary } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasReachedSection, setHasReachedSection] = useState(false);

  useLayoutEffect(() => {
    if (hasReachedSection) return;

    let animationFrame: number | null = null;

    const updateRevealState = () => {
      animationFrame = null;
      const section = sectionRef.current;
      if (!section) return;

      const revealLine = window.innerHeight * 0.88;
      if (section.getBoundingClientRect().top <= revealLine) {
        setHasReachedSection(true);
      }
    };

    const scheduleUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateRevealState);
      }
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    if (sectionRef.current) resizeObserver.observe(sectionRef.current);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);

    // Run synchronously before paint so restored positions cannot leave the FAQ hidden.
    updateRevealState();

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
    };
  }, [hasReachedSection]);

  return (
    <section ref={sectionRef} id="faq" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 lg:py-28" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div className="mx-auto max-w-2xl text-center" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion || hasReachedSection ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <h2 id="faq-title" className="text-4xl font-bold tracking-[-0.045em] text-[var(--on-surface)] sm:text-5xl">{dictionary.faq.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8">{dictionary.faq.subtitle}</p>
        </motion.div>
        <motion.div className="mt-12 grid gap-3 sm:mt-14" initial={reducedMotion ? false : "hidden"} animate={reducedMotion || hasReachedSection ? "visible" : "hidden"} variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.06 } } }}>
          {dictionary.faq.items.map((item) => (
            <motion.div key={item.question} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] } } }}>
              <FaqItem question={item.question} answer={item.answer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

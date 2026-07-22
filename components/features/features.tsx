"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { useI18n } from "@/components/i18n/i18n-provider";
import { DeviceShowcase } from "@/components/ui/device-showcase";
import { LAPTOP_SCREEN_SIZES } from "@/components/ui/laptop-mockup";
import { getActiveFeatureIndex } from "@/lib/product-tour-scroll";
import { FeatureStory } from "./feature-story";

const featureImages = [
  { src: "/images/screenshots/feature-map.png" },
  { src: "/images/screenshots/feature-cartography.png" },
  { src: "/images/screenshots/feature-pdf.png" },
  { src: "/images/screenshots/feature-measurements.png" },
  { src: "/images/screenshots/feature-markers.png" },
  { src: "/images/screenshots/feature-favorites.png" },
] as const;

const featureOrder = [0, 1, 2, 5, 4, 3] as const;
const easing = [0.22, 1, 0.36, 1] as const;
const glowOpacity = [0.052, 0.064, 0.056, 0.07, 0.06, 0.066] as const;

export function Features() {
  const reducedMotion = useReducedMotion();
  const { dictionary } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const features = useMemo(() => featureOrder.map((sourceIndex) => ({
    ...dictionary.features.items[sourceIndex],
    ...featureImages[sourceIndex],
  })), [dictionary.features.items]);
  const stepCallbacks = useMemo(
    () => features.map((_, index) => (step: HTMLElement | null) => {
      stepRefs.current[index] = step;
    }),
    [features],
  );
  const activeFeature = features[activeIndex];

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateActiveFeature = () => {
      animationFrame = null;
      const steps = stepRefs.current;

      if (steps.length !== features.length || steps.some((step) => step === null)) return;

      const bounds = steps.map((step) => {
        const rect = step!.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom };
      });
      const nextIndex = getActiveFeatureIndex(bounds, window.innerHeight);

      setActiveIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
    };

    const scheduleUpdate = () => {
      if (animationFrame === null) animationFrame = window.requestAnimationFrame(updateActiveFeature);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    stepRefs.current.forEach((step) => {
      if (step) resizeObserver.observe(step);
    });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);
    scheduleUpdate();

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
    };
  }, [features.length]);

  return (
    <section id="features" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 lg:py-28" aria-labelledby="features-title">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div className="mx-auto max-w-3xl text-center" initial={reducedMotion ? false : { opacity: 1, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <h2 id="features-title" className="text-4xl font-bold tracking-[-0.045em] text-[var(--on-surface)] sm:text-5xl">{dictionary.features.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8">{dictionary.features.subtitle}</p>
        </motion.div>
        <div className="mt-12 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-16 xl:gap-24">
          <div className="space-y-8 lg:space-y-0">
            {features.map((feature, index) => (
              <FeatureStory
                key={feature.title}
                {...feature}
                index={index}
                total={features.length}
                active={activeIndex === index}
                stepRef={stepCallbacks[index]}
                reducedMotion={Boolean(reducedMotion)}
              />
            ))}
          </div>

          <div className="sticky top-20 hidden h-[calc(100svh-5rem)] items-center lg:flex">
            <DeviceShowcase
              laptopScreenSrc={activeFeature.src}
              laptopScreenAlt={activeFeature.imageAlt}
              laptopLabel={activeFeature.title}
              phoneScreenSrc="/images/screenshots/gis.jpg"
              phoneScreenAlt={dictionary.hero.androidScreenAlt}
              phoneLabel={dictionary.accessibility.androidDevice}
              laptopScreenContent={
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    key={activeFeature.src}
                    className="absolute inset-0"
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.98, filter: "blur(1.5px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, filter: "blur(1.5px)" }}
                    transition={{ duration: reducedMotion ? 0 : 0.46, ease: easing }}
                    style={{ willChange: "transform, opacity, filter" }}
                  >
                    <Image src={activeFeature.src} alt={activeFeature.imageAlt} fill sizes={LAPTOP_SCREEN_SIZES} />
                  </motion.div>
                </AnimatePresence>
              }
              backdrop={
                <motion.div
                  className="pointer-events-none absolute inset-[7%] rounded-[44%] bg-[var(--primary)] blur-[76px] dark:opacity-[0.04]"
                  animate={{ opacity: glowOpacity[activeIndex] }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: easing }}
                  aria-hidden="true"
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

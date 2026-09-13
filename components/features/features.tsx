"use client";

import { animate, AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useI18n } from "@/components/i18n/i18n-provider";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { LaptopMockup } from "@/components/ui/laptop-mockup";
import { getActiveFeatureIndex } from "@/lib/product-tour-scroll";
import { homeStats } from "@/lib/stats";
import { DeviceLinkingScene } from "./device-linking-scene";
import { FeatureStory } from "./feature-story";
import { ProvinceRoadmap } from "./province-roadmap";

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
  const hasAnimatedStatsRef = useRef(false);
  const [soilMapsValue, setSoilMapsValue] = useState<number>(() => reducedMotion ? homeStats.soilMaps.end : homeStats.soilMaps.start);
  const [provincesValue, setProvincesValue] = useState<number>(() => reducedMotion ? homeStats.provinces.end : homeStats.provinces.start);
  const [roadmapProgress, setRoadmapProgress] = useState(() => reducedMotion ? 1 : 0);
  const [santaFeActive, setSantaFeActive] = useState<boolean>(() => Boolean(reducedMotion));
  const [buenosAiresMilestoneVisible, setBuenosAiresMilestoneVisible] = useState<boolean>(() => Boolean(reducedMotion));
  const [santaFeMilestoneVisible, setSantaFeMilestoneVisible] = useState<boolean>(() => Boolean(reducedMotion));
  const statisticValues = [String(soilMapsValue), String(provincesValue), homeStats.mainFeatures];

  const startStatsSequence = useCallback(() => {
    if (hasAnimatedStatsRef.current) return;
    hasAnimatedStatsRef.current = true;

    if (reducedMotion) {
      setSoilMapsValue(homeStats.soilMaps.end);
      setProvincesValue(homeStats.provinces.end);
      setRoadmapProgress(1);
      setSantaFeActive(true);
      setBuenosAiresMilestoneVisible(true);
      setSantaFeMilestoneVisible(true);
      return;
    }

    // Cartas y series counts up first; provincias + the roadmap connector start slightly after,
    // driven by the same slow tween (1.2s) so the green line is easy to follow as it moves from
    // Buenos Aires to Santa Fe. Santa Fe's check only appears a short beat after the line
    // finishes — not mid-tween — so it reads as its own deliberate step. Each province's quiet
    // product-milestone note fades in a beat after that province's own check, never with it.
    animate(homeStats.soilMaps.start, homeStats.soilMaps.end, {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setSoilMapsValue(Math.round(value)),
    });

    window.setTimeout(() => setBuenosAiresMilestoneVisible(true), 550);

    animate(0, 1, {
      duration: 1.2,
      delay: 0.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (t) => {
        setProvincesValue(Math.round(homeStats.provinces.start + t * (homeStats.provinces.end - homeStats.provinces.start)));
        setRoadmapProgress(t);
      },
      onComplete: () => {
        window.setTimeout(() => setSantaFeActive(true), 160);
        window.setTimeout(() => setSantaFeMilestoneVisible(true), 160 + 450);
      },
    });
  }, [reducedMotion]);
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
          <p className="mt-7 text-center text-sm font-medium text-[var(--on-surface-variant)] opacity-80 sm:mt-8">{dictionary.features.statisticsIntro}</p>

          <div className="mt-3 flex flex-col items-center">
            <span className="text-6xl font-bold leading-none tracking-[-0.04em] text-[var(--on-surface)] sm:text-7xl lg:text-8xl">
              {statisticValues[0]}
            </span>
            <span className="mt-3 text-sm font-semibold text-[var(--on-surface-variant)] sm:text-base">
              {dictionary.features.statistics[0].label}
            </span>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 sm:gap-14">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold tracking-[-0.03em] text-[var(--on-surface)] sm:text-3xl">{statisticValues[1]}</span>
              <span className="mt-1 text-xs font-medium text-[var(--on-surface-variant)] sm:text-sm">{dictionary.features.statistics[1].label}</span>
            </div>
            <div className="h-9 w-px bg-[var(--outline-variant)] sm:h-10" aria-hidden="true" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold tracking-[-0.03em] text-[var(--on-surface)] sm:text-3xl">{statisticValues[2]}</span>
              <span className="mt-1 text-xs font-medium text-[var(--on-surface-variant)] sm:text-sm">{dictionary.features.statistics[2].label}</span>
            </div>
          </div>

          {/* The count-up + connector-line sequence triggers specifically off the roadmap itself
              coming into view — not the 599 stat, not the section as a whole — so the numbers can
              sit static on screen while the user scrolls, and the whole animation only plays once
              the timeline is actually what the user is looking at. */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 1, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={startStatsSequence}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProvinceRoadmap
              labels={dictionary.features.roadmap}
              progress={roadmapProgress}
              santaFeActive={santaFeActive}
              buenosAiresMilestoneVisible={buenosAiresMilestoneVisible}
              santaFeMilestoneVisible={santaFeMilestoneVisible}
              reducedMotion={Boolean(reducedMotion)}
            />
          </motion.div>
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
            <div className="relative left-1/2 w-[108%] -translate-x-1/2">
              <motion.div
                className="pointer-events-none absolute inset-[7%] rounded-[44%] bg-[var(--primary)] blur-[76px] dark:opacity-[0.04]"
                animate={{ opacity: glowOpacity[activeIndex] }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: easing }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-x-[7%] bottom-[8%] h-[18%] rounded-[50%] bg-black/20 blur-3xl dark:bg-black/35" aria-hidden="true" />
              <div className="relative aspect-[1.72] w-full">
                <div className="absolute inset-0 flex items-center">
                  <ImageLightbox src={activeFeature.src} alt={activeFeature.imageAlt}>
                    <LaptopMockup
                      screenSrc={activeFeature.src}
                      screenAlt={activeFeature.imageAlt}
                      deviceLabel={activeFeature.title}
                      className="w-full"
                      screenContent={
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
                            <Image src={activeFeature.src} alt={activeFeature.imageAlt} fill sizes="52vw" />
                          </motion.div>
                        </AnimatePresence>
                      }
                    />
                  </ImageLightbox>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DeviceLinkingScene
          title={dictionary.features.deviceLinking.title}
          subtitle={dictionary.features.deviceLinking.subtitle}
          windowsLabel={dictionary.features.deviceLinking.windowsLabel}
          androidLabel={dictionary.features.deviceLinking.androidLabel}
          linkedLabel={dictionary.features.deviceLinking.linkedLabel}
          indicators={[dictionary.features.deviceLinking.measurements, dictionary.features.deviceLinking.markers, dictionary.features.deviceLinking.favorites]}
        />
      </div>
    </section>
  );
}

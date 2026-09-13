"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeftRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DeviceMockup } from "@/components/ui/device-mockup";
import { LaptopMockup } from "@/components/ui/laptop-mockup";

/**
 * Framer Motion auto-accelerates target-based `useScroll` with the browser's native
 * ViewTimeline when available. On browsers that support it, once a `useTransform`-derived
 * value's keyframe range finishes, its accelerated WAAPI animation can report
 * `playState: "finished"` while the compositor keeps painting an intermediate opacity
 * instead of holding the final keyframe (confirmed via `element.getAnimations()`) — title,
 * subtitle and other late-phase values never fully resolve. Clearing `ViewTimeline` before
 * this module's `useScroll` call ever runs forces Motion's reliable rAF-driven fallback.
 * This file is the only user of `useScroll` in the app, so this doesn't affect anything else.
 */
if (typeof window !== "undefined") {
  try {
    (window as unknown as { ViewTimeline?: unknown }).ViewTimeline = undefined;
  } catch {
    // Ignore: if the browser exposes ViewTimeline as non-configurable, we fall back to
    // native acceleration and accept the risk of the stuck-opacity bug described above.
  }
}

interface DeviceLinkingSceneProps {
  title: string;
  subtitle: string;
  windowsLabel: string;
  androidLabel: string;
  linkedLabel: string;
  indicators: [string, string, string];
}

const easing = [0.22, 1, 0.36, 1] as const;

/**
 * Large closing scene for the Features tour — not one of the 6 counted features. A pinned,
 * scroll-scrubbed sequence of discrete phases: laptop settles → phone enters → connection draws
 * → "linked" confirmation → message resolves → stable close. Both mockups are always fully
 * opaque once they've entered — the entrance itself is driven by position/scale only, never by
 * opacity, so nothing ever reads as translucent or fading. Neither mockup ever fades out: the
 * scene ends with both devices visibly connected, and only then hands off to the next section.
 */
export function DeviceLinkingScene({ title, subtitle, windowsLabel, androidLabel, linkedLabel, indicators }: DeviceLinkingSceneProps) {
  const reducedMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [connected, setConnected] = useState(false);
  const [linkedVisible, setLinkedVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Phase 1 (0–0.20): laptop settles — position/scale only, always fully opaque.
  const laptopX = useTransform(scrollYProgress, [0, 0.2], [-24, 0]);
  const laptopScale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1]);

  // Phase 2 (0.20–0.40): phone enters from the right — position/scale only, opacity stays 1.
  // The start offset is a percentage of the phone's own width (not a fixed px value) so it's
  // reliably clipped outside the scene's overflow-hidden frame during Phase 1, regardless of
  // viewport size, and only becomes visible as it slides in during this phase.
  const phoneX = useTransform(scrollYProgress, [0.2, 0.4], ["220%", "0%"]);
  const phoneScale = useTransform(scrollYProgress, [0.2, 0.4], [0.9, 1]);
  // Mobile's composition is vertical (laptop → phone below it), so the phone enters from
  // below instead of from the side — same phase, same duration, only the axis changes.
  const phoneY = useTransform(scrollYProgress, [0.2, 0.4], ["45%", "0%"]);

  // Phase 3 (0.40–0.60): connector line fills left → right once both devices are in place.
  const connectorFill = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  // Phase 4: message resolves in a zone separated from the mockups. Title and subtitle use
  // non-overlapping scroll ranges — sharing overlapping ranges on the same accelerated scroll
  // timeline caused one of the two to get stuck at its start value on native-timeline browsers.
  const titleOpacity = useTransform(scrollYProgress, [0.68, 0.78], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.68, 0.78], [14, 0]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.8, 0.9], [14, 0]);

  const indicatorsOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const indicatorsY = useTransform(scrollYProgress, [0.9, 1], [8, 0]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!connected && value >= 0.6) setConnected(true);
    if (!linkedVisible && value >= 0.68) setLinkedVisible(true);
  });

  const content = reducedMotion ? (
    <>
      <MockupComposition
        laptopStyle={{}}
        phoneStyle={{}}
        phoneStyleMobile={{}}
        connectorStyle={{}}
        connectorStyleMobile={{}}
        connected
        linkedVisible
        linkedLabel={linkedLabel}
        windowsLabel={windowsLabel}
        androidLabel={androidLabel}
        reducedMotion
      />
      <h3 className="mt-12 text-center text-2xl font-bold tracking-[-0.03em] text-[var(--on-surface)] sm:mt-16 sm:text-3xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-[var(--on-surface-variant)] sm:text-base">{subtitle}</p>
      <IndicatorRow indicators={indicators} className="mt-5" />
    </>
  ) : (
    <>
      <MockupComposition
        laptopStyle={{ x: laptopX, scale: laptopScale }}
        phoneStyle={{ x: phoneX, scale: phoneScale }}
        phoneStyleMobile={{ y: phoneY, scale: phoneScale }}
        connectorStyle={{ scaleX: connectorFill }}
        connectorStyleMobile={{ scaleY: connectorFill }}
        connected={connected}
        linkedVisible={linkedVisible}
        linkedLabel={linkedLabel}
        windowsLabel={windowsLabel}
        androidLabel={androidLabel}
        reducedMotion={false}
      />
      <motion.h3 style={{ opacity: titleOpacity, y: titleY }} className="mt-12 text-center text-2xl font-bold tracking-[-0.03em] text-[var(--on-surface)] sm:mt-16 sm:text-3xl">
        {title}
      </motion.h3>
      <motion.p style={{ opacity: subtitleOpacity, y: subtitleY }} className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-[var(--on-surface-variant)] sm:text-base">
        {subtitle}
      </motion.p>
      <motion.div style={{ opacity: indicatorsOpacity, y: indicatorsY }}>
        <IndicatorRow indicators={indicators} className="mt-5" />
      </motion.div>
    </>
  );

  if (reducedMotion) {
    return (
      <div className="mx-auto mt-16 flex w-full max-w-4xl flex-col items-center px-5 sm:mt-20 sm:px-0">
        {content}
      </div>
    );
  }

  return (
    <div ref={sceneRef} className="relative mt-16 h-[280vh] sm:mt-20 sm:h-[260vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-5 sm:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">{content}</div>
      </div>
    </div>
  );
}

function MockupComposition({
  laptopStyle,
  phoneStyle,
  phoneStyleMobile,
  connectorStyle,
  connectorStyleMobile,
  connected,
  linkedVisible,
  linkedLabel,
  windowsLabel,
  androidLabel,
  reducedMotion,
}: {
  laptopStyle: Record<string, unknown>;
  phoneStyle: Record<string, unknown>;
  phoneStyleMobile: Record<string, unknown>;
  connectorStyle: Record<string, unknown>;
  connectorStyleMobile: Record<string, unknown>;
  connected: boolean;
  linkedVisible: boolean;
  linkedLabel: string;
  windowsLabel: string;
  androidLabel: string;
  reducedMotion: boolean;
}) {
  const pcScreens = (
    <>
      <LaptopMockup screenSrc="/images/screenshots/vinculacion-pc-inicial.png" screenAlt={windowsLabel} deviceLabel={windowsLabel} displayAspectRatio="1920 / 1080" className="w-full" />
      {/* Once linked, the PC's own screen crossfades to the synced state — the visual payoff
          of "work on one device, see it on the other." Both mockups stay mounted and in
          place; only the screen content swaps. */}
      <motion.div
        className="absolute inset-0"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: linkedVisible ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, ease: easing }}
      >
        <LaptopMockup
          screenSrc="/images/screenshots/vinculacion-pc-vinculado.png"
          screenAlt={windowsLabel}
          deviceLabel={windowsLabel}
          displayAspectRatio="1920 / 1080"
          className="w-full"
        />
      </motion.div>
    </>
  );

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-x-[10%] top-1/2 -z-10 h-[70%] -translate-y-1/2 rounded-[50%] bg-[var(--primary)] opacity-[0.08] blur-[100px] dark:opacity-[0.06]" aria-hidden="true" />

      {/* Desktop / tablet — the overlapping, layered composition. Untouched. */}
      <div className="hidden sm:block">
        <motion.div style={laptopStyle} className="relative mx-auto w-full sm:w-[86%] lg:w-[80%]">
          {pcScreens}
        </motion.div>

        <motion.div style={phoneStyle} className="absolute -bottom-[9%] -right-[2%] z-10 w-[27%] sm:-right-[4%] sm:w-[22%] lg:w-[18%]">
          {/* The phone has no separate "before" screen — it already shows the linked state from
              the moment it appears, per the definitive assets. */}
          <DeviceMockup screenSrc="/images/screenshots/vinculacion-android-vinculado.jpg" screenAlt={androidLabel} deviceLabel={androidLabel} className="w-full" />
        </motion.div>

        <ConnectionArrow
          connected={connected}
          linkedVisible={linkedVisible}
          linkedLabel={linkedLabel}
          reducedMotion={reducedMotion}
          connectorStyle={connectorStyle}
        />
      </div>

      {/* Mobile / compact — a dedicated vertical stack, not a shrunk desktop layout. The
          phone never overlaps the laptop: laptop → connection → phone → "Vinculados", each
          in normal flow so nothing is clipped or crowded regardless of viewport width. */}
      <div className="flex w-full flex-col items-center sm:hidden">
        <motion.div style={laptopStyle} className="relative w-[88%] max-w-[22rem]">
          {pcScreens}
        </motion.div>

        <ConnectionArrowVertical connected={connected} reducedMotion={reducedMotion} connectorStyle={connectorStyleMobile} />

        {/* Same DeviceMockup component and usage as desktop (className="w-full" inside a
            sized wrapper) — nothing about the frame/bezel/notch is reimplemented for mobile.
            Its bezel proportions (border-radius etc.) are fixed rem values calibrated for the
            ~11rem width this component is used at elsewhere (see hero-device-showcase.tsx), so
            shrinking it below that via a narrower width utility alone made the corners look
            like a pill instead of a phone. Rendering it at that natural 11rem size and then
            applying a uniform CSS `scale` down to the target footprint shrinks the *entire*
            rendered mockup — bezel, radius, camera dot, borders — proportionally, so it reads
            as the exact same device, just smaller, instead of a differently-proportioned one. */}
        <motion.div style={phoneStyleMobile} className="relative w-[8.25rem] aspect-[9/19]">
          <div className="absolute left-0 top-0 w-[11rem] origin-top-left scale-75">
            <DeviceMockup screenSrc="/images/screenshots/vinculacion-android-vinculado.jpg" screenAlt={androidLabel} deviceLabel={androidLabel} className="w-full" />
          </div>
        </motion.div>

        <LinkedBadge linkedVisible={linkedVisible} linkedLabel={linkedLabel} reducedMotion={reducedMotion} className="mt-3" />
      </div>
    </div>
  );
}

/**
 * The protagonist of the connection: a bidirectional arrow badge sitting on the seam between
 * the two mockups, flanked by short thin lines (not a plain line by itself). Once `connected`
 * flips, the flank lines grow in from the badge outward, the badge itself scales/fades in, then
 * a brief two-beat pulse communicates the exchange running both ways (Windows→Android and
 * Android→Windows) without implying a loop. It then settles at a slightly calmer opacity and
 * stays visible for the rest of the scene — this connection is never removed once it appears.
 */
function ConnectionArrow({
  connected,
  linkedVisible,
  linkedLabel,
  reducedMotion,
  connectorStyle,
}: {
  connected: boolean;
  linkedVisible: boolean;
  linkedLabel: string;
  reducedMotion: boolean;
  connectorStyle: Record<string, unknown>;
}) {
  const [settled, setSettled] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion || !connected) return;
    const timeout = window.setTimeout(() => setSettled(true), 950);
    return () => window.clearTimeout(timeout);
  }, [connected, reducedMotion]);

  const badgeInitial = reducedMotion ? false : { opacity: 0, scale: 0.5 };
  const badgeAnimate = connected || reducedMotion
    ? { opacity: settled ? 0.82 : 1, scale: 1 }
    : { opacity: 0, scale: 0.5 };
  const pulseAnimate =
    !reducedMotion && connected && !settled ? { scale: [1, 1.16, 1, 1.16, 1] } : { scale: 1 };

  return (
    <div className="absolute -bottom-[13%] right-[22%] z-20 flex translate-x-1/2 flex-col items-center gap-1.5 sm:-bottom-[5%] sm:right-[13%] lg:-bottom-[4%] lg:right-[11.5%]">
      <div className="flex items-center gap-1">
        <div className="h-px w-3 origin-right overflow-hidden bg-[var(--outline-variant)] sm:w-4">
          <motion.div className="h-full w-full origin-right bg-[var(--primary)]" style={connectorStyle} />
        </div>

        <motion.div
          initial={badgeInitial}
          animate={badgeAnimate}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: easing }}
          className="relative"
        >
          <motion.div
            animate={pulseAnimate}
            transition={{ duration: 0.6, delay: 0.25, ease: easing, times: [0, 0.25, 0.5, 0.75, 1] }}
            className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--primary)]/30 bg-[var(--surface-container-high)] text-[var(--primary)] shadow-sm sm:size-10"
          >
            <ArrowLeftRight size={16} strokeWidth={2.25} className="sm:size-5" />
          </motion.div>
        </motion.div>

        <div className="h-px w-3 origin-left overflow-hidden bg-[var(--outline-variant)] sm:w-4">
          <motion.div className="h-full w-full origin-left bg-[var(--primary)]" style={connectorStyle} />
        </div>
      </div>

      {/* "Vinculados" belongs visually to the connection, not to the title below — it sits
          directly under the arrow, centered on it, and only appears once the arrow's own
          appear/pulse sequence has resolved (driven by `linkedVisible`, which fires after
          `connected`'s animation has had time to play out). */}
      <LinkedBadge linkedVisible={linkedVisible} linkedLabel={linkedLabel} reducedMotion={reducedMotion} />
    </div>
  );
}

/**
 * Mobile's vertical counterpart to `ConnectionArrow` — same badge, same pulse, same timing,
 * just a top-to-bottom connector instead of left-to-right so it reads correctly between a
 * laptop sitting above and a phone sitting below it. Deliberately excludes the "Vinculados"
 * badge: mobile's vertical stack places that directly under the phone instead (see
 * `MockupComposition`), matching the requested reading order for the compact layout.
 */
function ConnectionArrowVertical({
  connected,
  reducedMotion,
  connectorStyle,
}: {
  connected: boolean;
  reducedMotion: boolean;
  connectorStyle: Record<string, unknown>;
}) {
  const [settled, setSettled] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion || !connected) return;
    const timeout = window.setTimeout(() => setSettled(true), 950);
    return () => window.clearTimeout(timeout);
  }, [connected, reducedMotion]);

  const badgeInitial = reducedMotion ? false : { opacity: 0, scale: 0.5 };
  const badgeAnimate = connected || reducedMotion
    ? { opacity: settled ? 0.82 : 1, scale: 1 }
    : { opacity: 0, scale: 0.5 };
  const pulseAnimate =
    !reducedMotion && connected && !settled ? { scale: [1, 1.16, 1, 1.16, 1] } : { scale: 1 };

  return (
    <div className="flex flex-col items-center gap-1 py-1.5">
      <div className="h-3 w-px origin-top overflow-hidden bg-[var(--outline-variant)]">
        <motion.div className="h-full w-full origin-top bg-[var(--primary)]" style={connectorStyle} />
      </div>

      <motion.div
        initial={badgeInitial}
        animate={badgeAnimate}
        transition={{ duration: reducedMotion ? 0 : 0.4, ease: easing }}
        className="relative"
      >
        <motion.div
          animate={pulseAnimate}
          transition={{ duration: 0.6, delay: 0.25, ease: easing, times: [0, 0.25, 0.5, 0.75, 1] }}
          className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--primary)]/30 bg-[var(--surface-container-high)] text-[var(--primary)] shadow-sm"
        >
          <ArrowLeftRight size={16} strokeWidth={2.25} className="rotate-90" />
        </motion.div>
      </motion.div>

      <div className="h-3 w-px origin-bottom overflow-hidden bg-[var(--outline-variant)]">
        <motion.div className="h-full w-full origin-bottom bg-[var(--primary)]" style={connectorStyle} />
      </div>
    </div>
  );
}

/** The "✓ Vinculados" pill — shared between the desktop and mobile compositions so both stay
 * pixel-consistent and only ever appears once `linkedVisible` flips (after the connection
 * animation resolves), never before. */
function LinkedBadge({
  linkedVisible,
  linkedLabel,
  reducedMotion,
  className = "",
}: {
  linkedVisible: boolean;
  linkedLabel: string;
  reducedMotion: boolean;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {linkedVisible ? (
        <motion.span
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: easing }}
          className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[var(--surface-container-high)] px-2.5 py-1 text-[0.65rem] font-medium text-[var(--primary)] shadow-sm sm:text-xs ${className}`}
        >
          <Check size={12} strokeWidth={3} />
          {linkedLabel}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}

function IndicatorRow({ indicators, className = "" }: { indicators: [string, string, string]; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[0.7rem] text-[var(--on-surface-variant)]/55 sm:text-xs ${className}`}>
      {indicators.map((label) => (
        <li key={label} className="inline-flex items-center gap-1.5">
          <span className="size-1 rounded-full bg-[var(--on-surface-variant)]" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

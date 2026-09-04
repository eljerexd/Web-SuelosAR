"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const easing = [0.22, 1, 0.36, 1] as const;

const noopSubscribe = () => () => {};
/** True only once the component has hydrated on the client — createPortal needs `document`, which doesn't exist during SSR. */
function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

interface ImageLightboxProps {
  /** Full-resolution source shown when expanded. */
  src: string;
  alt: string;
  /** The mockup/preview rendered as the clickable trigger. */
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a single demo screenshot/mockup so it can be opened full-size in an accessible,
 * on-brand lightbox. Intended only for individual app-screen previews (feature story panels,
 * the screenshot gallery, the soil-map example) — never for the home Hero's composite showcase.
 */
export function ImageLightbox({ src, alt, children, className = "" }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ampliar imagen: ${alt}`}
        className={`group relative block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] ${className}`}
      >
        {children}
        <span className="pointer-events-none absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-full bg-black/55 text-white opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
          <Maximize2 size={14} strokeWidth={2} />
        </span>
      </button>

      {mounted ? createPortal(
        <AnimatePresence>
          {open ? (
            <motion.div
              className="fixed inset-0 z-[100]"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22, ease: easing }}
            >
              <div className="absolute inset-0 bg-black/72 backdrop-blur-sm dark:bg-black/80" onClick={() => setOpen(false)} aria-hidden="true" />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar imagen ampliada"
                className="fixed right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container)] text-[var(--on-surface)] shadow-[var(--shadow-soft)] transition-colors hover:bg-[var(--surface-container-high)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:right-6 sm:top-6"
              >
                <X size={18} strokeWidth={2} />
              </button>

              <motion.div
                className="pointer-events-none relative flex h-full w-full items-center justify-center p-4 sm:p-10"
                initial={reducedMotion ? false : { scale: 0.94 }}
                animate={{ scale: 1 }}
                exit={reducedMotion ? { scale: 1 } : { scale: 0.96 }}
                transition={{ duration: reducedMotion ? 0 : 0.32, ease: easing }}
              >
                <span id={titleId} className="sr-only">{alt}</span>
                {/* eslint-disable-next-line @next/next/no-img-element -- the lightbox needs true intrinsic sizing to preserve each screenshot's own aspect ratio without pre-known dimensions */}
                <img src={src} alt={alt} className="pointer-events-auto h-auto max-h-full w-auto max-w-full rounded-2xl shadow-[var(--shadow-soft)]" />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      ) : null}
    </>
  );
}

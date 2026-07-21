"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

/** Accessible accordion row that can be reused as the FAQ grows. */
export function FaqItem({ question, answer, link }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const contentId = useId();

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 shadow-[var(--shadow-soft)] transition-[background-color,box-shadow] duration-300 hover:bg-[var(--surface-container-high)] hover:shadow-md">
      <h3>
        <button type="button" className="flex min-h-20 w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7" aria-expanded={open} aria-controls={contentId} onClick={() => setOpen((current) => !current)}>
          <span className="text-base font-semibold tracking-[-0.02em] text-[var(--on-surface)] sm:text-lg">{question}</span>
          <motion.span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--primary-container)] text-[var(--on-primary-container)]" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true">
            <ChevronDown size={18} strokeWidth={2} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div id={contentId} initial={reducedMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <p className="px-5 pb-6 pr-16 text-sm leading-6 text-[var(--on-surface-variant)] sm:px-7 sm:pb-7 sm:pr-20 sm:text-base sm:leading-7">
              {answer}
              {link ? (
                <>
                  {" "}
                  <a href={link.href} className="font-medium text-[var(--primary)] underline decoration-[var(--outline-variant)] underline-offset-4 transition-colors hover:decoration-[var(--primary)]">
                    {link.label}
                  </a>
                </>
              ) : null}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Languages } from "lucide-react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n/dictionaries";
import { useI18n } from "./i18n-provider";

export function LanguageSelector() {
  const { locale, dictionary, setLocale } = useI18n();
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = useId();

  const options: Array<{ value: Locale; label: string }> = [
    { value: "es-AR", label: dictionary.language.spanish },
    { value: "en", label: dictionary.language.english },
  ];
  const selectedIndex = options.findIndex((option) => option.value === locale);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);

    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => optionRefs.current[selectedIndex]?.focus());
    return () => cancelAnimationFrame(frame);
  }, [isOpen, selectedIndex]);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu({ restoreFocus = false } = {}) {
    setIsOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function selectLanguage(value: Locale) {
    setLocale(value);
    closeMenu({ restoreFocus: true });
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openMenu();
    }
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const focusedIndex = optionRefs.current.findIndex((option) => option === document.activeElement);

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key === "Tab") {
      closeMenu();
      return;
    }

    const targetIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? options.length - 1
          : event.key === "ArrowDown"
            ? (focusedIndex + 1) % options.length
            : event.key === "ArrowUp"
              ? (focusedIndex - 1 + options.length) % options.length
              : -1;

    if (targetIndex >= 0) {
      event.preventDefault();
      optionRefs.current[targetIndex]?.focus();
    }
  }

  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        aria-label={dictionary.language.selectorLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-3 text-sm font-medium text-[var(--on-surface-variant)] transition-[background-color,color,transform] duration-150 ease-out hover:-translate-y-px hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)] motion-reduce:transform-none motion-reduce:transition-none"
      >
        <Languages aria-hidden="true" size={18} />
        <span>{options[selectedIndex].label}</span>
        <ChevronDown
          aria-hidden="true"
          size={15}
          strokeWidth={2}
          className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={dictionary.language.selectorLabel}
            onKeyDown={handleMenuKeyDown}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-48 origin-top-right rounded-[22px] border border-[var(--outline-variant)]/70 bg-[var(--surface-container)] p-2.5 text-[var(--on-surface)] shadow-[0_14px_36px_rgb(47_104_66/0.16)] dark:shadow-[0_18px_40px_rgb(0_0_0/0.36)]"
          >
            <div className="flex flex-col gap-1.5">
              {options.map((option, index) => {
                const isSelected = option.value === locale;

                return (
                  <button
                    key={option.value}
                    ref={(element) => { optionRefs.current[index] = element; }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => selectLanguage(option.value)}
                    className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-3.5 py-2.5 text-left text-sm font-medium tracking-[-0.005em] transition-colors duration-200 hover:bg-[var(--primary-container)]/65 hover:text-[var(--on-primary-container)] focus-visible:bg-[var(--primary-container)]/65 focus-visible:text-[var(--on-primary-container)] ${
                      isSelected
                        ? "bg-[var(--primary-container)]/55 text-[var(--on-primary-container)]"
                        : "text-[var(--on-surface-variant)]"
                    }`}
                  >
                    <span>{option.label}</span>
                    <Check
                      aria-hidden="true"
                      size={17}
                      strokeWidth={2.2}
                      className={isSelected ? "opacity-100" : "opacity-0"}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

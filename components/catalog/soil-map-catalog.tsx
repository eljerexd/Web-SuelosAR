"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/components/i18n/i18n-provider";
import { provinces } from "@/lib/provinces";

const easing = [0.22, 1, 0.36, 1] as const;

export function SoilMapCatalog() {
  const reducedMotion = useReducedMotion();
  const { dictionary } = useI18n();
  const copy = dictionary.catalog;

  return (
    <main id="contenido" tabIndex={-1} className="outline-none">
      <section className="px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24" aria-labelledby="catalog-title">
        <div className="mx-auto w-full max-w-6xl">
          <motion.header
            className="mx-auto max-w-3xl text-center"
            initial={reducedMotion ? false : { opacity: 1, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: easing }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--on-surface-variant)]">{copy.eyebrow}</p>
            <h1 id="catalog-title" className="mt-4 text-4xl font-bold tracking-[-0.05em] text-[var(--on-surface)] sm:text-5xl lg:text-6xl">{copy.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8">{copy.description}</p>
          </motion.header>

          <div className="mt-12 grid gap-6 sm:mt-14 md:gap-8 lg:grid-cols-2">
            {provinces.map((province, index) => {
              const isAvailable = province.availability === "available";
              const isCenteredFinalCard = provinces.length % 2 === 1 && index === provinces.length - 1;
              const card = copy.cards[province.catalogKey];
              const maskImage = `url("${province.silhouetteSrc}")`;
              const maskStyle: React.CSSProperties = {
                maskImage,
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: "contain",
                WebkitMaskImage: maskImage,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                WebkitMaskSize: "contain",
              };

              const cardContent = (
                <>
                  <div className="grid h-[228px] shrink-0 place-items-center bg-[var(--surface-container-high)]/35 px-5 sm:h-[240px] sm:px-8 md:h-auto md:min-h-[280px] md:w-[36%] md:px-4 md:py-5 lg:px-5" aria-hidden="true">
                    <div className="relative h-full w-full max-w-[28rem]">
                      <span className="absolute inset-0 bg-[var(--primary)]" style={maskStyle} />
                      <span className="absolute inset-0 scale-[0.985] bg-[var(--primary-container)]" style={maskStyle} />
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-7 md:p-5 lg:p-6">
                    <h2 className="text-2xl font-bold tracking-[-0.035em] text-[var(--on-surface)] sm:text-3xl">{card.title}</h2>
                    <p className="mt-2.5 max-w-prose text-base leading-7 text-[var(--on-surface-variant)]">{card.description}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-5">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-[var(--on-surface-variant)]">
                        <span className={`size-2 rounded-full ${isAvailable ? "bg-[var(--primary)]" : "bg-[var(--status-preparation)]"}`} aria-hidden="true" />
                        {isAvailable ? copy.availableLabel : copy.preparationLabel}
                      </span>
                      {isAvailable && (
                        <span className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[var(--primary)] transition-[background-color,color] duration-200 group-hover:bg-[var(--primary-container)] group-hover:text-[var(--on-primary-container)]">
                          {copy.cardLinkLabel}
                          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.1} />
                        </span>
                      )}
                    </div>
                  </div>
                </>
              );

              return (
                <motion.article
                  key={province.slug}
                  initial={reducedMotion ? false : { opacity: 1, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : index * 0.08, ease: easing }}
                  whileHover={reducedMotion || !isAvailable ? undefined : { y: -4, transition: { duration: 0.2, ease: easing } }}
                  className={`overflow-hidden rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 shadow-[var(--shadow-soft)] transition-[box-shadow] duration-200 motion-reduce:transform-none motion-reduce:transition-none ${isAvailable ? "hover:shadow-[0_18px_44px_rgb(14_20_14/0.14)] dark:hover:shadow-[0_20px_48px_rgb(0_0_0/0.32)]" : ""} ${isCenteredFinalCard ? "lg:col-span-2 lg:w-[calc(50%_-_1rem)] lg:justify-self-center" : ""}`}
                >
                  {isAvailable ? (
                    <Link
                      href={province.path}
                      aria-label={`${card.title}. ${card.description} ${copy.availableLabel}. ${copy.cardLinkLabel}.`}
                      className="group flex h-full flex-col rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)] md:flex-row"
                    >
                      {cardContent}
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col rounded-[inherit] md:flex-row">
                      {cardContent}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/components/i18n/i18n-provider";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export type LegalPageKey = keyof Dictionary["legal"]["pages"];

export function LegalPage({ pageKey }: { pageKey: LegalPageKey }) {
  const { dictionary } = useI18n();
  const legal = dictionary.legal;
  const page = legal.pages[pageKey];

  return (
    <main id="contenido" tabIndex={-1} className="px-5 py-16 outline-none sm:px-8 sm:py-20 lg:py-24">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
        <header className="border-b border-[var(--outline-variant)] pb-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[var(--primary)] transition-colors duration-200 hover:bg-[var(--primary-container)] hover:text-[var(--on-primary-container)]">
            <ArrowLeft aria-hidden="true" size={18} /> {legal.backHome}
          </Link>
          <h1 className="mt-7 text-4xl font-bold tracking-[-0.05em] text-[var(--on-surface)] sm:text-5xl">{page.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg sm:leading-8">{page.intro}</p>
          <p className="mt-5 text-sm text-[var(--on-surface-variant)]">
            <span className="font-semibold text-[var(--on-surface)]">{legal.lastUpdated}:</span>{" "}
            <time dateTime="2026-07-15">{legal.updatedDate}</time>
          </p>
        </header>

        <div className="mt-9 space-y-9">
          {page.sections.map((section) => (
            <section key={section.heading} aria-labelledby={`${pageKey}-${section.heading.toLowerCase().replaceAll(" ", "-")}`}>
              <h2 id={`${pageKey}-${section.heading.toLowerCase().replaceAll(" ", "-")}`} className="text-xl font-semibold tracking-[-0.025em] text-[var(--on-surface)] sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7 text-[var(--on-surface-variant)]">{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

"use client";

import { ArrowLeft, MapPinOff } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/components/i18n/i18n-provider";

export default function NotFound() {
  const { dictionary } = useI18n();
  const copy = dictionary.notFound;

  return (
    <main id="contenido" tabIndex={-1} className="px-5 py-20 text-center outline-none sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto grid size-14 place-items-center rounded-[1.25rem] bg-[var(--primary-container)] text-[var(--on-primary-container)]">
          <MapPinOff aria-hidden="true" size={27} strokeWidth={1.8} />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">{copy.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-[var(--on-surface)] sm:text-5xl">{copy.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--on-surface-variant)] sm:text-lg">{copy.description}</p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--on-primary)] shadow-[0_8px_22px_rgb(47_104_66/0.13)] transition-[box-shadow,filter] duration-300 hover:brightness-105 hover:shadow-[0_12px_28px_rgb(47_104_66/0.18)]">
          <ArrowLeft aria-hidden="true" size={18} /> {copy.action}
        </Link>
      </div>
    </main>
  );
}

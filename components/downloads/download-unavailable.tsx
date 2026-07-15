"use client";

import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/components/i18n/i18n-provider";
import type { DownloadPlatform } from "@/lib/downloads";
import { siteConfig } from "@/lib/site";

export function DownloadUnavailable({ platform }: { platform: DownloadPlatform }) {
  const { dictionary } = useI18n();
  const copy = dictionary.downloadUnavailable;
  const platformName = platform === "android" ? copy.android : copy.windows;

  return (
    <main id="contenido" tabIndex={-1} className="px-5 py-20 outline-none sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--outline-variant)] bg-[var(--surface-container)] p-7 text-center shadow-[var(--shadow-soft)] sm:p-12">
        <div className="mx-auto grid size-14 place-items-center rounded-[1.25rem] bg-[var(--primary-container)] text-[var(--on-primary-container)]">
          <AlertCircle aria-hidden="true" size={27} strokeWidth={1.8} />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">{copy.eyebrow}</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-[-0.045em] text-[var(--on-surface)] sm:text-4xl">
          {copy.title.replace("{platform}", platformName)}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--on-surface-variant)]">{copy.description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--on-primary)] shadow-[0_8px_22px_rgb(47_104_66/0.13)] transition-[box-shadow,filter] duration-300 hover:brightness-105 hover:shadow-[0_12px_28px_rgb(47_104_66/0.18)]">
            <ArrowLeft aria-hidden="true" size={18} /> {copy.backHome}
          </Link>
          <a href={`mailto:${siteConfig.contactEmail}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--outline-variant)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--on-surface)] transition-colors duration-200 hover:bg-[var(--surface-container-high)]">
            <Mail aria-hidden="true" size={18} /> {copy.contact}
          </a>
        </div>
      </div>
    </main>
  );
}

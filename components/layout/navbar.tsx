"use client";

import Image from "next/image";
import Link from "next/link";

import { LanguageSelector } from "@/components/i18n/language-selector";
import { useI18n } from "@/components/i18n/i18n-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
  const { dictionary } = useI18n();

  return (
    <header className="relative z-20 w-full border-b border-[var(--outline-variant)]/65 bg-[var(--surface)]/72 backdrop-blur-sm" aria-label={dictionary.accessibility.siteHeader}>
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8" aria-label={dictionary.accessibility.mainNavigation}>
        <Link href="/" className="inline-flex items-center gap-4 rounded-2xl text-base font-semibold tracking-[-0.01em] text-[var(--on-surface)]" aria-label={dictionary.accessibility.homeLink}>
          <Image
            src="/icon.png"
            alt=""
            width={30}
            height={30}
            sizes="30px"
            className="size-[30px] shrink-0 object-contain"
            priority
          />
          <span>{dictionary.brand.name}</span>
        </Link>
        <div className="flex items-center gap-1">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

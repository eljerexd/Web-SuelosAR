"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LanguageSelector } from "@/components/i18n/language-selector";
import { useI18n } from "@/components/i18n/i18n-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import brandIcon from "@/public/icons/icon-512.png";

export function Navbar() {
  const { dictionary } = useI18n();
  const pathname = usePathname();
  const isCatalogPage = pathname === "/mapas-de-suelos";
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledStateRef = useRef(false);

  useEffect(() => {
    const updateScrolledState = () => {
      const nextScrolledState = window.scrollY > 12;
      if (nextScrolledState === scrolledStateRef.current) return;

      scrolledStateRef.current = nextScrolledState;
      setIsScrolled(nextScrolledState);
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <header className={`sticky top-0 z-20 w-full border-b border-[var(--outline-variant)]/65 bg-[var(--surface)]/72 px-5 max-[359px]:px-3 transition-[box-shadow,backdrop-filter] duration-150 ease-out sm:px-8 xl:px-10 2xl:px-12 ${isScrolled ? "backdrop-blur-md shadow-[0_8px_24px_rgb(14_20_14/0.06)] dark:shadow-[0_8px_26px_rgb(0_0_0/0.16)]" : "backdrop-blur-sm shadow-none"}`} aria-label={dictionary.accessibility.siteHeader}>
      <nav className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-center sm:flex sm:justify-between xl:max-w-none" aria-label={dictionary.accessibility.mainNavigation}>
        <Link href="/" className="col-start-1 row-start-1 inline-flex h-20 items-center gap-4 rounded-2xl text-base font-semibold tracking-[-0.01em] text-[var(--on-surface)] transition-[opacity,transform] duration-150 ease-out hover:-translate-y-px hover:opacity-90 motion-reduce:transform-none motion-reduce:transition-none" aria-label={dictionary.accessibility.homeLink}>
          <Image
            src={brandIcon}
            alt="SuelosAR"
            width={36}
            height={36}
            sizes="36px"
            className="size-9 shrink-0 object-contain"
            priority
          />
          <span>{dictionary.brand.name}</span>
        </Link>
        {/* One semantic link moves into a compact second row on mobile and sits in the desktop primary nav. */}
        <Link
          href="/mapas-de-suelos"
          aria-current={isCatalogPage ? "page" : undefined}
          className={`col-span-2 row-start-2 flex w-fit min-h-11 -translate-y-1 items-center justify-center justify-self-center rounded-full border-t border-[var(--outline-variant)]/50 px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:col-span-1 sm:row-start-auto sm:translate-y-0 sm:justify-self-auto sm:w-auto sm:border-0 ${isCatalogPage ? "bg-[var(--primary-container)]/55 text-[var(--on-primary-container)] hover:bg-[var(--primary-container)]/65" : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] hover:text-[var(--on-surface)]"}`}
        >
          {dictionary.navigation.maps}
        </Link>
        <div className="col-start-2 row-start-1 flex items-center gap-1">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

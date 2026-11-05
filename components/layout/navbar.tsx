"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LanguageSelector } from "@/components/i18n/language-selector";
import { useI18n } from "@/components/i18n/i18n-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { trackCatalogNavigationClick } from "@/lib/analytics";
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
        <div className="contents sm:flex sm:items-center sm:gap-3">
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
          <Link
            href="/mapas-de-suelos"
            onClick={() => trackCatalogNavigationClick("navbar")}
            aria-current={isCatalogPage ? "page" : undefined}
            className={`group col-span-2 row-start-2 flex w-fit min-h-11 -translate-y-1 cursor-pointer items-center justify-center justify-self-center rounded-md px-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:col-span-1 sm:relative sm:before:absolute sm:before:left-0 sm:before:top-1/2 sm:before:h-5 sm:before:w-px sm:before:-translate-y-1/2 sm:before:bg-[var(--outline-variant)]/65 sm:before:content-[''] sm:row-start-auto sm:translate-y-0 sm:justify-self-auto ${isCatalogPage ? "text-[var(--primary)]" : "text-[var(--on-surface)]/85 hover:text-[var(--primary)]"}`}
          >
            <span className={`relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[var(--primary)] after:transition-transform after:duration-200 after:ease-out motion-reduce:after:transition-none ${isCatalogPage ? "after:scale-x-100" : "after:origin-left after:scale-x-0 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100"}`}>
              {dictionary.navigation.maps}
            </span>
          </Link>
        </div>
        <div className="col-start-2 row-start-1 flex items-center gap-1">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

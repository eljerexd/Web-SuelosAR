import Link from "next/link";

import { BrandMark } from "@/components/brand/brand-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/site";

export function Navbar() {
  return (
    <header className="relative z-20 w-full" aria-label="Encabezado del sitio">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Navegación principal">
        <Link href="/" className="inline-flex items-center gap-3 rounded-2xl text-base font-semibold tracking-[-0.01em] text-[var(--on-surface)]" aria-label="SuelosAR, inicio">
          <BrandMark compact />
          <span>{siteConfig.name}</span>
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}

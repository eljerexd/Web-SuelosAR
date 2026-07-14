import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="w-full" aria-label="Pie de página">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-center px-5 text-center text-sm text-[var(--on-surface-variant)] sm:px-8">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
      </div>
    </footer>
  );
}

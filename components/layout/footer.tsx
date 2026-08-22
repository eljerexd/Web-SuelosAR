"use client";

import { Code2, Mail, Map } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useI18n } from "@/components/i18n/i18n-provider";
import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/lib/site";
import { socialLinks } from "@/lib/social";

export function Footer() {
  const { dictionary } = useI18n();
  const pathname = usePathname();

  const resolveQuickLink = (href: string) => pathname === "/" ? href : `/${href}`;

  return (
    <footer className="w-full border-t border-[var(--outline-variant)] bg-[var(--surface-container)]/45" aria-label={dictionary.accessibility.footer}>
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr] lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-3 text-lg font-semibold tracking-[-0.02em] text-[var(--on-surface)]">
              <Image src="/icon.png" alt="" width={36} height={36} sizes="36px" className="size-9 shrink-0 object-contain" />
              <span>{dictionary.brand.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--on-surface-variant)]">{dictionary.footer.description}</p>
          </div>

          <nav aria-label={dictionary.footer.quickLinksTitle}>
            <h2 className="text-sm font-semibold text-[var(--on-surface)]">{dictionary.footer.quickLinksTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--on-surface-variant)]">
              {dictionary.footer.quickLinks.map((link) => <li key={link.href}><a className="rounded-md transition-colors hover:text-[var(--primary)]" href={resolveQuickLink(link.href)}>{link.label}</a></li>)}
            </ul>
          </nav>

          <div id="legal">
            <h2 className="text-sm font-semibold text-[var(--on-surface)]">{dictionary.footer.legalTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--on-surface-variant)]">
              {dictionary.footer.legalItems.map((item) => (
                <li key={item.label}>
                  <a className="rounded-md transition-colors hover:text-[var(--primary)]" href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[var(--on-surface)]">{dictionary.footer.contactTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--on-surface-variant)]">
              <li><a className="inline-flex items-center gap-2 rounded-md transition-colors hover:text-[var(--primary)]" href={siteConfig.githubUrl} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" size={17} /><span>{dictionary.footer.github}</span></a></li>
              <li><a className="inline-flex items-center gap-2 rounded-md transition-colors hover:text-[var(--primary)]" href={`mailto:${siteConfig.contactEmail}`}><Mail aria-hidden="true" size={17} /><span>{dictionary.footer.email}</span></a></li>
            </ul>
          </div>
        </div>

        <div id="data-sources" className="mt-12 grid gap-5 rounded-[1.5rem] border border-[var(--outline-variant)] bg-[var(--surface-container)]/72 p-5 sm:p-6 lg:grid-cols-[auto_1fr] lg:gap-6">
          <div className="grid size-11 place-items-center rounded-2xl bg-[var(--primary-container)] text-[var(--on-primary-container)]"><Map aria-hidden="true" size={21} strokeWidth={1.8} /></div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--on-surface)]">{dictionary.footer.dataSourcesTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--on-surface-variant)]">
              <a className="rounded-md transition-colors hover:text-[var(--primary)]" href="/data-sources">{dictionary.footer.dataSource}</a>
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--on-surface-variant)]">{dictionary.footer.disclaimer}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--on-surface-variant)]"><span className="font-semibold text-[var(--on-surface)]">{dictionary.footer.coverageLabel}:</span> {dictionary.footer.coverage} {dictionary.footer.futureCoverage}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--outline-variant)] pt-6 text-sm text-[var(--on-surface-variant)] sm:flex-row sm:items-center sm:justify-between">
          <p>{dictionary.footer.copyright}</p>
          <ul className="flex items-center gap-4">
            <li>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label={dictionary.footer.social.youtube} title={dictionary.footer.social.youtube} className="inline-flex text-[var(--on-surface-variant)] transition-colors hover:text-[var(--primary)]">
                <YoutubeIcon width={17} height={17} />
              </a>
            </li>
            <li>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label={dictionary.footer.social.tiktok} title={dictionary.footer.social.tiktok} className="inline-flex text-[var(--on-surface-variant)] transition-colors hover:text-[var(--primary)]">
                <TiktokIcon width={17} height={17} />
              </a>
            </li>
            <li>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label={dictionary.footer.social.instagram} title={dictionary.footer.social.instagram} className="inline-flex text-[var(--on-surface-variant)] transition-colors hover:text-[var(--primary)]">
                <InstagramIcon width={17} height={17} />
              </a>
            </li>
            <li>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label={dictionary.footer.social.facebook} title={dictionary.footer.social.facebook} className="inline-flex text-[var(--on-surface-variant)] transition-colors hover:text-[var(--primary)]">
                <FacebookIcon width={17} height={17} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

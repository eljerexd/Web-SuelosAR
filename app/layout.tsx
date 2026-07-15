import type { Metadata, Viewport } from "next";

import { I18nProvider } from "@/components/i18n/i18n-provider";
import { SkipLink } from "@/components/i18n/skip-link";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { defaultLocale, dictionaries } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const defaultDictionary = dictionaries[defaultLocale];

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: defaultDictionary.meta.title,
    template: "%s | SuelosAR",
  },

  description: defaultDictionary.meta.description,

  applicationName: "SuelosAR",

  keywords: [
    "SuelosAR",
    "suelos de Buenos Aires",
    "INTA",
    "Android",
    "Windows",
    "cartografía de suelos",
    "GIS",
    "mapas de suelos",
    "agronomía",
  ],

  authors: [{ name: "SuelosAR" }],
  creator: "SuelosAR",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "256x256" }],
    shortcut: "/icon.png",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },

  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "SuelosAR",
    title: defaultDictionary.meta.title,
    description: defaultDictionary.meta.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SuelosAR — cartografía digital de suelos" }],
  },

  twitter: {
    card: "summary_large_image",
    title: defaultDictionary.meta.title,
    description: defaultDictionary.meta.description,
    images: ["/opengraph-image"],
  },

  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8faf5" },
    { media: "(prefers-color-scheme: dark)", color: "#10140f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("suelosar-theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <I18nProvider>
          <ThemeProvider>
            <SkipLink />
            <div className="site-shell">
              <Navbar />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

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
  authors: [{ name: "SuelosAR" }],
  creator: "SuelosAR",
  publisher: "SuelosAR",
  verification: {
    google: "IWmswU9kU0hLrcM3uDjO4uBnj_v65zD5CfaPV5kz-Mo",
  },
  category: "GIS Application",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "SuelosAR",
    title: defaultDictionary.meta.title,
    description: defaultDictionary.meta.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SuelosAR, mapas de suelos y herramientas GIS para la Provincia de Buenos Aires" }],
  },

  twitter: {
    card: "summary_large_image",
    title: defaultDictionary.meta.title,
    description: defaultDictionary.meta.description,
    images: [{ url: "/opengraph-image", alt: "SuelosAR, mapas de suelos y herramientas GIS para la Provincia de Buenos Aires" }],
  },

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

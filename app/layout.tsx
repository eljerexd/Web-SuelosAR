import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://suelosar.app"),
  title: { default: "SuelosAR | Conocé el suelo argentino", template: "%s | SuelosAR" },
  description: "SuelosAR es una aplicación Android para descubrir y comprender los suelos de Argentina.",
  applicationName: "SuelosAR",
  keywords: ["SuelosAR", "suelos de Argentina", "Android", "ciencia del suelo"],
  authors: [{ name: "SuelosAR" }],
  creator: "SuelosAR",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "SuelosAR",
    title: "SuelosAR | Conocé el suelo argentino",
    description: "Una aplicación Android para descubrir y comprender los suelos de Argentina.",
  },
  twitter: {
    card: "summary",
    title: "SuelosAR | Conocé el suelo argentino",
    description: "Una aplicación Android para descubrir y comprender los suelos de Argentina.",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
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
    <html lang="es-AR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#contenido">Saltar al contenido</a>
          <div className="site-shell">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

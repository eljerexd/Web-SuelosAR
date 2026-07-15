import type { Metadata } from "next";

import { DownloadUnavailable } from "@/components/downloads/download-unavailable";
import type { DownloadPlatform } from "@/lib/downloads";

export const metadata: Metadata = {
  title: "Descarga no disponible",
  robots: { index: false, follow: false },
};

export default async function DownloadUnavailablePage({ searchParams }: { searchParams: Promise<{ platform?: string }> }) {
  const { platform } = await searchParams;
  const normalizedPlatform: DownloadPlatform = platform === "windows" ? "windows" : "android";
  return <DownloadUnavailable platform={normalizedPlatform} />;
}

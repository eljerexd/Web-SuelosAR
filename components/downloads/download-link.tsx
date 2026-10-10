"use client";

import { motion, type MotionProps } from "framer-motion";
import { PanelsTopLeft } from "lucide-react";

import { GooglePlayIcon } from "@/components/ui/platform-icon";
import { ANDROID_DOWNLOAD_URL, WINDOWS_DOWNLOAD_URL, type DownloadPlatform } from "@/lib/downloads";

interface DownloadLinkProps {
  platform: DownloadPlatform;
  label: string;
  className: string;
  whileHover?: MotionProps["whileHover"];
  whileTap?: MotionProps["whileTap"];
}

const standardDownloadUrls: Record<DownloadPlatform, string> = {
  android: ANDROID_DOWNLOAD_URL,
  windows: WINDOWS_DOWNLOAD_URL,
};

/** Shared standard destinations: Google Play for Android and the release resolver for Windows. */
export function DownloadLink({ platform, label, className, whileHover, whileTap }: DownloadLinkProps) {
  return (
    <motion.a
      href={standardDownloadUrls[platform]}
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      aria-label={label}
    >
      {platform === "android" ? <GooglePlayIcon size={18} /> : <PanelsTopLeft aria-hidden="true" size={18} />}
      {label}
    </motion.a>
  );
}

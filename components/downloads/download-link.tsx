"use client";

import { motion, type MotionProps } from "framer-motion";
import { PanelsTopLeft, Smartphone } from "lucide-react";

import { downloads, type DownloadPlatform } from "@/lib/downloads";

interface DownloadLinkProps {
  platform: DownloadPlatform;
  label: string;
  className: string;
  whileHover?: MotionProps["whileHover"];
  whileTap?: MotionProps["whileTap"];
}

const platformIcons = {
  android: Smartphone,
  windows: PanelsTopLeft,
} as const;

/** Every download CTA points to the same server-side canonical resolver. */
export function DownloadLink({ platform, label, className, whileHover, whileTap }: DownloadLinkProps) {
  const PlatformIcon = platformIcons[platform];

  return (
    <motion.a
      href={downloads[platform].route}
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      aria-label={label}
    >
      <PlatformIcon aria-hidden="true" size={18} />
      {label}
    </motion.a>
  );
}

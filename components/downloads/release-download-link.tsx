"use client";

import { motion, type MotionProps } from "framer-motion";
import { CircleAlert, LoaderCircle, PanelsTopLeft, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

import {
  downloads,
  getLatestReleaseAssets,
  type DownloadPlatform,
} from "@/lib/downloads";

type ReleaseStatus = "loading" | "ready" | "fallback";

interface ReleaseDownloadLinkProps {
  platform: DownloadPlatform;
  label: string;
  loadingMessage: string;
  fallbackMessage: string;
  className: string;
  whileHover?: MotionProps["whileHover"];
  whileTap?: MotionProps["whileTap"];
}

const platformIcons = {
  android: Smartphone,
  windows: PanelsTopLeft,
} as const;

/** Reusable release link used by every CTA while preserving each section's styling. */
export function ReleaseDownloadLink({
  platform,
  label,
  loadingMessage,
  fallbackMessage,
  className,
  whileHover,
  whileTap,
}: ReleaseDownloadLinkProps) {
  const [state, setState] = useState<{ status: ReleaseStatus; url: string | null }>({
    status: "loading",
    url: null,
  });
  const PlatformIcon = platformIcons[platform];

  useEffect(() => {
    let active = true;

    getLatestReleaseAssets()
      .then((assets) => {
        if (!active) return;
        const url = assets[platform];
        setState({ status: url ? "ready" : "fallback", url });
      })
      .catch(() => {
        if (active) setState({ status: "fallback", url: null });
      });

    return () => {
      active = false;
    };
  }, [platform]);

  const isLoading = state.status === "loading";
  const usesFallback = state.status === "fallback";
  const statusMessage = isLoading ? loadingMessage : usesFallback ? fallbackMessage : undefined;

  return (
    <motion.a
      href={state.url ?? downloads[platform].route}
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      aria-busy={isLoading}
      aria-label={statusMessage ? `${label}. ${statusMessage}` : label}
      title={usesFallback ? fallbackMessage : undefined}
      data-release-status={state.status}
    >
      <PlatformIcon aria-hidden="true" size={18} />
      {label}
      {isLoading ? <LoaderCircle aria-hidden="true" size={15} className="motion-safe:animate-spin" /> : null}
      {usesFallback ? <CircleAlert aria-hidden="true" size={15} /> : null}
    </motion.a>
  );
}

"use client";

import { DeviceShowcase } from "@/components/ui/device-showcase";

interface HeroDeviceShowcaseProps {
  androidAlt: string;
  windowsAlt: string;
  androidLabel: string;
  windowsLabel: string;
}

/** Layered cross-platform product showcase used by the landing-page Hero. */
export function HeroDeviceShowcase({ androidAlt, windowsAlt, androidLabel, windowsLabel }: HeroDeviceShowcaseProps) {
  return (
    <DeviceShowcase
      laptopScreenSrc="/images/screenshots/hero-windows.png"
      laptopScreenAlt={windowsAlt}
      laptopLabel={windowsLabel}
      phoneScreenSrc="/images/screenshots/hero-android.png"
      phoneScreenAlt={androidAlt}
      phoneLabel={androidLabel}
      className="hero-device-showcase mx-auto lg:justify-self-center"
      priority
      interactive
      stackOnMobile
      backdrop={
        <>
        <div className="pointer-events-none absolute -right-[4%] top-[1%] hidden h-[92%] w-[106%] rounded-[50%] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.074] blur-[74px] sm:block dark:opacity-[0.048]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-[5%] top-0 hidden h-[94%] w-[108%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,transparent_52%,var(--surface)_100%)] opacity-[0.2] sm:block" aria-hidden="true" />
        </>
      }
    />
  );
}

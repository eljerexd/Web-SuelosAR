"use client";

import { DeviceMockup } from "@/components/ui/device-mockup";
import { LaptopMockup } from "@/components/ui/laptop-mockup";

interface HeroDeviceShowcaseProps {
  androidAlt: string;
  windowsAlt: string;
  androidLabel: string;
  windowsLabel: string;
}

/** Layered cross-platform product showcase used by the landing-page Hero. */
export function HeroDeviceShowcase({ androidAlt, windowsAlt, androidLabel, windowsLabel }: HeroDeviceShowcaseProps) {
  return (
    <div className="group relative mx-auto flex w-full max-w-[44rem] transform-gpu flex-col items-center transition-transform duration-200 ease-out [backface-visibility:hidden] hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:block sm:min-h-[31rem] lg:min-h-[38rem] lg:w-[116%] lg:max-w-none lg:justify-self-end xl:w-[118%]">
      <div className="pointer-events-none absolute -right-[4%] top-[1%] hidden h-[92%] w-[106%] rounded-[50%] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.074] blur-[74px] sm:block dark:opacity-[0.048]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-[5%] top-0 hidden h-[94%] w-[108%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,transparent_52%,var(--surface)_100%)] opacity-[0.2] sm:block" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-[8%] bottom-[4%] h-[18%] rounded-[50%] bg-black/20 opacity-0 blur-3xl transition-opacity duration-200 ease-out group-hover:opacity-[0.22] motion-reduce:transition-none dark:bg-black/35" aria-hidden="true" />

      <div className="relative z-20 mx-auto w-[11rem] sm:absolute sm:-left-[2%] sm:top-[5%] sm:w-[12rem] lg:-left-[7%] lg:top-[18%] lg:w-[12rem] xl:-left-[9%] xl:w-[13.25rem]">
        <div>
          <DeviceMockup screenSrc="/images/screenshots/hero-android.png" screenAlt={androidAlt} deviceLabel={androidLabel} screenFit="contain" className="w-full" priority />
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-10 w-full max-w-[38rem] sm:absolute sm:-right-[2%] sm:top-[5.25rem] sm:mt-0 sm:w-[98%] sm:max-w-none lg:-right-[4%] lg:top-[7%] lg:w-[104%]">
        <div>
          <LaptopMockup screenSrc="/images/screenshots/hero-windows.png" screenAlt={windowsAlt} deviceLabel={windowsLabel} className="w-full" priority />
        </div>
      </div>
    </div>
  );
}

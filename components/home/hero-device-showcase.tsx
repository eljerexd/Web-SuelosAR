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
    <div className="hero-device-showcase group relative mx-auto w-full max-w-[44rem] transform-gpu transition-transform duration-200 ease-out [backface-visibility:hidden] hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none lg:w-[116%] lg:max-w-none lg:justify-self-center xl:w-[118%]">
      <div className="hero-device-composition relative flex flex-col items-center sm:block sm:min-h-[31rem] lg:min-h-[38rem] lg:origin-center">
        <div className="pointer-events-none absolute -right-[4%] top-[1%] hidden h-[92%] w-[106%] rounded-[50%] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.074] blur-[74px] sm:block dark:opacity-[0.048]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-[5%] top-0 hidden h-[94%] w-[108%] rounded-[46%] bg-[radial-gradient(ellipse_at_center,transparent_52%,var(--surface)_100%)] opacity-[0.2] sm:block" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-[8%] bottom-[4%] h-[18%] rounded-[50%] bg-black/20 opacity-0 blur-3xl transition-opacity duration-200 ease-out group-hover:opacity-[0.22] motion-reduce:transition-none dark:bg-black/35" aria-hidden="true" />

        <div className="relative z-20 mx-auto w-[11rem] sm:absolute sm:-left-[4%] sm:top-[15%] sm:w-[10.75rem] md:-left-[8%] md:top-[17%] md:w-[11.5rem] lg:-left-[25%] lg:top-[calc(24%+3rem)] lg:w-[11.25rem] xl:-left-[26%] xl:top-[calc(26%+3rem)] xl:w-[12.375rem]">
          <div>
            <DeviceMockup screenSrc="/images/screenshots/hero-android.png" screenAlt={androidAlt} deviceLabel={androidLabel} screenFit="contain" className="w-full" priority />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-[38rem] sm:absolute sm:-right-[4%] sm:top-[5.25rem] sm:mt-0 sm:w-[104%] sm:max-w-none md:-right-[6%] md:w-[108%] lg:-right-[12%] lg:top-[7%] lg:w-[116%] xl:-right-[14%] xl:w-[119%]">
          <div>
            <LaptopMockup screenSrc="/images/screenshots/hero-windows.png" screenAlt={windowsAlt} deviceLabel={windowsLabel} className="w-full" priority />
          </div>
        </div>
      </div>
    </div>
  );
}

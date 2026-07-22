import type { ReactNode } from "react";

import { DeviceMockup } from "@/components/ui/device-mockup";
import { LaptopMockup } from "@/components/ui/laptop-mockup";

interface DeviceShowcaseProps {
  laptopScreenSrc: string;
  laptopScreenAlt: string;
  laptopLabel: string;
  phoneScreenSrc: string;
  phoneScreenAlt: string;
  phoneLabel: string;
  className?: string;
  priority?: boolean;
  interactive?: boolean;
  stackOnMobile?: boolean;
  laptopScreenContent?: ReactNode;
  backdrop?: ReactNode;
}

/**
 * Canonical laptop-and-phone presentation used by the Hero and Product Tour.
 * Keeping scale, overlap and responsive behavior here prevents both sections
 * from drifting apart as their screenshots change.
 */
export function DeviceShowcase({
  laptopScreenSrc,
  laptopScreenAlt,
  laptopLabel,
  phoneScreenSrc,
  phoneScreenAlt,
  phoneLabel,
  className = "",
  priority = false,
  interactive = false,
  stackOnMobile = false,
  laptopScreenContent,
  backdrop,
}: DeviceShowcaseProps) {
  const stageLayout = stackOnMobile
    ? "relative w-full sm:left-1/2 sm:aspect-[1.72] sm:w-[108%] sm:-translate-x-1/2"
    : "relative left-1/2 aspect-[1.72] w-[108%] -translate-x-1/2";
  const interaction = interactive
    ? "transform-gpu transition-transform duration-200 ease-out [backface-visibility:hidden] hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
    : "";
  const floorShadow = interactive
    ? "opacity-0 group-hover:opacity-[0.22]"
    : "opacity-[0.22]";

  return (
    <div className={`device-showcase group relative w-full ${interaction} ${className}`}>
      <div className={`${stageLayout} flex flex-col items-center gap-10 sm:block`}>
        {backdrop}
        <div className={`pointer-events-none absolute inset-x-[7%] bottom-[4%] h-[18%] rounded-[50%] bg-black/20 blur-3xl transition-opacity duration-200 ease-out motion-reduce:transition-none dark:bg-black/35 ${floorShadow}`} aria-hidden="true" />

        <div className="relative z-20 mx-auto w-[11rem] sm:absolute sm:-bottom-[6%] sm:-left-[13%] sm:w-[23%]">
          <DeviceMockup
            screenSrc={phoneScreenSrc}
            screenAlt={phoneScreenAlt}
            deviceLabel={phoneLabel}
            screenFit="cover"
            sizes="(max-width: 639px) 176px, (max-width: 1279px) 184px, 198px"
            className="w-full"
            priority={priority}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[38rem] sm:absolute sm:inset-0 sm:flex sm:max-w-none sm:items-center">
          <div className="w-full">
            <LaptopMockup
              screenSrc={laptopScreenSrc}
              screenAlt={laptopScreenAlt}
              deviceLabel={laptopLabel}
              className="w-full"
              priority={priority}
              screenContent={laptopScreenContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

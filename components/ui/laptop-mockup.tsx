import Image from "next/image";
import type { ReactNode } from "react";

interface LaptopMockupProps {
  screenSrc: string;
  screenAlt: string;
  deviceLabel: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  screenContent?: ReactNode;
}

export const LAPTOP_SCREEN_SIZES = "(max-width: 639px) 92vw, (max-width: 1023px) 72vw, 52vw";

/** Reusable premium laptop frame for wide desktop application captures. */
export function LaptopMockup({ screenSrc, screenAlt, deviceLabel, className = "", priority = false, sizes = LAPTOP_SCREEN_SIZES, screenContent }: LaptopMockupProps) {
  return (
    <figure className={`relative pb-[1.65%] ${className}`} aria-label={deviceLabel}>
      <div className="relative left-1/2 w-[106%] -translate-x-1/2 overflow-hidden rounded-[1.15rem] border border-white/15 bg-gradient-to-br from-[#343934] via-[#111411] to-[#050605] p-[0.14rem] shadow-[0_36px_90px_rgb(14_20_14/0.24),0_12px_28px_rgb(14_20_14/0.16),inset_0_1px_0_rgb(255_255_255/0.16)] dark:border-white/10 dark:shadow-[0_40px_100px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.12)]">
        <div className="relative aspect-[1919/1079] w-full overflow-hidden rounded-[1.01rem] bg-black ring-1 ring-inset ring-black/90">
          <div className="absolute inset-0 overflow-hidden rounded-[1.01rem] bg-black [&_img]:object-cover [&_img]:object-left">
            {screenContent ?? <Image src={screenSrc} alt={screenAlt} fill priority={priority} sizes={sizes} />}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.025)_19%,transparent_35%,transparent_76%,rgba(255,255,255,0.025)_100%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.07]" aria-hidden="true" />
        </div>
      </div>
      <div className="absolute bottom-[1.4%] left-1/2 h-[4.2%] w-[108%] -translate-x-1/2 rounded-b-[55%] rounded-t-[0.35rem] border-t border-white/20 bg-gradient-to-b from-[#6d736d] via-[#303530] to-[#151815] shadow-[0_15px_28px_rgb(12_16_12/0.22)]" aria-hidden="true">
        <div className="mx-auto h-[45%] w-[15%] rounded-b-full bg-black/25" />
      </div>
      <div className="absolute bottom-0 left-[4%] h-[1.2%] w-[92%] rounded-[50%] bg-black/25 blur-sm" aria-hidden="true" />
    </figure>
  );
}

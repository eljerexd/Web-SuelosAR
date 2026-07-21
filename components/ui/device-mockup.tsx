import Image from "next/image";

interface DeviceMockupProps {
  screenSrc: string;
  screenAlt: string;
  deviceLabel: string;
  screenPosition?: string;
  screenFit?: "cover" | "contain";
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/** Reusable Android frame for product screenshots across the site. */
export function DeviceMockup({
  screenSrc,
  screenAlt,
  deviceLabel,
  screenPosition = "center top",
  screenFit = "cover",
  sizes = "(max-width: 639px) 248px, 288px",
  className = "",
  priority = false,
}: DeviceMockupProps) {
  return (
    <figure className={`relative aspect-[9/19] ${className}`} aria-label={deviceLabel}>
      <div className="absolute -left-[0.16rem] top-[22%] h-[12%] w-[0.18rem] rounded-l-full bg-gradient-to-b from-[#444944] via-[#171a17] to-[#050605] shadow-sm" aria-hidden="true" />
      <div className="absolute -right-[0.17rem] top-[18%] h-[8%] w-[0.2rem] rounded-r-full bg-gradient-to-b from-[#444944] via-[#171a17] to-[#050605] shadow-sm" aria-hidden="true" />
      <div className="absolute -right-[0.17rem] top-[29%] h-[13%] w-[0.2rem] rounded-r-full bg-gradient-to-b from-[#444944] via-[#171a17] to-[#050605] shadow-sm" aria-hidden="true" />

      <div className="relative h-full w-full overflow-hidden rounded-[2.9rem] border border-white/20 bg-gradient-to-br from-[#353a35] via-[#0b0d0b] to-black p-[0.28rem] shadow-[0_40px_90px_rgb(16_20_15/0.24),0_12px_30px_rgb(16_20_15/0.16),inset_0_1px_0_rgb(255_255_255/0.18)] dark:border-white/10 dark:shadow-[0_42px_100px_rgb(0_0_0/0.5),inset_0_1px_0_rgb(255_255_255/0.12)]">
        <div className="relative h-full overflow-hidden rounded-[2.62rem] bg-black p-[0.14rem]">
          <div className="relative h-full overflow-hidden rounded-[2.48rem] bg-black">
            <Image
              src={screenSrc}
              alt={screenAlt}
              fill
              priority={priority}
              sizes={sizes}
              style={{ objectFit: screenFit, objectPosition: screenPosition }}
            />
            <div className="pointer-events-none absolute left-1/2 top-[0.62rem] z-20 size-[0.66rem] -translate-x-1/2 rounded-full border border-white/10 bg-[#050605] shadow-[0_0_0_1px_rgb(0_0_0/0.85),inset_0_0_3px_rgb(61_87_70/0.55)]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 z-10 rounded-[2.48rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.055)_14%,transparent_31%,transparent_70%,rgba(255,255,255,0.035)_100%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-[18%] -top-[4%] z-10 h-[64%] w-[56%] rotate-[8deg] bg-gradient-to-r from-white/[0.09] to-transparent blur-[1px]" aria-hidden="true" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-[0.16rem] rounded-[2.7rem] ring-1 ring-inset ring-white/[0.08]" aria-hidden="true" />
      </div>
    </figure>
  );
}

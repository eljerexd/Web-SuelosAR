import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Content shape a provincial soil-map landing needs. Each province's actual copy lives in its own
 * key inside the i18n dictionary (see `dictionaryKey` below) so the page stays translatable through
 * `useI18n()` — this type only describes the shape, never the content itself.
 */
export type ProvinceSoilMapContent = Dictionary["soilMap"];

interface ProvinceCatalogBase {
  /** URL-safe identifier, e.g. "buenos-aires". */
  slug: string;
  /** Key for this province's translated catalog card copy. */
  catalogKey: keyof Dictionary["catalog"]["cards"];
  /** Verified vector boundary asset used for the catalog silhouette. */
  silhouetteSrc: string;
}

/** A province with a published soil-map landing page. */
export interface ProvinceConfig extends ProvinceCatalogBase {
  availability: "available";
  /** Route this province's landing is served at. */
  path: string;
  /** Key into the i18n dictionary holding this province's `ProvinceSoilMapContent`. */
  dictionaryKey: "soilMap" | "soilMapSantaFe";
  /** Main product screenshot, used as the large showcase image in the page's second section (and as the only screenshot on landings without a hero background). */
  imageSrc: string;
  /** Whether the hero also shows a background screenshot above the download buttons. Opt-in per province so existing landings render unchanged. */
  heroScreenshot?: boolean;
  /** Background image for the hero when `heroScreenshot` is true. Falls back to `imageSrc` when omitted. */
  heroImageSrc?: string;
  /**
   * Tailwind classes controlling the hero background image's crop and opacity (object-position +
   * opacity per breakpoint/theme). Each source photo has its own brightness and composition, so this
   * isn't shared — it overrides the default tuned for Santa Fe's image when provided.
   */
  heroImageClassName?: string;
}

/** A visible catalog entry that must not link anywhere until its landing page is published. */
export interface UpcomingProvinceConfig extends ProvinceCatalogBase {
  availability: "coming-soon";
}

export type ProvinceCatalogConfig = ProvinceConfig | UpcomingProvinceConfig;

export const defaultHeroImageClassName = "object-cover object-center opacity-[0.62] dark:opacity-[0.5] sm:opacity-[0.42] dark:sm:opacity-[0.34]";

export const buenosAiresProvince: ProvinceConfig = {
  slug: "buenos-aires",
  path: "/mapa-suelos-buenos-aires",
  availability: "available",
  catalogKey: "buenosAires",
  silhouetteSrc: "/images/provinces/buenos-aires.svg",
  dictionaryKey: "soilMap",
  imageSrc: "/images/screenshots/captura-buenos-aires.png",
  heroImageSrc: "/images/screenshots/hero-buenos-aires.png",
  heroScreenshot: true,
  // hero-buenos-aires.png is a much lighter/brighter photo than Santa Fe's, so it needs
  // noticeably higher opacity to read at all against the dark theme's background.
  heroImageClassName: "object-cover object-center opacity-[0.78] dark:opacity-[0.65] sm:opacity-[0.65] dark:sm:opacity-[0.55]",
};

export const santaFeProvince: ProvinceConfig = {
  slug: "santa-fe",
  path: "/mapa-suelos-santa-fe",
  availability: "available",
  catalogKey: "santaFe",
  silhouetteSrc: "/images/provinces/santa-fe.svg",
  dictionaryKey: "soilMapSantaFe",
  imageSrc: "/images/screenshots/captura-santa-fe.png",
  heroImageSrc: "/images/screenshots/hero-santa-fe.png",
  heroScreenshot: true,
};

export const cordobaProvince: UpcomingProvinceConfig = {
  slug: "cordoba",
  availability: "coming-soon",
  catalogKey: "cordoba",
  silhouetteSrc: "/images/provinces/cordoba.svg",
};

/**
 * Catalog registry for provinces that are available or in preparation. Available entries carry
 * their published route and page content; upcoming entries remain non-interactive until activated.
 */
export const provinces: readonly ProvinceCatalogConfig[] = [buenosAiresProvince, santaFeProvince, cordobaProvince];

/** The other province currently in the registry, used for the mutual internal link between landings. */
export function getCrossProvince(current: ProvinceConfig): ProvinceConfig | undefined {
  return provinces.find((province): province is ProvinceConfig => (
    province.availability === "available" && province.slug !== current.slug
  ));
}

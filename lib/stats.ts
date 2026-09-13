/**
 * Single source of truth for the numbers shown in the home's statistics strip.
 *
 * - soilMaps: combined coverage across both provinces — Buenos Aires' 386 individual
 *   "Cartas de Suelo" PDFs plus Santa Fe's 213 series (documented within Santa Fe's own
 *   single 640-page consolidated document, not as individual cartas). These are two
 *   structurally different document types, which is why the stat's label reads "Cartas y
 *   series de suelo" rather than "Cartas de Suelo" — the provincial breakdown is shown
 *   alongside the roadmap so the distinction stays explicit, not implied.
 * - provinces: the 2 provinces SuelosAR currently covers (Buenos Aires, Santa Fe).
 * - mainFeatures: the 6 features presented in the home's Features section.
 *
 * `start`/`end` pairs drive the count-up entrance animation in `Features` — `start` is the
 * pre-Santa Fe figure so the animation visually tells the coverage story, not just a number.
 */
export const homeStats = {
  soilMaps: { start: 386, end: 599 },
  provinces: { start: 1, end: 2 },
  mainFeatures: "6",
} as const;

/** Per-province breakdown of `homeStats.soilMaps.end`, shown next to the roadmap to avoid ambiguity. */
export const provinceSoilMapBreakdown = {
  buenosAires: 386,
  santaFe: 213,
} as const;

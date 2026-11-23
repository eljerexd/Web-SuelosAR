/**
 * Verified homepage coverage values. The counts describe different units (Buenos Aires
 * soil-map documents vs. provincial soil series), so they are labeled separately and never
 * added together. Province count-up and roadmap connectors share the entrance sequence.
 */
export const homeStats = {
  provinces: { start: 1, end: 3 },
  soilMaps: {
    buenosAires: 386,
    santaFe: 213,
    cordoba: 409,
  },
} as const;

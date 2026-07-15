export interface StepBounds {
  top: number;
  bottom: number;
}

/** Returns the step whose center is closest to the viewport's reading line. */
export function getActiveFeatureIndex(steps: readonly StepBounds[], viewportHeight: number) {
  if (steps.length === 0) return 0;

  const readingLine = viewportHeight / 2;
  let activeIndex = 0;
  let shortestDistance = Number.POSITIVE_INFINITY;

  steps.forEach((step, index) => {
    const stepCenter = (step.top + step.bottom) / 2;
    const distance = Math.abs(stepCenter - readingLine);

    if (distance < shortestDistance) {
      activeIndex = index;
      shortestDistance = distance;
    }
  });

  return activeIndex;
}

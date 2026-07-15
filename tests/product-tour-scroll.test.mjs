import assert from "node:assert/strict";
import test from "node:test";

import { getActiveFeatureIndex } from "../lib/product-tour-scroll.ts";

const viewportHeight = 1000;
const stepHeight = 690;
const sectionStart = 1600;

function boundsAt(scrollY) {
  return Array.from({ length: 6 }, (_, index) => {
    const top = sectionStart + index * stepHeight - scrollY;
    return { top, bottom: top + stepHeight };
  });
}

function scrollPositionFor(index) {
  return sectionStart + index * stepHeight + stepHeight / 2 - viewportHeight / 2;
}

test("selects exactly the same feature while scrolling down and back up", () => {
  const downward = [0, 1, 2, 3, 4, 5];
  const upward = [...downward].reverse();

  for (const index of [...downward, ...upward, ...downward]) {
    const activeIndex = getActiveFeatureIndex(boundsAt(scrollPositionFor(index)), viewportHeight);
    assert.equal(activeIndex, index);
  }
});

test("resolves feature boundaries deterministically", () => {
  const firstCenter = sectionStart + stepHeight / 2;
  const secondCenter = firstCenter + stepHeight;
  const midpoint = (firstCenter + secondCenter) / 2;
  const scrollY = midpoint - viewportHeight / 2;

  assert.equal(getActiveFeatureIndex(boundsAt(scrollY), viewportHeight), 0);
  assert.equal(getActiveFeatureIndex(boundsAt(scrollY + 1), viewportHeight), 1);
});

test("falls back safely before step refs are available", () => {
  assert.equal(getActiveFeatureIndex([], viewportHeight), 0);
});

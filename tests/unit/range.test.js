// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseRange, evaluateRange, parseExpression } from "../../src/lib/main.js";

describe("Range Evaluator", () => {
  test("TODO: add boundary and step tests", () => {
    expect(true).toBe(true);
  });

  test("evaluating -3.14:0.01:3.14 yields roughly 629 points", () => {
    const { start, step, end } = parseRange("-3.14:0.01:3.14");
    const fn = parseExpression("y=Math.sin(x)");
    const points = evaluateRange(fn, start, step, end);
    // Accept a small tolerance around expected 629
    expect(points.length).toBeGreaterThanOrEqual(620);
    expect(points.length).toBeLessThanOrEqual(636);
  });
});

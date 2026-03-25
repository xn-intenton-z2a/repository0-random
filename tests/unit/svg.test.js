// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { renderSVG } from "../../src/lib/main.js";

describe("SVG Renderer", () => {
  test("TODO: add axis/labels tests", () => {
    expect(true).toBe(true);
  });

  test("renderSVG returns SVG containing <polyline> and viewBox", () => {
    const series = [ { x: 0, y: 0 }, { x: 1, y: 1 } ];
    const svg = renderSVG(series, { width: 200, height: 100 });
    expect(typeof svg).toBe("string");
    expect(svg).toContain("<polyline");
    expect(svg).toContain("viewBox");
  });
});

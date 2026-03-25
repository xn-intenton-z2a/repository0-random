// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseExpression } from "../../src/lib/main.js";

describe("Expression Parser", () => {
  test("TODO: add more expression tests", () => {
    expect(true).toBe(true);
  });

  test("parseExpression returns a callable function for 'y=Math.sin(x)'", () => {
    const fn = parseExpression("y=Math.sin(x)");
    expect(typeof fn).toBe("function");
    const val = fn(0);
    expect(val).toBeCloseTo(0, 6);
  });
});

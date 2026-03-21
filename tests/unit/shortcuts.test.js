// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseCron, stringifyCron, nextRuns } from "../../src/lib/main.js";

describe("Shortcuts and Stringify", () => {
  test("@daily and @monthly shortcuts and stringify behavior", () => {
    const dailyParsed = parseCron('@daily');
    expect(stringifyCron(dailyParsed)).toBe('0 0 * * *');

    const monthlyParsed = parseCron('@monthly');
    expect(stringifyCron(monthlyParsed)).toBe('0 0 1 * *');

    const arr = nextRuns('@daily', 7, new Date('2026-01-01T00:00:00Z'));
    expect(arr).toHaveLength(7);
  });
});

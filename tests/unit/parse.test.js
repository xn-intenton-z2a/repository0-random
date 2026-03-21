// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseCron } from "../../src/lib/main.js";

describe("Cron Parser", () => {
  test("parses step tokens like */15", () => {
    const parsed = parseCron('*/15 * * * *');
    expect(parsed.minutes).toEqual([0,15,30,45]);
    expect(parsed.hours.length).toBe(24);
  });

  test("throws on invalid numeric ranges", () => {
    expect(() => parseCron('61 * * * *')).toThrow(SyntaxError);
    expect(() => parseCron('*/-5 * * * *')).toThrow(SyntaxError);
    expect(() => parseCron('not-a-cron')).toThrow(SyntaxError);
  });
});

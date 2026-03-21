// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { parseCron, stringifyCron } from "../../src/lib/main.js";

describe("Stringify Cron", () => {
  test("stringify preserves step tokens and expands shortcuts", () => {
    expect(stringifyCron(parseCron('*/15 * * * *'))).toBe('*/15 * * * *');
    expect(stringifyCron(parseCron('@monthly'))).toBe('0 0 1 * *');
  });

  test("stringify emits 6-field when seconds present", () => {
    expect(stringifyCron(parseCron('5 */15 * * * *'))).toBe('5 */15 * * * *');
  });
});

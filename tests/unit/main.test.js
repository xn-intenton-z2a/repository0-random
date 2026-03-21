// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, hammingString, hammingBits } from "../../src/lib/main.js";

describe("Main Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Library Identity", () => {
  test("exports name, version, and description", () => {
    expect(typeof name).toBe("string");
    expect(typeof version).toBe("string");
    expect(typeof description).toBe("string");
    expect(name.length).toBeGreaterThan(0);
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test("getIdentity returns correct structure", () => {
    const identity = getIdentity();
    expect(identity).toEqual({ name, version, description });
  });
});

describe("Hamming String", () => {
  test("karolin vs kathrin -> 3", () => {
    expect(hammingString("karolin", "kathrin")).toBe(3);
  });

  test("empty strings -> 0", () => {
    expect(hammingString("", "")).toBe(0);
  });

  test("throws RangeError for different lengths", () => {
    expect(() => hammingString("a", "ab")).toThrow(RangeError);
  });

  test("throws TypeError for non-strings", () => {
    expect(() => hammingString(1, "a")).toThrow(TypeError);
  });
});

describe("Hamming Bits", () => {
  test("1 vs 4 -> 2", () => {
    expect(hammingBits(1, 4)).toBe(2);
  });

  test("0 vs 0 -> 0", () => {
    expect(hammingBits(0, 0)).toBe(0);
  });

  test("accepts BigInt and large numbers", () => {
    expect(hammingBits(0n, 0n)).toBe(0);
    expect(hammingBits(123456789n, 987654321n)).toBeDefined();
  });

  test("throws TypeError for non-integers", () => {
    expect(() => hammingBits("1", 2)).toThrow(TypeError);
    expect(() => hammingBits(1.5, 2)).toThrow(TypeError);
  });

  test("throws RangeError for negative integers", () => {
    expect(() => hammingBits(-1, 1)).toThrow(RangeError);
    expect(() => hammingBits(1, -2)).toThrow(RangeError);
  });
});

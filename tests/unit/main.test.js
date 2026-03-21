// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from "vitest";
import { main, getIdentity, name, version, description, hamming, hammingBits } from "../../src/lib/main.js";

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

describe('Hamming (strings)', () => {
  test('karolin vs kathrin => 3', () => {
    expect(hamming('karolin', 'kathrin')).toBe(3);
  });

  test('empty strings => 0', () => {
    expect(hamming('', '')).toBe(0);
  });

  test('unequal length strings throw RangeError', () => {
    expect(() => hamming('a', '')).toThrow(RangeError);
  });

  test('non-string inputs throw TypeError', () => {
    // @ts-ignore - intentionally wrong
    expect(() => hamming(1, 'a')).toThrow(TypeError);
    // @ts-ignore
    expect(() => hamming('a', null)).toThrow(TypeError);
  });

  test('unicode code points compared not code units', () => {
    // musical G clef U+1D11E is a single code point but surrogate pair in UTF-16
    const a = '𝄞a'; // [U+1D11E, 'a']
    const b = '𝄢a'; // different first codepoint
    expect(hamming(a, b)).toBe(1);
  });
});

describe('Hamming (bits)', () => {
  test('1 vs 4 => 2', () => {
    expect(hammingBits(1, 4)).toBe(2);
  });

  test('0 vs 0 => 0', () => {
    expect(hammingBits(0, 0)).toBe(0);
  });

  test('non-integer numbers throw TypeError', () => {
    expect(() => hammingBits(1.5, 2)).toThrow(TypeError);
  });

  test('negative integers throw RangeError', () => {
    expect(() => hammingBits(-1, 2)).toThrow(RangeError);
  });

  test('BigInt inputs supported', () => {
    expect(hammingBits(1n, 4n)).toBe(2);
  });
});

// SPDX-License-Identifier: MIT
// tests for encoding library
import { describe, test, expect } from "vitest";
import { encode, decode, createCustomEncoding, listEncodings, encodeUuid, decodeUuid, _getEncodingNames } from "../../src/lib/main.js";

function ua(arr) {
  return new Uint8Array(arr);
}

const sampleArrays = [
  ua([]),
  ua([0x5a]),
  ua(new Array(16).fill(0)),
  ua(new Array(16).fill(0xFF)),
  ua([0x01,0x02,0x03,0x04,0xff,0x00,0x10,0x20,0x7f,0x80,0x55,0xaa,0xbb,0xcc,0xdd,0xee])
];

const encNames = ["base62", "base85", "base91", "base89"];

describe("Encodings round-trip", () => {
  test("built-in encodings round-trip for samples", () => {
    for (const name of encNames) {
      for (const arr of sampleArrays) {
        const encoded = encode(name, arr);
        const decoded = decode(name, encoded);
        expect(decoded).toEqual(arr);
      }
    }
  });

  test("edge cases: empty, single byte, all zeros, all 0xFF", () => {
    for (const name of encNames) {
      expect(decode(name, encode(name, ua([])))).toEqual(ua([]));
      expect(decode(name, encode(name, ua([0])))).toEqual(ua([0]));
      expect(decode(name, encode(name, ua([255])))).toEqual(ua([255]));
    }
  });
});

describe("Custom encoding and listing", () => {
  test("create custom binary charset and round-trip", () => {
    const enc = createCustomEncoding("bin2", "01");
    const data = ua([0x00, 0x01, 0x02, 0x03]);
    const encoded = encode("bin2", data);
    const decoded = decode("bin2", encoded);
    expect(decoded).toEqual(data);
  });

  test("listEncodings contains built-ins with expected metadata", () => {
    const list = listEncodings();
    const found = list.find(e => e.name === "base62");
    expect(found).toBeDefined();
    expect(found.charsetSize).toBe(62);
    expect(found.bitsPerChar).toBeCloseTo(Math.log2(62));
  });
});

describe("UUID helpers", () => {
  test("encodeUuid and decodeUuid round-trip and dense shorter than base64", () => {
    const uuid = "123e4567-e89b-12d3-a456-426614174000";
    const encoded = encodeUuid(uuid, "base89");
    const decoded = decodeUuid(encoded, "base89");
    expect(decoded.toLowerCase()).toBe(uuid.toLowerCase());

    // baseline base64 no padding length for 16 bytes is 22
    const bytes = decode("base89", encoded.split("").reverse().join(""));
    const base64 = Buffer.from(bytes).toString("base64").replace(/=+$/, "");
    expect(base64.length).toBe(22);

    // densest built-in should be shorter than 22
    expect(encoded.length).toBeLessThan(22);
  });
});

describe("Registry sanity", () => {
  test("_getEncodingNames returns an array containing built-ins", () => {
    const names = _getEncodingNames();
    for (const n of encNames) expect(names).toContain(n);
  });
});

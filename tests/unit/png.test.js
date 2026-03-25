// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { renderPNG } from "../../src/lib/main.js";

describe("PNG Renderer", () => {
  test("TODO: add image validity tests when using external renderer", () => {
    expect(true).toBe(true);
  });

  test("renderPNG output starts with PNG magic bytes", () => {
    const buf = renderPNG([]);
    expect(buf instanceof Uint8Array || Buffer.isBuffer(buf)).toBe(true);
    const magic = Buffer.from([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);
    const head = Buffer.from(buf.slice(0,8));
    expect(head.equals(magic)).toBe(true);
  });
});

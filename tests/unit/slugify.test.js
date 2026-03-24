import { describe, test, expect } from "vitest";
import { slugify } from "../../src/lib/main.js";

describe("slugify", () => {
  test("basic slugifies Hello World", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  test("null/undefined returns empty string", () => {
    expect(slugify(null)).toBe("");
    expect(slugify(undefined)).toBe("");
  });

  test("removes diacritics", () => {
    expect(slugify("Café au lait")).toBe("cafe-au-lait");
  });
});
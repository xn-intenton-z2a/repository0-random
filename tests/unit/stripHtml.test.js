import { describe, test, expect } from "vitest";
import { stripHtml } from "../../src/lib/main.js";

describe("stripHtml", () => {
  test("removes tags and decodes entities", () => {
    expect(stripHtml("<p>Hello &amp; <strong>World</strong></p>")).toBe("Hello & World");
  });

  test("decodes numeric entities", () => {
    expect(stripHtml("One&#32;Two&#33;")).toBe("One Two!");
  });

  test("null/undefined returns empty string", () => {
    expect(stripHtml(null)).toBe("");
  });
});
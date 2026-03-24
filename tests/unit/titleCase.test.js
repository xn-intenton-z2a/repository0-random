import { describe, test, expect } from "vitest";
import { titleCase } from "../../src/lib/main.js";

describe("titleCase", () => {
  test("capitalises first letter of each word", () => {
    expect(titleCase("hello world")).toBe("Hello World");
  });

  test("handles hyphens and underscores", () => {
    expect(titleCase("foo-bar_baz")).toBe("Foo-Bar_Baz");
  });

  test("null/undefined returns empty string", () => {
    expect(titleCase(null)).toBe("");
  });
});
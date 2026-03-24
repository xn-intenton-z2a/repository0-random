import { describe, test, expect } from "vitest";
import { kebabCase } from "../../src/lib/main.js";

describe("kebabCase", () => {
  test("converts camelCase to kebab-case", () => {
    expect(kebabCase("fooBarBaz")).toBe("foo-bar-baz");
  });

  test("converts spaces and punctuation", () => {
    expect(kebabCase("Hello World! Something?" )).toBe("hello-world-something");
  });

  test("null/undefined returns empty string", () => {
    expect(kebabCase(null)).toBe("");
  });
});
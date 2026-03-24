import { describe, test, expect } from "vitest";
import { camelCase } from "../../src/lib/main.js";

describe("camelCase", () => {
  test("converts hyphenated to camelCase", () => {
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
  });

  test("handles spaces and underscores", () => {
    expect(camelCase("Hello world_example")).toBe("helloWorldExample");
  });

  test("null/undefined returns empty string", () => {
    expect(camelCase(null)).toBe("");
  });
});
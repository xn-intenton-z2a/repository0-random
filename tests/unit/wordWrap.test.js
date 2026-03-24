import { describe, test, expect } from "vitest";
import { wordWrap } from "../../src/lib/main.js";

describe("wordWrap", () => {
  test("wraps text at word boundaries", () => {
    const text = "The quick brown fox";
    expect(wordWrap(text, 10)).toBe("The quick\nbrown fox");
  });

  test("places long single word on its own line", () => {
    const text = "Supercalifragilisticexpialidocious small";
    const out = wordWrap(text, 10);
    // first line is the long word
    expect(out.split('\n')[0]).toBe("Supercalifragilisticexpialidocious");
  });

  test("null/undefined returns empty string", () => {
    expect(wordWrap(null, 10)).toBe("");
  });
});
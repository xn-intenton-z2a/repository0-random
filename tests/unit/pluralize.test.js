import { describe, test, expect } from "vitest";
import { pluralize } from "../../src/lib/main.js";

describe("pluralize", () => {
  test("adds es for s/x/z/ch/sh endings", () => {
    expect(pluralize("box")).toBe("boxes");
    expect(pluralize("brush")).toBe("brushes");
  });

  test("consonant+y -> ies", () => {
    expect(pluralize("baby")).toBe("babies");
  });

  test("f/fe -> ves", () => {
    expect(pluralize("knife")).toBe("knives");
    expect(pluralize("leaf")).toBe("leaves");
  });

  test("default adds s", () => {
    expect(pluralize("cat")).toBe("cats");
  });

  test("null/undefined returns empty string", () => {
    expect(pluralize(null)).toBe("");
  });
});
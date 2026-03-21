// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { readFileSync, existsSync } from "fs";

describe("Website", () => {
  test("src/web/index.html exists", () => {
    expect(existsSync("src/web/index.html")).toBe(true);
  });

  test("index.html contains valid HTML structure", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<html");
    expect(html).toContain("</html>");
  });

  test("index.html imports the library via lib.js", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain("lib.js");
  });

  test("src/web/lib.js re-exports from the library", () => {
    expect(existsSync("src/web/lib.js")).toBe(true);
    const lib = readFileSync("src/web/lib.js", "utf8");
    expect(lib).toContain("../lib/main.js");
  });

  test("index.html contains demo element IDs used by behaviour tests", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain('id="lib-name"');
    expect(html).toContain('id="lib-version"');
    expect(html).toContain('id="demo-output"');
    expect(html).toContain('id="parse-output"');
    expect(html).toContain('id="next-n-output"');
    expect(html).toContain('id="match-output"');
  });
});

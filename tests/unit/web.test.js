// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
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

  test("index.html displays library identity elements and demo IDs", () => {
    const html = readFileSync("src/web/index.html", "utf8");
    expect(html).toContain("lib-name");
    expect(html).toContain("lib-version");
    expect(html).toContain('id="parse-output"');
    expect(html).toContain('id="next-run-output"');
    expect(html).toContain('id="next-n-output"');
    expect(html).toContain('id="match-output"');
    expect(html).toContain('id="stringify-output"');
    expect(html).toContain('id="shortcuts-output"');
    expect(html).toContain('id="seconds-output"');
  });
});

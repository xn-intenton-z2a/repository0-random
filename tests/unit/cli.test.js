// SPDX-License-Identifier: MIT
import { describe, test, expect } from "vitest";
import { runCLI } from "../../src/lib/main.js";
import { existsSync } from "fs";

describe("CLI", () => {
  test("TODO: add CLI error cases tests", () => {
    expect(true).toBe(true);
  });

  test("--help returns usage text", async () => {
    const res = await runCLI(["--help"]);
    expect(res && typeof res.output === 'string').toBe(true);
    expect(res.output).toContain('Usage:');
  });

  test("CLI --expression + --range + --file produces an output file (svg)", async () => {
    const out = 'tests/unit/tmp-output.svg';
    // remove if exists
    try { if (existsSync(out)) await import('fs').then(m=>m.promises.unlink(out)); } catch {}
    const res = await runCLI(["--expression", "y=Math.sin(x)", "--range", "-3.14:0.01:3.14", "--file", out]);
    expect(res.status === 0).toBe(true);
    expect(existsSync(out)).toBe(true);
  });
});

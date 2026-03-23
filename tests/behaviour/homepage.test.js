// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { test, expect } from "@playwright/test";
import { getIdentity } from "../../src/lib/main.js";

test("homepage returns 200 and renders", async ({ page }) => {
  const response = await page.goto("./", { waitUntil: "networkidle" });
  expect(response.status()).toBe(200);

  await expect(page.locator("#lib-name")).toBeVisible({ timeout: 10000 });
  await expect(page.locator("#lib-version")).toBeVisible({ timeout: 10000 });
  await expect(page.locator("#demo-output")).toBeVisible({ timeout: 10000 });

  await page.screenshot({ path: "SCREENSHOT_INDEX.png", fullPage: true });
});

test("page displays the library version from src/lib/main.js", async ({ page }) => {
  const { version } = getIdentity();
  await page.goto("./", { waitUntil: "networkidle" });
  const pageVersion = await page.locator("#lib-version").textContent();
  expect(pageVersion).toContain(version);
});

test('demo-output shows encoded UUIDs and the densest encoding is shorter than base64', async ({ page }) => {
  await page.goto('./', { waitUntil: 'networkidle' });
  const text = await page.locator('#demo-output').textContent();
  const obj = JSON.parse(text);
  expect(obj.uuid).toBeDefined();
  const encs = obj.encodings;
  expect(encs.base62).toBeDefined();
  expect(encs.base85).toBeDefined();
  expect(encs.base91).toBeDefined();
  // ensure encoded values present
  expect(encs.base62.encoded.length).toBeGreaterThan(0);
  expect(encs.base85.encoded.length).toBeGreaterThan(0);
  expect(encs.base91.encoded.length).toBeGreaterThan(0);
  const lengths = [encs.base62.length || encs.base62.encoded.length, encs.base85.length || encs.base85.encoded.length, encs.base91.length || encs.base91.encoded.length];
  const minLen = Math.min(...lengths);
  // base64 (no padding) length for the demo UUID is 22
  expect(minLen).toBeLessThan(22);
});

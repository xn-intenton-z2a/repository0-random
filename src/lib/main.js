#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  pkg = requireFn("../../package.json");
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title, version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description;

export function getIdentity() {
  return { name, version, description };
}

export function main(args) {
  if (args?.includes("--version")) {
    console.log(version);
    return;
  }
  if (args?.includes("--identity")) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  console.log(`${name}@${version}`);
}

// Hamming distance between two equal-length Unicode strings (code points)
export function hammingDistanceStrings(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    throw new TypeError('Both arguments must be strings');
  }
  const aPts = Array.from(a);
  const bPts = Array.from(b);
  if (aPts.length !== bPts.length) {
    throw new RangeError('Strings must have the same length (measured in Unicode code points)');
  }
  let diff = 0;
  for (let i = 0; i < aPts.length; i++) {
    if (aPts[i] !== bPts[i]) diff++;
  }
  return diff;
}

// Hamming distance between two non-negative integers (bitwise)
// Accepts Number (integers) or BigInt. Throws TypeError for non-integers, RangeError for negatives.
export function hammingDistanceInts(a, b) {
  const typeA = typeof a;
  const typeB = typeof b;
  const okTypeA = (typeA === 'number' || typeA === 'bigint');
  const okTypeB = (typeB === 'number' || typeB === 'bigint');
  if (!okTypeA || !okTypeB) {
    throw new TypeError('Both arguments must be integers (Number or BigInt)');
  }
  if (typeA === 'number' && !Number.isInteger(a)) throw new TypeError('Arguments must be integers');
  if (typeB === 'number' && !Number.isInteger(b)) throw new TypeError('Arguments must be integers');

  const A = BigInt(a);
  const B = BigInt(b);
  if (A < 0n || B < 0n) throw new RangeError('Arguments must be non-negative');

  let xor = A ^ B;
  let count = 0;
  while (xor !== 0n) {
    xor &= (xor - 1n);
    count++;
  }
  return count;
}

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}

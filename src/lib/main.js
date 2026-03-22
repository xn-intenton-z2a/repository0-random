#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js — Binary-to-text encoding library

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  try {
    pkg = requireFn("../../package.json");
  } catch (e) {
    pkg = { name: "repo", version: "0.0.0", description: "" };
  }
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch (e) {
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

// --- Encoding core ---

const encodings = new Map();

function createEncodingInternal(name, charset) {
  if (typeof name !== "string" || !name) throw new TypeError("encoding name must be a non-empty string");
  if (typeof charset !== "string" || charset.length < 2) throw new TypeError("charset must be a string with at least 2 characters");
  const unique = new Set(charset);
  if (unique.size !== charset.length) throw new Error("charset contains duplicate characters");

  const base = charset.length;
  const chars = charset;

  function encode(bytes) {
    if (!(bytes instanceof Uint8Array)) throw new TypeError("encode input must be a Uint8Array");
    if (bytes.length === 0) return "";

    // Count leading zeros
    let leadingZeros = 0;
    while (leadingZeros < bytes.length && bytes[leadingZeros] === 0) leadingZeros++;

    // Convert to BigInt
    let value = 0n;
    for (let i = 0; i < bytes.length; i++) {
      value = (value << 8n) | BigInt(bytes[i]);
    }

    // Convert BigInt to base-N
    let digits = "";
    while (value > 0n) {
      const rem = Number(value % BigInt(base));
      digits += chars[rem];
      value = value / BigInt(base);
    }

    // digits currently little-endian; reverse to get most-significant-first
    const body = digits.split("").reverse().join("");

    // Preserve leading zero bytes as leading charset[0]
    return chars[0].repeat(leadingZeros) + body;
  }

  function decode(str) {
    if (typeof str !== "string") throw new TypeError("decode input must be a string");
    if (str.length === 0) return new Uint8Array(0);

    // Count leading charset[0]
    let leadingChars = 0;
    while (leadingChars < str.length && str[leadingChars] === chars[0]) leadingChars++;

    const rest = str.slice(leadingChars);

    // Convert rest from base-N to BigInt
    let value = 0n;
    for (let i = 0; i < rest.length; i++) {
      const idx = chars.indexOf(rest[i]);
      if (idx === -1) throw new Error(`invalid character '${rest[i]}' for encoding ${name}`);
      value = value * BigInt(base) + BigInt(idx);
    }

    // Convert BigInt to bytes
    const bytes = [];
    while (value > 0n) {
      bytes.unshift(Number(value & 0xffn));
      value = value >> 8n;
    }

    // Prepend leading zero bytes
    const out = new Uint8Array(leadingChars + bytes.length);
    for (let i = 0; i < leadingChars; i++) out[i] = 0;
    for (let i = 0; i < bytes.length; i++) out[leadingChars + i] = bytes[i];
    return out;
  }

  const enc = { name, charset: chars, base, encode, decode };
  encodings.set(name, enc);
  return enc;
}

export function createCustomEncoding(name, charset) {
  return createEncodingInternal(name, charset);
}

export function listEncodings() {
  return Array.from(encodings.values()).map(e => ({ name: e.name, bitsPerChar: Math.log2(e.base), charsetSize: e.base }));
}

export function encode(encodingName, input) {
  if (typeof encodingName !== "string") throw new TypeError("encoding name must be a string");
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`unknown encoding: ${encodingName}`);
  return enc.encode(input);
}

export function decode(encodingName, input) {
  if (typeof encodingName !== "string") throw new TypeError("encoding name must be a string");
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`unknown encoding: ${encodingName}`);
  return enc.decode(input);
}

// --- Built-in encodings ---
// base62: 0-9a-zA-Z
createEncodingInternal("base62", "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

// base85: Z85 (ZeroMQ) alphabet
createEncodingInternal("base85", "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#");

// base91: a 91-character printable alphabet (classic base91 symbols)
createEncodingInternal("base91", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\"");

// densest printable-ASCII encoding omitting ambiguous characters 0/O and 1/l/I
const ambiguous = new Set(["0", "O", "1", "l", "I"]);
let denseChars = [];
for (let c = 33; c <= 126; c++) {
  const ch = String.fromCharCode(c);
  if (!ambiguous.has(ch)) denseChars.push(ch);
}
createEncodingInternal("base89", denseChars.join(""));

// --- UUID helpers ---
function hexToBytes(hex) {
  if (hex.length % 2 !== 0) throw new Error("invalid hex length");
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function encodeUuid(uuidString, encodingName = "base89") {
  if (typeof uuidString !== "string") throw new TypeError("uuid must be a string");
  const hex = uuidString.replace(/-/g, "").toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(hex)) throw new Error("invalid uuid string");
  const bytes = hexToBytes(hex);
  const encoded = encode(encodingName, bytes);
  return encoded.split("").reverse().join(""); // reverse as shorthand
}

export function decodeUuid(encodedString, encodingName = "base89") {
  if (typeof encodedString !== "string") throw new TypeError("encoded uuid must be a string");
  const reversed = encodedString.split("").reverse().join("");
  const bytes = decode(encodingName, reversed);
  if (bytes.length !== 16) throw new Error("decoded uuid has incorrect byte length");
  const hex = bytesToHex(bytes);
  // insert dashes 8-4-4-4-12
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

// Export registry introspection for tests/debugging
export function _getEncodingNames() {
  return Array.from(encodings.keys());
}

// Keep main CLI behaviour
if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}

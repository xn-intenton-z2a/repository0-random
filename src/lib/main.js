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

// encoding library
const encodings = new Map();

function assertUint8Array(buf) {
  if (!(buf instanceof Uint8Array)) throw new TypeError("data must be a Uint8Array");
}

function registerEncoding(obj) {
  if (!obj || !obj.name) throw new Error("invalid encoding object");
  encodings.set(obj.name, obj);
}

function listEncodings() {
  const out = [];
  for (const enc of encodings.values()) {
    out.push({ name: enc.name, bitsPerChar: enc.bitsPerChar, charsetSize: enc.charset?.length ?? null });
  }
  return out;
}

function createEncodingFromCharset(name, charset, options = {}) {
  if (typeof name !== 'string' || name.length === 0) throw new TypeError('name must be a non-empty string');
  if (typeof charset !== 'string' || charset.length < 2) throw new TypeError('charset must be a string with length >= 2');
  // Validate printable and uniqueness
  const chars = Array.from(charset);
  const set = new Set(chars);
  if (set.size !== chars.length) throw new Error('charset contains duplicate characters');
  for (const ch of chars) {
    const code = ch.codePointAt(0);
    if (code < 0x21 || code > 0x7e) throw new Error('charset must contain printable ASCII characters only');
  }
  const ambiguous = ['0','O','1','l','I'];
  if (!options.allowAmbiguous) {
    for (const a of ambiguous) if (charset.includes(a)) throw new Error('charset contains ambiguous characters; set allowAmbiguous=true to override');
  }

  const base = BigInt(chars.length);
  const bitsPerChar = Math.log2(chars.length);

  // encode/decode using BigInt for correctness
  function encode(bytes) {
    assertUint8Array(bytes);
    if (bytes.length === 0) return '';
    // count leading zeros
    let zeros = 0;
    while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
    // convert remaining bytes to BigInt
    let value = 0n;
    for (let i = zeros; i < bytes.length; i++) {
      value = (value << 8n) + BigInt(bytes[i]);
    }
    let out = '';
    while (value > 0n) {
      const rem = value % base;
      out = chars[Number(rem)] + out;
      value = value / base;
    }
    // leading zero chars
    for (let i = 0; i < zeros; i++) out = chars[0] + out;
    return out;
  }

  function decode(text) {
    if (typeof text !== 'string') throw new TypeError('text must be a string');
    if (text.length === 0) return new Uint8Array(0);
    // count leading zero chars
    let zeros = 0;
    while (zeros < text.length && text[zeros] === chars[0]) zeros++;
    // convert text to BigInt
    let value = 0n;
    for (let i = zeros; i < text.length; i++) {
      const idx = chars.indexOf(text[i]);
      if (idx === -1) throw new Error('invalid character in input');
      value = value * base + BigInt(idx);
    }
    // convert BigInt to bytes
    const bytes = [];
    while (value > 0n) {
      bytes.push(Number(value & 0xffn));
      value >>= 8n;
    }
    bytes.reverse();
    const out = new Uint8Array(zeros + bytes.length);
    for (let i = 0; i < zeros; i++) out[i] = 0;
    for (let i = 0; i < bytes.length; i++) out[zeros + i] = bytes[i];
    return out;
  }

  const enc = { name, charset: chars.join(''), charsetSize: chars.length, bitsPerChar, encode, decode };
  registerEncoding(enc);
  return enc;
}

// built-in charsets
const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE85_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#';

// Register built-ins
createEncodingFromCharset('base62', BASE62_CHARS, { allowAmbiguous: true });
createEncodingFromCharset('base85', BASE85_CHARS, { allowAmbiguous: true });

// Create a base91 charset programmatically (printable ASCII without space)
let base91chars = '';
for (let i = 33; i <= 126 && base91chars.length < 91; i++) base91chars += String.fromCharCode(i);
createEncodingFromCharset('base91', base91chars, { allowAmbiguous: true });

// convenience wrappers
function encode(encodingName, data) {
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`unknown encoding: ${encodingName}`);
  assertUint8Array(data);
  return enc.encode(data);
}

function decode(encodingName, text) {
  const enc = encodings.get(encodingName);
  if (!enc) throw new Error(`unknown encoding: ${encodingName}`);
  return enc.decode(text);
}

function encodeBase62(bytes) { return encode('base62', bytes); }
function decodeBase62(text) { return decode('base62', text); }
function encodeBase85(bytes) { return encode('base85', bytes); }
function decodeBase85(text) { return decode('base85', text); }
function encodeBase91(bytes) { return encode('base91', bytes); }
function decodeBase91(text) { return decode('base91', text); }

function encodeUuid(uuidStr, encodingName) {
  if (typeof uuidStr !== 'string') throw new TypeError('uuid must be a string');
  const hex = uuidStr.replace(/-/g, '').toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(hex)) throw new Error('invalid uuid string');
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) bytes[i] = parseInt(hex.substr(i*2, 2), 16);
  const encoded = encode(encodingName, bytes);
  // UUID shorthand: reverse the encoded output for shorthand representation
  return encoded.split('').reverse().join('');
}

function decodeUuid(encodedStr, encodingName) {
  if (typeof encodedStr !== 'string') throw new TypeError('encoded uuid must be a string');
  // reverse before decoding (shorthand reversal)
  const rev = encodedStr.split('').reverse().join('');
  const bytes = decode(encodingName, rev);
  if (!(bytes instanceof Uint8Array)) throw new Error('decoded value is not a byte array');
  if (bytes.length !== 16) throw new Error('decoded uuid must be 16 bytes');
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  // format: 8-4-4-4-12
  return [hex.substr(0,8), hex.substr(8,4), hex.substr(12,4), hex.substr(16,4), hex.substr(20,12)].join('-');
}

// export API
export {
  listEncodings,
  createEncodingFromCharset,
  encode,
  decode,
  encodeBase62,
  decodeBase62,
  encodeBase85,
  decodeBase85,
  encodeBase91,
  decodeBase91,
  encodeUuid,
  decodeUuid,
};

// CLI entrypoint when run directly
if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}

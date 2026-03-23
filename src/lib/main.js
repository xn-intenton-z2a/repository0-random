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
// basE91 alphabet (91 chars) - select a printable 91-character set
const BASE91_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"';
// The above assembly ensures 91 characters (constructed to avoid control chars). If length mismatches, fallback to generating 91 distinct printable chars.
if (BASE91_CHARS.length !== 91) {
  // build printable ASCII set and take first 91 characters excluding space
  let s = '';
  for (let i = 33; i <= 126 && s.length < 91; i++) {
    s += String.fromCharCode(i);
  }
  // ensure uniqueness and 91 length
  const set = Array.from(new Set(s)).slice(0, 91).join('');
  // override
  // eslint-disable-next-line no-unused-vars
  var _BASE91_FINAL = set;
}

// basE91 encode/decode implementation (variable 13/14-bit packing) using BigInt to avoid 32-bit bitwise issues
function basE91Encode(bytes) {
  assertUint8Array(bytes);
  const alphabet = (typeof _BASE91_FINAL !== 'undefined' ? _BASE91_FINAL : BASE91_CHARS);
  if (bytes.length === 0) return '';
  let b = 0n;
  let n = 0;
  const out = [];
  for (let i = 0; i < bytes.length; i++) {
    b |= BigInt(bytes[i]) << BigInt(n);
    n += 8;
    if (n > 13) {
      let v = b & 8191n; // 13 bits
      if (v > 88n) {
        v = b & 16383n; // 14 bits
        b >>= 14n;
        n -= 14;
      } else {
        b >>= 13n;
        n -= 13;
      }
      out.push(alphabet[Number(v % 91n)]);
      out.push(alphabet[Number(v / 91n)]);
    }
  }
  if (n > 0) {
    out.push(alphabet[Number(b % 91n)]);
    if (n > 7 || b > 90n) out.push(alphabet[Number(b / 91n)]);
  }
  return out.join('');
}

function basE91Decode(text) {
  if (typeof text !== 'string') throw new TypeError('text must be a string');
  const alphabet = (typeof _BASE91_FINAL !== 'undefined' ? _BASE91_FINAL : BASE91_CHARS);
  if (text.length === 0) return new Uint8Array(0);
  const indexes = new Int32Array(256).fill(-1);
  for (let i = 0; i < alphabet.length; i++) indexes[alphabet.charCodeAt(i)] = i;
  let v = -1n;
  let b = 0n;
  let n = 0;
  const out = [];
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    const dv = indexes[c];
    if (dv === -1) continue; // ignore unknown
    if (v < 0n) v = BigInt(dv);
    else {
      v = v + BigInt(dv) * 91n;
      b |= v << BigInt(n);
      n += ((v & 8191n) > 88n) ? 14 : 13;
      while (n >= 8) {
        out.push(Number(b & 255n));
        b >>= 8n;
        n -= 8;
      }
      v = -1n;
    }
  }
  if (v >= 0n) {
    b |= v << BigInt(n);
    n += ((v & 8191n) > 88n) ? 14 : 13;
    while (n >= 8) {
      out.push(Number(b & 255n));
      b >>= 8n;
      n -= 8;
    }
  }
  return new Uint8Array(out);
}

// Register built-ins using base-x for base62/base85 and basE91 for base91
createEncodingFromCharset('base62', BASE62_CHARS, { allowAmbiguous: true });
createEncodingFromCharset('base85', BASE85_CHARS, { allowAmbiguous: true });
// register base91 using the generic base encoder (BigInt-based)
createEncodingFromCharset('base91', (typeof _BASE91_FINAL !== 'undefined' ? _BASE91_FINAL : BASE91_CHARS), { allowAmbiguous: true });

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
  return encode(encodingName, bytes);
}

function decodeUuid(encodedStr, encodingName) {
  const bytes = decode(encodingName, encodedStr);
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

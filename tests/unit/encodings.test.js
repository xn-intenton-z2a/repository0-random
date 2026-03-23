// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
import { describe, test, expect } from 'vitest';
import {
  encode,
  decode,
  createEncodingFromCharset,
  listEncodings,
  encodeUuid,
  decodeUuid,
  encodeBase62,
  decodeBase62,
  encodeBase85,
  decodeBase85,
  encodeBase91,
  decodeBase91,
} from '../../src/lib/main.js';
import { randomBytes } from 'crypto';

function toBytes(input) {
  if (input instanceof Uint8Array) return input;
  throw new TypeError('expected Uint8Array');
}

describe('Encodings round-trip and edge cases', () => {
  const encNames = ['base62', 'base85', 'base91'];

  test('edge cases: empty, single byte, all-zero, all-0xFF', () => {
    const cases = [new Uint8Array([]), new Uint8Array([0x00]), new Uint8Array([0xff]), new Uint8Array(16).fill(0x00), new Uint8Array(16).fill(0xff)];
    for (const name of encNames) {
      for (const c of cases) {
        const out = encode(name, c);
        const back = decode(name, out);
        expect(back).toEqual(c);
      }
    }
  });

  test('random buffers round-trip', () => {
    for (const name of encNames) {
      for (let i = 0; i < 5; i++) {
        const buf = new Uint8Array(randomBytes(32));
        const text = encode(name, buf);
        const buf2 = decode(name, text);
        expect(buf2).toEqual(buf);
      }
    }
  });

  test('custom encoding factory and listing', () => {
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789+_'; // 64-ish charset without ambiguous chars
    const enc = createEncodingFromCharset('custom-dense', charset, { allowAmbiguous: false });
    expect(enc.name).toBe('custom-dense');
    const sample = new Uint8Array([1,2,3,4,5,6]);
    const t = encode('custom-dense', sample);
    const b = decode('custom-dense', t);
    expect(b).toEqual(sample);
    // listEncodings contains the new one
    const listed = listEncodings().map(e => e.name);
    expect(listed).toContain('custom-dense');
  });

  test('uuid shorthand round-trip and length comparisons', () => {
    const uuid = '00112233-4455-6677-8899-aabbccddeeff';
    const raw = new Uint8Array(16);
    for (let i = 0; i < 16; i++) raw[i] = parseInt(uuid.replace(/-/g,'').substr(i*2,2),16);
    // compute base64 (no padding)
    const base64 = Buffer.from(raw).toString('base64').replace(/=+$/,'');
    const encodings = listEncodings();
    const results = encodings.map(e => {
      try {
        const s = encodeUuid(uuid, e.name);
        return { name: e.name, encoded: s, length: s.length, bitsPerChar: e.bitsPerChar };
      } catch (err) {
        return { name: e.name, error: String(err) };
      }
    }).filter(r => !r.error);
    expect(results.length).toBeGreaterThan(0);
    // round-trip decodeUuid
    for (const r of results) {
      const back = decodeUuid(r.encoded, r.name);
      expect(back.toLowerCase()).toBe(uuid.toLowerCase());
    }
    // densest length should be < base64 length (22)
    const minLen = Math.min(...results.map(r => r.length));
    expect(minLen).toBeLessThan(base64.length);
  });
});

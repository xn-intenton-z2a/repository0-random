// SPDX-License-Identifier: MIT
// Copyright (C) 2026 Polycode Limited
import { describe, test, expect } from 'vitest';
import {
  createEncodingFromCharset,
  encode,
  decode,
  encodeUuid,
  decodeUuid,
} from '../../src/lib/main.js';

function uuidToBytes(uuid) {
  const hex = uuid.replace(/-/g, '');
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) bytes[i] = parseInt(hex.substr(i*2,2), 16);
  return bytes;
}

describe('UUID shorthand and charset validation', () => {
  test('encodeUuid returns reversed encoded string and decodeUuid reverses back', () => {
    const uuid = '00112233-4455-6677-8899-aabbccddeeff';
    const bytes = uuidToBytes(uuid);
    const plain = encode('base62', bytes);
    const shorthand = encodeUuid(uuid, 'base62');
    expect(shorthand).toBe(plain.split('').reverse().join(''));
    const back = decodeUuid(shorthand, 'base62');
    expect(back.toLowerCase()).toBe(uuid.toLowerCase());
  });

  test('createEncodingFromCharset rejects ambiguous charsets by default', () => {
    const amb = '0123456789OIl';
    expect(() => createEncodingFromCharset('amb-test', amb)).toThrow();
  });

  test('createEncodingFromCharset allows ambiguous when requested', () => {
    const amb = '0123456789OIl';
    const enc = createEncodingFromCharset('amb-allow', amb, { allowAmbiguous: true });
    const sample = new Uint8Array([1,2,3]);
    const t = enc.encode(sample);
    const b = enc.decode(t);
    expect(b).toEqual(sample);
  });
});

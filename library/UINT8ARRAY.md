Title: UINT8ARRAY (Typed Array reference)
Retrieval date: 2026-03-23
Source byte size: 162009

Definition: Uint8Array — typed array of 8-bit unsigned integers, indexable and backed by ArrayBuffer. Each element stores one byte (8 bits).
Bits per element: 8 bits/element.

Common operations and algorithms:
- Create: new Uint8Array(length) or new Uint8Array(buffer) or Uint8Array.from(iterable).
- Conversion: to/from hex, base64, base85, base62 by interpreting bytes and applying encoding algorithms for desired alphabet.
- Concatenation: allocate combined buffer and set slices; avoid repeated reallocation for performance.
- Memory: views share underlying ArrayBuffer; use slice/.subarray for cheap windowing.

Utility API signatures (recommended):
- encode(input: Uint8Array | string, encoding?: string): string  — encode bytes to chosen text encoding
- decode(input: string, encoding?: string): Uint8Array  — decode text to bytes
- createEncoding(alphabet: string): { encode(input: Uint8Array | string): string, decode(input: string): Uint8Array, alphabet: string }
- listEncodings(): string[]

Notes: For binary-to-text encodings that are not power-of-two bases, use bit-buffer or big-integer conversion; preserve leading zeros when required.

Attribution: Concise reference of Uint8Array behaviour and usage patterns (retrieved 2026-03-23).
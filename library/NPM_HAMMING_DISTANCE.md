Title: NPM_HAMMING_DISTANCE

Table of contents
- Package metadata and purpose
- Typical API surface
- Integration guidance and differences vs implementing from scratch
- Licensing and maintenance notes
- Digest and attribution

Package metadata and purpose
- Package: hamming-distance (npm)
- Purpose: convenience implementation of Hamming distance for strings and/or binary; implementations vary — review package README for exact API.

Typical API surface (common patterns observed across small utility packages)
- Exported function signature: hamming(a, b) -> number
  - May accept strings (likely code-unit based) or arrays of bits; may also accept Buffers.
- Some packages provide an options object for mode: 'codepoint'|'codeunit' or for integer mode.
- Integration note: trust but verify: check how package treats Unicode (code unit vs code point) and integer width (32-bit truncation).

Integration guidance
- For mission requirements (Unicode code-point comparison and BigInt-safe bit counting), prefer implementing a focused library as described in HAMMING_DISTANCE.md.
- If using npm package for convenience, run its tests and inspect edge-case behavior (surrogate pairs, negative numbers, large integers) before relying on it for correctness.

Digest
- Source: https://www.npmjs.com/package/hamming-distance
- Retrieval date: 2026-03-21
- Bytes retrieved during crawl: 7201

Attribution
NPM package page for 'hamming-distance', retrieved 2026-03-21; size 7201 bytes.

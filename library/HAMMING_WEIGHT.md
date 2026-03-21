Title: HAMMING_WEIGHT

Table of contents
- Definition
- Common algorithms (Kernighan, table-lookup, parallel bit-count)
- Exact step-by-step popcount implementations for JS (Number and BigInt)
- Complexity and branchless considerations
- Usage guidance in Hamming-distance computation
- Digest and attribution

Definition
Hamming weight = number of symbols equal to 1 in a binary string; equivalently, number of set bits in an integer. Also called population count or popcount.

Common algorithms
- Kernighan's algorithm (loop removing lowest set bit): count = 0; while (x !== 0) { x &= x - 1; count++; }
  - Works in O(k) iterations where k = number of set bits.
- Table-lookup: split word into bytes and sum table[byte] for each; useful for repeated calls and performance-critical paths.
- Parallel bit-count (SWAR) for 32-bit integers using bit twiddling: several arithmetic/bitwise steps reduce counts into groups then sum (reference bit-hacks formula). Exact 32-bit sequence: x -= (x >>> 1) & 0x55555555; x = (x & 0x33333333) + ((x >>> 2) & 0x33333333); x = (x + (x >>> 4)) & 0x0F0F0F0F; return (x * 0x01010101) >>> 24.

Exact JS implementations (textual, no code fences)
- 32-bit Number popcount (safe for 0..0xFFFFFFFF): treat x = x >>> 0 to ensure unsigned 32-bit. Use SWAR sequence above and return (x * 0x01010101) >>> 24.
- Kernighan for Number: x = x >>> 0; count = 0; while (x) { x &= x - 1; count++; }
- BigInt popcount: x = BigInt(x); count = 0; while (x !== 0n) { x &= x - 1n; count++; } return Number(count).

Complexity and performance
- Kernighan: O(k) where k is set bits; best when numbers are sparse.
- Table-lookup: O(w/8) with small constant; fastest where table fits cache and calls many times.
- SWAR parallel approach: O(1) fixed steps for 32-bit values, branchless.

Usage guidance
- For Hamming distance use either XOR then popcount: popcount(a ^ b).
- Prefer BigInt path for integers > 32 bits to avoid 32-bit truncation.

Digest
- Source: https://en.wikipedia.org/wiki/Hamming_weight
- Retrieval date: 2026-03-21
- Bytes retrieved during crawl: 155444

Attribution
Content condensed from Wikipedia entry on Hamming weight. Retrieved 2026-03-21; size 155444 bytes.

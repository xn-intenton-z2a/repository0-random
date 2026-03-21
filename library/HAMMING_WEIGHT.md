Normalised extract

Table of contents:
- Definition
- Relation to Hamming distance
- Bit-counting algorithms

Definition
Hamming weight of a binary string or non-negative integer is the number of symbols equal to 1. For an integer, it is the count of set bits in its binary representation.

Relation to Hamming distance
- For integers a and b, Hamming distance(a,b) = Hamming weight(a XOR b).

Bit-counting algorithms (concrete implementations)
- Kernighan's algorithm (clear lowest set bit):
  1. count = 0
  2. while x != 0:
     x = x & (x - 1)
     count++
  3. return count
- Lookup-table method:
  - Precompute popcount for 8-bit values (array[256]). For a 32-bit Number, split into four bytes, sum table[byte_i].
- Parallel bit-count (Hacker's Delight) methods for fixed-width integers exist; for JS Number (53-bit safe integer), prefer Kernighan or byte lookup.

Supplementary details
- JS Numbers are IEEE-754 doubles with 53-bit integer precision; when supporting larger integers use BigInt.
- When using Number, ensure both integers fit in safe integer range and are non-negative.

Reference details
- Provide deterministic, small-memory implementations suitable for JS runtime.

Detailed digest
- Source: https://en.wikipedia.org/wiki/Hamming_weight (retrieved: 2026-03-21)

Attribution
- Source URL: https://en.wikipedia.org/wiki/Hamming_weight
- Retrieved: 2026-03-21

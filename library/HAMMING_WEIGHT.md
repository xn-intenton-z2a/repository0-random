HAMMING_WEIGHT

Table of contents
1. Definition
2. Role in bit-level Hamming distance
3. Algorithms and implementation patterns
4. BigInt and Number handling in JavaScript
5. API specification
6. Complexity
7. Examples
8. Supplementary notes
9. Reference digest and attribution

1. Definition
Hamming weight (population count) is the number of set bits (ones) in the binary representation of a non-negative integer.

2. Role in bit-level Hamming distance
The bit-level Hamming distance between integers A and B is popcount(A XOR B). Compute XOR first, then count 1 bits.

3. Algorithms and implementation patterns
- Brian Kernighan (recommended general-purpose, BigInt-safe):
  - count = 0
  - while n != 0:
    - n = n & (n - 1)
    - count++
  - return count
- Naive shift-and-mask (portable):
  - count = 0
  - while n != 0:
    - count += Number(n & 1)
    - n = n >> 1
  - return count
- Parallel (fixed-width, fastest for 32-bit unsigned ints): use successive masking and shifting to accumulate partial counts (see BIT_TWIDDLING document for constants and sequence).

4. BigInt and Number handling in JavaScript
- Number values in JS are floating point; bitwise operators coerce to 32-bit signed integers.
- For values that may exceed 32 bits or that must preserve all bits, use BigInt and BigInt bitwise operators. Example pattern for safe operation:
  - A = BigInt(a); B = BigInt(b); D = A ^ B; count = popcountBigInt(D) using Kernighan loop with BigInt arithmetic.
- Reject negative values with RangeError; Hamming weight/popcount is defined here for non-negative integers only.

5. API specification
- export function popcount(value: number | bigint): number
  - Parameters: value - non-negative integer (Number or BigInt)
  - Returns: number of set bits as a Number
  - Errors: TypeError if value is not Number or BigInt representing integer; RangeError if value < 0
- export function hammingDistanceBits(a: number | bigint, b: number | bigint): number
  - Behavior: convert to BigInt if necessary, compute D = BigInt(a) ^ BigInt(b), return popcount(D)

6. Complexity
- Brian Kernighan: O(k) where k is number of set bits in the integer (often small for sparse numbers)
- Naive shift: O(w) where w is the bit width (e.g., 32 or number of bits of the value)
- Parallel fixed-width: O(1) with small constant factors for 32-bit values

7. Examples
- popcount(0) -> 0
- popcount(7) -> 3
- hammingDistanceBits(1, 4) -> 2
- hammingDistanceBits(0n, 0n) -> 0

8. Supplementary notes
- Provide two implementations in the library: a BigInt-safe variant (default, recommended) and an optional 32-bit optimized variant for performance-sensitive paths when callers guarantee 32-bit unsigned inputs.

9. Reference digest and attribution
- Source: https://en.wikipedia.org/wiki/Hamming_weight
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 155,311
- Attribution: Wikipedia (CC BY-SA)

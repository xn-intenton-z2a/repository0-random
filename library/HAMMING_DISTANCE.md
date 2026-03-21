Normalised extract

Table of contents:
- Definition
- String Hamming distance (code point-wise)
- Integer/bit Hamming distance (xor + popcount)
- Complexity

Definition
Hamming distance between two sequences of equal length is the number of positions at which the corresponding symbols are different. For binary vectors or non-negative integers, the bitwise Hamming distance equals the number of 1 bits in the bitwise exclusive-or of the values.

String Hamming distance (code point-wise)
- Precondition: both inputs are strings. Use code points (not UTF-16 code units) when measuring length and comparing positions.
- Validate types: if either argument is not a string, throw TypeError.
- Compute code-point lengths by iterating code points (for...of or spread [...str]) and count; if lengths differ, throw RangeError.
- Algorithm (step-by-step):
  1. Iterate code points of both strings in lockstep.
  2. For each position, compare code points for strict inequality.
  3. Increment counter when different.
  4. Return counter.
- Complexity: O(n) time, O(1) extra space if using streaming iteration; O(n) space if using spread to arrays.

Integer/bit Hamming distance (xor + popcount)
- Precondition: inputs are non-negative integers (Number integers or BigInt). If not integer types, throw TypeError; if negative, throw RangeError.
- Compute xor = a ^ b (use BigInt xor when values are BigInt).
- Count set bits in xor (popcount). Recommended algorithms:
  - Kernighan's algorithm: while (x !== 0) { x &= x - 1; count++; }
  - Use platform-specific popcount intrinsic if available; for small numbers use precomputed lookup for 16-bit chunks.
- Complexity: O(k) where k is number of set bits (Kernighan) or O(b) where b is bit-width for fixed-width counting.

Supplementary details
- Unicode handling: iterate strings using for...of which yields Unicode code points. Do not use string.length as it counts UTF-16 code units.
- BigInt support: accept BigInt operands; when mixing Number and BigInt, coerce Numbers to BigInt after validating range and integrality.
- Edge cases: empty strings => distance 0; identical integers => distance 0.

Reference details (API specifications)
- Exported functions (named exports):
  - hammingDistanceStrings(a: string, b: string): number
    - Throws TypeError if a or b is not string.
    - Throws RangeError if code point lengths differ.
    - Returns non-negative integer count.
  - hammingDistanceBits(a: number | bigint, b: number | bigint): number
    - Throws TypeError if arguments are not integers (Number.isInteger for Number, typeof==="bigint" for BigInt).
    - Throws RangeError if either integer is negative.
    - Returns non-negative integer popcount(xor(a,b)).

Implementation patterns
- Validate inputs first, then compute. Prefer streaming iteration for strings to avoid allocating large arrays.
- Use for...of for string iteration to ensure code points are compared.
- For bit counting, prefer Kernighan's loop for simplicity and predictable performance.

Detailed digest
- Source: https://en.wikipedia.org/wiki/Hamming_distance (retrieved: 2026-03-21)
- Extract: definition, properties, distance formula for sequences and for binary vectors; notes that Hamming weight (number of 1 bits) applied to xor yields bit Hamming distance.

Attribution and crawl data
- Source URL: https://en.wikipedia.org/wiki/Hamming_distance
- Retrieved: 2026-03-21
- Data size saved from crawl: see library index for exact byte counts.

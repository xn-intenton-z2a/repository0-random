WIKIPEDIA_HAMMING_WEIGHT

Table of contents
- Definition
- Algorithms for counting set bits (popcount)
- Efficient implementations (Kernighan, lookup tables, CPU intrinsics)
- Use in integer Hamming distance

Definition
The Hamming weight (popcount) of a non-negative integer is the number of 1 bits in its binary representation. For two integers, hamming distance equals the Hamming weight of their bitwise XOR.

Algorithms for counting set bits
- Naive: loop over bits, mask and shift; O(k) where k is number of bits
- Brian Kernighan's algorithm: while (x) { x &= x - 1; count++; } — loops once per set bit, O(popcount)
- Lookup table: split integer into bytes and sum precomputed counts
- Hardware intrinsics: CPUs often expose POPCNT instruction or compiler builtins (e.g., __builtin_popcount)

Efficient implementation (JS-specific)
- JavaScript lacks native popcount; implement using Kernighan on 32-bit values via x >>> 0 to ensure unsigned.
- For large integers beyond 32 bits and when BigInt is used, apply Kernighan-style loop using BigInt operations: while (x !== 0n) { x &= x - 1n; count++ }

Use in integer Hamming distance
- Given non-negative integers a and b: validate both are integers and >=0, compute x = a ^ b, then return popcount(x).
- Example: 1 ^ 4 = 5 (binary 101) -> popcount = 2

Reference details (implementation guidance)
- Function signature examples (JS):
  - hammingInt(a, b) -> number
    - Parameters: a: number|BigInt, b: number|BigInt
    - Throws: TypeError if inputs are not integers; RangeError if negative
    - Behaviour: compute xor, count set bits, return integer >= 0

Detailed digest
Source: https://en.wikipedia.org/wiki/Hamming_weight
Retrieved: 2026-03-21
Crawled bytes: 164851

Attribution
Content extracted from Wikipedia article 'Hamming weight' (en.wikipedia.org). Size of crawl: 164851 bytes.

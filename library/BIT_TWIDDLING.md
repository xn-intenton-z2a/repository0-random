BIT_TWIDDLING

Table of contents
1. Purpose
2. Brian Kernighan algorithm
3. Parallel (32-bit) popcount algorithm (step sequence and masks)
4. Performance considerations
5. Implementation notes for JavaScript
6. Reference digest and attribution

1. Purpose
This document extracts the concrete bit-counting algorithms and constants commonly used to implement fast popcount (Hamming weight) for fixed-width integers.

2. Brian Kernighan algorithm (explicit loop)
- Description: repeatedly clear the lowest set bit until the value is zero.
- Steps:
  - count = 0
  - while n != 0:
    - n = n & (n - 1)
    - count++
  - return count
- Works for arbitrary-width integers (BigInt) and is efficient for sparse bitsets.

3. Parallel (32-bit) popcount algorithm (step sequence and masks)
- A fast fixed-width sequence for 32-bit unsigned integers (apply these operations using unsigned 32-bit arithmetic):
  1) n = n - ((n >> 1) & 0x55555555)
  2) n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
  3) n = (n + (n >> 4)) & 0x0F0F0F0F
  4) n = n + (n >> 8)
  5) n = n + (n >> 16)
  6) return n & 0x3F
- This produces the popcount for 32-bit inputs using a handful of arithmetic and bitwise operations.

4. Performance considerations
- For 32-bit inputs and performance-critical code, the parallel method has low and predictable latency.
- For arbitrary-width integers or when correctness for >32-bit inputs is required, use BigInt with Kernighan's algorithm.
- For dense bitsets, the parallel method (fixed width) can outperform Kernighan; for sparse bitsets Kernighan is typically fastest.

5. Implementation notes for JavaScript
- Because JavaScript Number bitwise operations coerce to 32-bit signed integers, implement the parallel method only for inputs that are guaranteed to be within 32-bit unsigned range. Use >>>0 to coerce to unsigned 32-bit when safe.
- For general-purpose library functions, prefer a BigInt-based Kernighan implementation and expose an optional 32-bit-optimized path named e.g., popcount32 for callers who can guarantee 32-bit operands.

6. Reference digest and attribution
- Source: http://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel (Bit Twiddling Hacks)
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 97,985
- Attribution: Sean Eron Anderson, Bit Twiddling Hacks (page states code snippets are public domain; consult page for original terms)

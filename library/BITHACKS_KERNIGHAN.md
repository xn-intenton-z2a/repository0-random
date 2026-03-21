BITHACKS_KERNIGHAN

Table of contents
- Overview
- Kernighan popcount algorithm (description)
- Algorithm steps (detailed)
- Complexity and suitability
- Adaptation for BigInt (JS)
- Reference code patterns (pseudocode)
- Retrieval digest and attribution

Overview
Kernighan's algorithm is an efficient method to count set bits (Hamming weight/popcount) in an integer by repeatedly clearing the lowest-set bit until zero; it executes once per set bit rather than once per bit position.

Kernighan popcount algorithm (description)
- For unsigned integer x, loop while x != 0:
  - x = x & (x - 1) clears the lowest-set bit
  - increment count
- The number of iterations equals the number of 1 bits.

Algorithm steps (detailed)
1. Initialize count = 0.
2. While x != 0:
   a. x = x & (x - 1)
   b. count = count + 1
3. Return count.

Complexity and suitability
- Time complexity: O(k) where k is the number of set bits. For sparse bitsets this is significantly faster than scanning all bit positions.
- Works for fixed-width integers and can be adapted to arbitrary-width integers (BigInt) by performing bigint bitwise & and subtraction operations.

Adaptation for BigInt (JS)
- Use bigint operands and bigint operators: while (x !== 0n) { x = x & (x - 1n); count++; }
- Ensure x is non-negative when counting bits for unsigned semantics; for signed two's complement semantics additional handling required.

Reference code patterns (pseudocode)
- JavaScript BigInt-adapted pseudocode:
  function popcountBigInt(x) {
    if (typeof x !== 'bigint') throw new TypeError('expected bigint');
    let count = 0n;
    while (x !== 0n) {
      x = x & (x - 1n);
      count++;
    }
    return Number(count); // or keep bigint if needed
  }

Retrieval digest
- Source: Bit Twiddling Hacks — Kernighan popcount section
- Retrieved: 2026-03-21
- Approx. downloaded HTML: ~100 KB

Attribution and data size
- Source URL: https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan
- Retrieved: 2026-03-21
- License: public domain code snippets (see page), aggregate copyright to author for descriptions

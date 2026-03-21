MDN_BITWISE_XOR

Table of contents
- Operator definition
- Behavior with signed/unsigned numbers
- Using XOR for Hamming distance between integers
- Implementation notes and examples

Operator definition
- ^ is the bitwise XOR operator. For two 32-bit integer operands, it returns a 32-bit result where each bit is 1 if the corresponding bits of the operands differ.

Behavior with signed/unsigned numbers
- JavaScript performs bitwise operators on 32-bit signed integers; operands are converted via ToInt32. To treat numbers as unsigned 32-bit values, use >>> 0.

Using XOR for Hamming distance
- For two non-negative integers a and b, compute x = (a ^ b) >>> 0 (ensure unsigned) or use BigInt version for values outside 32-bit range: x = BigInt(a) ^ BigInt(b).
- Count set bits in x (popcount) to get Hamming distance. For BigInt use Kernighan loop with BigInt operations.

Implementation notes
- Validate inputs: ensure numeric integers and non-negative. For Number type validate Number.isInteger(a) and a >= 0; for large integers use BigInt.
- Example steps:
  1. If inputs are BigInt: x = a ^ b; count bits with while (x !== 0n) { x &= x - 1n; ++count }
  2. If inputs are Number within 32-bit: x = (a ^ b) >>> 0; count bits with Kernighan using x &= x - 1

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
Retrieved: 2026-03-21
Crawled bytes: 195972

Attribution
Content extracted from MDN Web Docs 'Bitwise XOR (^)'. Size of crawl: 195972 bytes.

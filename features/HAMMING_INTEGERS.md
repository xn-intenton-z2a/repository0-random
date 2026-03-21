# HAMMING_INTEGERS

Summary
A feature to implement bit-level Hamming distance between non-negative integers. Supports both Number (32-bit path) and BigInt without silent truncation.

Motivation
JavaScript Numbers are subject to 32-bit truncation when using bitwise operators; to meet correctness for large integers and the mission acceptance criteria, the implementation must support BigInt and explicit validation.

Specification
- Export a named function hammingDistanceIntegers(a, b) from src/lib/main.js.
- Inputs: accept Number or BigInt for each argument. If types are mixed, coerce both to BigInt and run the BigInt path (document performance implications).
- Validation:
  - If an argument is neither a Number nor a BigInt, throw TypeError.
  - If a Number argument is not an integer (Number.isInteger false), throw TypeError.
  - If any numeric value is negative, throw RangeError.
- Behavior:
  - Number path: when both args are Numbers and both are in the safe 0..0xFFFFFFFF range, compute XOR using (a ^ b) coerced to unsigned 32-bit and return popcount using a 32-bit SWAR or Kernighan popcount.
  - BigInt path: convert operands to BigInt and compute X = A ^ B; count set bits using Kernighan loop with BigInt arithmetic and return a Number count.
  - For mixed-type calls or Numbers outside 0..0xFFFFFFFF, prefer the BigInt path to avoid truncation.

Acceptance criteria
- Bit-level Hamming distance between 1 and 4 is 2.
- Bit-level Hamming distance between 0 and 0 is 0.
- Large integer inputs that exceed 32 bits are handled via BigInt and do not silently truncate.
- Passing a negative integer throws RangeError.

Notes
- The function should return a regular Number for the count; document that extremely large bit-widths may produce very large counts but typical usage will stay within safe Number ranges.
# HAMMING_INTEGERS

Summary
A feature specifying bit-level Hamming distance for non-negative integers. The repository exposes this functionality as the named export hammingBits from src/lib/main.js and must handle both Number and BigInt inputs without silent truncation.

Motivation
Bitwise operators in JavaScript can silently truncate Numbers to 32 bits; to meet correctness and the mission acceptance criteria large integers must be handled via a BigInt path.

Specification
- Export a named function hammingBits(a, b) from src/lib/main.js.
- Inputs: accept Number (integer) or BigInt for each argument. If types are mixed, coerce both to BigInt and use the BigInt path.
- Validation:
  - If an argument is neither a Number nor a BigInt, throw TypeError.
  - If a Number argument is not an integer (Number.isInteger false), throw TypeError.
  - If any numeric value is negative, throw RangeError.
- Behavior:
  - Normalize to BigInt for bitwise comparison when either input is BigInt or when Number inputs could be larger than 32 bits.
  - Compute XOR (a ^ b) using BigInt arithmetic when necessary, and count set bits using a loop (Kernighan or equivalent). Return the count as a Number.
  - The function must not silently truncate higher bits for large inputs.

Acceptance criteria
- Bit-level Hamming distance between 1 and 4 is 2.
- Bit-level Hamming distance between 0 and 0 is 0.
- Large integer inputs that exceed 32 bits are handled via BigInt and do not silently truncate.
- Passing a negative integer throws RangeError.

Notes
- The function returns a regular Number count; for extremely large bit widths the numeric count may exceed typical ranges but must be correct.

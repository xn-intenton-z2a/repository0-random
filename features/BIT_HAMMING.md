# BIT_HAMMING

Purpose

Specify a feature that computes Hamming distance at the bit level for non-negative integers.

Behavior

- Export a named function hammingDistanceBits(a, b).
- Accept Numbers (integers within safe integer range) and BigInt values; mixing types must coerce safely (prefer coercion to BigInt after validation) or reject with TypeError if ambiguous.
- Validate inputs: throw TypeError for non-integer types, throw RangeError for negative values.
- Compute the bitwise exclusive-or of the inputs and return the number of set bits (popcount) in the result.
- Use a simple, deterministic algorithm (Kernighan's loop or byte lookup) that works for both Number and BigInt representations.

Acceptance criteria

- Bit-level Hamming distance between 1 and 4 is 2.
- Bit-level Hamming distance between 0 and 0 is 0.
- Passing negative integers throws RangeError.
- Passing non-integer types throws TypeError.
- Function is exported as a named export from src/lib/main.js and covered by unit tests in tests/unit/.

Notes

- When using Number, ensure values are within Number.MAX_SAFE_INTEGER; for larger integers prefer BigInt and document behaviour in README.
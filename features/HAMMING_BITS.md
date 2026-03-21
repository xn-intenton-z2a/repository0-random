# HAMMING_BITS

Summary

Implement bit-level Hamming distance between two non-negative integers by counting differing bits.

Specification

- Provide a named export function hammingDistanceBits(a, b) in src/lib/main.js.
- Acceptable input types are integer Number values and BigInt. Non-integer or other types must cause TypeError.
- Negative integers must cause RangeError.
- Convert both inputs to BigInt internally, compute the bitwise XOR, and count set bits in the result to determine the Hamming distance.
- The function must handle values larger than Number.MAX_SAFE_INTEGER by using BigInt, and must return a JavaScript Number for the count.

API

- Named export: hammingDistanceBits
- Signature: hammingDistanceBits(a, b) -> number
- Behavior: supports Number integers and BigInt, performs validation and returns the count of differing bits.

Acceptance Criteria

- Bit-level Hamming distance between 1 and 4 is 2.
- Bit-level Hamming distance between 0 and 0 is 0.
- Calling hammingDistanceBits with a negative integer must throw RangeError.
- Calling hammingDistanceBits with a non-integer Number or non-integer type must throw TypeError.
- hammingDistanceBits supports very large integers via BigInt; include a unit test for large values beyond 2**53.

Implementation Notes

- Convert inputs to BigInt after validation: let x = BigInt(a); let y = BigInt(b); let z = x ^ y; then count one bits using a loop shifting z right until zero.
- Ensure the returned count is a safe Number (counts of differing bits will fit in JS Number for realistic inputs).

Tests

- Add unit tests for small integers, zero, negative validation, non-integer validation, and very large BigInt inputs.
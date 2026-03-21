# HAMMING_BITS

Summary

Bit-level Hamming distance between two non-negative integers by counting differing bits.

Specification

- Provide a named export function hammingBits(a, b) in src/lib/main.js.
- Acceptable input types are integer Number values (Number.isInteger must be true). Non-number types or non-integer numbers must cause TypeError.
- Negative integers must cause RangeError.
- Implementation may use BigInt internally for the XOR and bit-counting to avoid precision issues when manipulating bits.
- The function returns a JavaScript Number representing the count of differing bits.

API

- Named export: hammingBits
- Signature: hammingBits(a, b) -> number
- Behavior: accepts two non-negative integer Number values, validates input, computes XOR using BigInt internally, and returns the number of set bits in the XOR result.

Acceptance Criteria

- Bit-level Hamming distance between 1 and 4 is 2.
- Bit-level Hamming distance between 0 and 0 is 0.
- Calling hammingBits with a negative integer throws RangeError.
- Calling hammingBits with a non-integer Number or non-number type throws TypeError.
- Implementation uses BigInt internally for safe bitwise operations; unit tests include a large-integer case (e.g., 2**40 + 3 vs 3) to validate behaviour.

Implementation Notes

- Validate inputs with Number.isInteger before converting to BigInt: let x = BigInt(a); let y = BigInt(b); compute z = x ^ y; count set bits by shifting until zero.
- Do not claim direct BigInt input support unless the implementation and tests explicitly accept BigInt values.
# BIT_HAMMING

Summary

Implement Hamming distance for non-negative integers by counting differing bits. The implementation must be precise for arbitrary non-negative integer inputs that fit within JavaScript BigInt/Number semantics allowed by the repository and must validate inputs: throw TypeError for non-number/BigInt and RangeError for negative integers.

Behavior

- Export a named function hammingBits(a, b) from src/lib/main.js.
- Accept only non-negative integers (Number that are safe integers or BigInt). If inputs are Number, validate Number.isInteger and value >= 0; if BigInt, accept value >= 0n.
- If either input is negative, throw RangeError.
- If either input is not an integer type (e.g. string, float), throw TypeError.
- Compute differing bits using XOR and a population count (popcount) algorithm; support large values using BigInt where appropriate.

Acceptance criteria

- hammingBits(1, 4) returns 2 (001 vs 100).
- hammingBits(0, 0) returns 0.
- Passing a negative integer throws RangeError.
- Passing a non-integer or non-number/BigInt throws TypeError.
- Unit tests exist in tests/unit/main-bits.test.js covering normal, edge and error cases, including at least one large integer case.

Notes

- Prefer using BigInt internally if either argument is BigInt or if the implementation would otherwise overflow; keep API simple for users by accepting Number and BigInt.
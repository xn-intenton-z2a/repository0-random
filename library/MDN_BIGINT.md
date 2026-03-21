MDN_BIGINT

Table of contents

1. Overview
2. Creating BigInt values
3. Arithmetic and mixed-type rules
4. Bitwise and integer operations
5. Utility methods: asIntN/asUintN
6. Errors and edge cases
7. Supplementary details
8. Reference signatures
9. Digest and retrieval metadata
10. Attribution

1. Overview
BigInt is a built-in ECMAScript primitive type for whole integers of arbitrary magnitude.
BigInt literals are written with an n suffix (e.g., 123n) or created with the BigInt() constructor (BigInt("123")).
BigInt preserves exact integer values beyond Number.MAX_SAFE_INTEGER.

2. Creating BigInt values
- Literal form: 0n, 1n, 9007199254740992n
- Constructor: BigInt(value) accepts string or number or BigInt; passing a Number may lose precision before conversion.
- Common patterns: BigInt("12345678901234567890") or 12345678901234567890n.

3. Arithmetic and mixed-type rules
- BigInt and Number cannot be mixed in binary arithmetic without explicit conversion: adding a Number to a BigInt throws TypeError.
- Convert explicit: Number(bn) to convert to Number (may lose precision), or BigInt(n) to convert Number to BigInt (only for integral Number values).
- Comparison operators (==, ===, <, >) follow standard JS semantics; strict equality between differing types is false.

4. Bitwise and integer operations
- BigInt supports integer arithmetic and bitwise operations when both operands are BigInt. Mixing with Number is not allowed.
- Shift and bitwise operators accept BigInt operands and return BigInt results when both sides are BigInt.

5. Utility methods: asIntN/asUintN
- BigInt.asIntN(width, bigint) returns the two's complement signed value of bigint truncated to width bits as a BigInt.
- BigInt.asUintN(width, bigint) returns the unsigned value of bigint truncated to width bits as a BigInt.
- Usage: BigInt.asUintN(32, myBigInt) — useful for masking and emulating fixed-width integer arithmetic.

6. Errors and edge cases
- BigInt(1.5) throws RangeError if a non-integer Number is passed to BigInt() conversion.
- Careful with JSON: JSON.stringify(1n) throws TypeError; BigInt is not JSON-serializable by default.

7. Supplementary details
- Use BigInt for precise integer bit-level operations on large integers.
- Convert to Number only when necessary for APIs that require Number and the value is within safe range.

8. Reference signatures
- BigInt(value): value: string|number|BigInt -> BigInt
- BigInt.asIntN(width: number, bigint: BigInt) -> BigInt
- BigInt.asUintN(width: number, bigint: BigInt) -> BigInt

9. Digest and retrieval metadata
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
- Retrieved: 2026-03-21
- Bytes downloaded from MDN page: 176888 bytes

10. Attribution
Content condensed from MDN Web Docs: BigInt - JavaScript (MDN).
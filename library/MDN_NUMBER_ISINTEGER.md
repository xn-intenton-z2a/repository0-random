MDN_NUMBER_ISINTEGER

Table of contents

1. Purpose
2. Behavior and return values
3. Edge cases
4. Usage in validation
5. Reference signature
6. Digest and retrieval metadata
7. Attribution

1. Purpose
Number.isInteger(value) tests whether value is an integer (of type Number) without coercion.

2. Behavior and return values
- Returns true only for values of type Number that are finite and whose fractional part is zero.
- Examples: Number.isInteger(1) -> true; Number.isInteger(1.0) -> true; Number.isInteger(1.5) -> false; Number.isInteger('1') -> false.

3. Edge cases
- Number.isInteger(Infinity) -> false; NaN -> false.
- BigInt values are not Numbers; Number.isInteger(1n) -> false.

4. Usage in validation
- Useful to validate inputs before converting to BigInt or performing bit-level operations that require integer inputs.
- Combine with type checks: typeof value === 'number' && Number.isInteger(value).

5. Reference signature
- Number.isInteger(value: any) -> boolean

6. Digest and retrieval metadata
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
- Retrieved: 2026-03-21
- Bytes downloaded from MDN page: 158942 bytes

7. Attribution
Condensed from MDN Web Docs: Number.isInteger() - JavaScript (MDN).
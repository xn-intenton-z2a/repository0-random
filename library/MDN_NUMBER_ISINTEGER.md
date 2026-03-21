MDN_NUMBER_ISINTEGER

Normalised extract

Table of contents
1. Signature and return semantics
2. Edge cases (NaN, Infinity, boxed Number)
3. Implementation and usage for input validation

1. Signature and return semantics
Number.isInteger(value) -> boolean. Returns true only when typeof value === 'number' and the value is finite and mathematically an integer (value === Math.trunc(value)). It does not coerce non-number types.

2. Edge cases
- Number.isInteger(NaN) === false
- Number.isInteger(Infinity) === false
- Number.isInteger(3.0) === true
- Number.isInteger(new Number(3)) === false because new Number(3) is an object

3. Implementation and usage for input validation
For bit-level Hamming distance accepting JavaScript Numbers, validate with: if (!Number.isInteger(x) || x < 0) throw TypeError/RangeError as appropriate. For portable validation that accepts BigInt as well, test typeof x === 'bigint' or (typeof x === 'number' && Number.isInteger(x)). Do not rely on parseInt or implicit coercion.

Supplementary details
- Number.isInteger is a narrow predicate: it returns true only for primitive number values that are integral.
- Use this function to decide whether to call BigInt conversion or to raise errors for non-integer numeric input.

Reference details (API)
- Number.isInteger(value) -> boolean
  - Parameters: value: any
  - Returns: boolean (true if value is a primitive number and an integer)
  - Effects: none (pure predicate)

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
Retrieved: 2026-03-21
Bytes fetched: 154170
Key technical facts taken from the source: Number.isInteger tests primitive numbers only and does not perform coercion; NaN and Infinity return false; values that are numeric objects return false.

Attribution
URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
Bytes fetched: 154170

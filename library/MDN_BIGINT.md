MDN_BIGINT

Normalised extract

Table of contents
1. Overview and syntax
2. Arithmetic and bitwise operator support
3. Type coercion and mixing rules (errors)
4. Implementation pattern for bit-level Hamming (popcount)
5. Validation and usage guidance

1. Overview and syntax
BigInt is a JavaScript primitive representing integers of arbitrary precision. Literals use a trailing n (for example 123n). BigInt values can be created via the BigInt() function: BigInt(value) returns a BigInt when value represents an integer.

2. Arithmetic and bitwise operator support
BigInt supports standard arithmetic operators: +, -, *, /, %, **, unary -; and bitwise operators: &, |, ^, ~, <<, >>. All operators applied to BigInt operands yield BigInt results.

3. Type coercion and mixing rules (errors)
BigInt and Number do not intermix implicitly. Using a Number with a BigInt in arithmetic or bitwise operations throws TypeError. Converting a non-integer Number to BigInt via BigInt(number) throws a RangeError when number is not an integer.

4. Implementation pattern for bit-level Hamming (popcount)
To compute differing bits between two integer values a and b for arbitrary-precision integers: convert both to BigInt, compute xor = BigInt(a) ^ BigInt(b), then count set bits using Brian Kernighan's method: initialize count = 0; while xor != 0n { xor = xor & (xor - 1n); count += 1 }. Return count as a normal Number. This pattern works for values larger than 2**53.

5. Validation and usage guidance
Use typeof operand === 'bigint' to detect BigInt values. When accepting numbers from callers, prefer Number.isInteger(x) and x >= 0 for Number inputs; or coerce to BigInt with BigInt(x) after validating integer-ness.

Supplementary details
- BigInt is a primitive, not an object wrapper.
- BigInt literals: 0n, 1n, 12345678901234567890n.
- BigInt division truncates toward zero and returns a BigInt result.
- Performance: BigInt arithmetic is slower than native 32/64-bit ops; popcount loop using x &= x - 1n runs in O(popcount).

Reference details (API specs and implementation patterns)
- BigInt(value) -> bigint
  - Parameters: value: number | string | bigint. If value is a Number that is not an integer, BigInt(value) throws RangeError. Strings must represent integer values.
  - Return: bigint
- Operators on BigInt: + - * / % ** &, |, ^, ~, <<, >> (both operands must be bigint; mixing throws TypeError)

Hamming bit distance implementation pattern (concise):
- Signature: hammingBits(a:number|bigint, b:number|bigint) -> number
- Validation: if typeof a === 'number' and !Number.isInteger(a) then throw TypeError; if a < 0 then throw RangeError; same for b. Prefer coercion to BigInt: A = (typeof a === 'bigint') ? a : BigInt(a); B = (typeof b === 'bigint') ? b : BigInt(b).
- Core: X = A ^ B; count = 0; while (X !== 0n) { X &= X - 1n; count++; } return count;

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
Retrieved: 2026-03-21
Bytes fetched: 171541
Key technical facts taken from the source: BigInt is the arbitrary-precision integer primitive; BigInt literals use an 'n' suffix; BigInt(value) converts integer-like values and throws RangeError for non-integer Numbers; BigInt and Number are not implicitly mixed; bitwise operators exist for BigInt and operate on bigint operands only. The popcount pattern using x &= x - 1n is a direct, efficient method for counting set bits in BigInt values.

Attribution
URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
Bytes fetched: 171541

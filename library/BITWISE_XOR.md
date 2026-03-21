Title: BITWISE_XOR

Table of contents
- Operator semantics in JavaScript
- Numeric coercion and 32-bit conversion rules
- BigInt XOR behavior
- Exact recipe: XOR + popcount for Hamming distance
- Edge cases and validation rules
- Examples
- Digest and attribution

Operator semantics in JavaScript
- Bitwise XOR operator: a ^ b
- For Number operands, ECMAScript ToInt32 conversion is applied: operands are converted to signed 32-bit integers, operation performed, result is a signed 32-bit integer.
- Use >>> 0 to obtain the unsigned 32-bit result when needed.

Numeric coercion and 32-bit conversion rules
- When using ^ with Numbers, values larger than 32 bits are truncated to 32-bit signed integers; this will change high bits. For Hamming distance on large integers, do not rely on Number ^ Number unless inputs are guaranteed to fit 32 bits.

BigInt XOR behavior
- BigInt supports bitwise XOR with the ^ operator when both operands are BigInt: BigInt(a) ^ BigInt(b). No truncation occurs; bit-width is arbitrary.
- When using BigInt path, use BigInt arithmetic and BigInt popcount loop (x &= x - 1n).

Exact recipe: XOR + popcount
- Step 1: validate types and non-negativity.
- Step 2: compute XOR: x = a ^ b (Number path, ensuring unsigned conversion if needed) or X = BigInt(a) ^ BigInt(b) (BigInt path).
- Step 3: popcount: use efficient 32-bit SWAR for Number path or Kernighan loop for both Number and BigInt: while (x) { count++; x &= x - 1 } (append n suffix for BigInt).

Edge cases and validation rules
- If type is not Number or BigInt, throw TypeError. If negative, throw RangeError.
- If mixed types provided, convert both to BigInt explicitly and document performance implications.

Examples
- 1 ^ 4 = 5; popcount(5) = 2 -> Hamming distance 2.
- BigInt(2)**BigInt(100) differences: use BigInt path.

Digest
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
- Retrieval date: 2026-03-21
- Bytes retrieved during crawl: 190588

Attribution
MDN operator documentation, retrieved 2026-03-21; size 190588 bytes.

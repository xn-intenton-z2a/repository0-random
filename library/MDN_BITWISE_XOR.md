MDN_BITWISE_XOR

Table of contents
1. Operator semantics (Number vs BigInt)
2. Effects of ToInt32 conversion for Number operands
3. BigInt XOR behavior
4. Guidance for bit-level Hamming distance
5. API-level recommendations
6. Reference digest and attribution

1. Operator semantics (Number vs BigInt)
- In JavaScript, the ^ operator is overloaded:
  - Number ^ Number: both operands are coerced to 32-bit signed integers (ToInt32). The result is a 32-bit signed integer which is then returned as a Number (floating point representation).
  - BigInt ^ BigInt: performs bitwise XOR on BigInt values and returns a BigInt. Both operands must be BigInt; mixing Number and BigInt throws a TypeError.

2. Effects of ToInt32 conversion for Number operands
- Using ^ on Number values truncates to 32 bits and sign-extends; therefore bitwise operations on Numbers do not preserve bits beyond 32 bits. Values larger than 2^31-1 will be wrapped/truncated. Do not rely on Number ^ Number for >32-bit integer arithmetic.

3. BigInt XOR behavior
- BigInt supports arbitrary-width integer bitwise XOR. For bit-level Hamming distance on unrestricted non-negative integers, convert operands to BigInt and use BigInt ^ BigInt.

4. Guidance for bit-level Hamming distance
- Recommended implementation pattern:
  - Validate inputs are integer-like and non-negative
  - Convert to BigInt: A = BigInt(a); B = BigInt(b)
  - D = A ^ B  (BigInt)
  - popcount(D) using a BigInt-safe popcount implementation (e.g., Kernighan loop with BigInt arithmetic)

5. API-level recommendations
- For library functions dealing with bits, choose BigInt internally to avoid surprising truncation on Numbers. Document performance trade-offs (BigInt operations are slower but correct for arbitrary precision).

6. Reference digest and attribution
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 190,588
- Attribution: MDN Web Docs (Mozilla)

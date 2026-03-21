MDN_BIGINT

Table of contents
- Overview
- Creation and literals
- Allowed operations and semantics
- Interop with Number
- Utility APIs
- Implementation notes and best practices
- Reference signatures
- Retrieval digest and attribution

Overview
BigInt is a built-in JavaScript primitive representing arbitrary-precision integers. Use BigInt for integers larger than Number.MAX_SAFE_INTEGER or when precise integer arithmetic is required.

Creation and literals
- Literal: append an `n` to an integer literal: 123n produces a bigint with value 123.
- Constructor/coercion: BigInt(value) returns a bigint. Passing a Number truncates fractional part (e.g., BigInt(1.9) === 1n). Passing string requires a valid integer string optionally prefixed by 0x/0o/0b.

Allowed operations and semantics
- Arithmetic operators supported: + - * ** % / (division truncates toward zero). Example: 5n / 2n === 2n.
- Bitwise operators operate on bigint operands: &, |, ^, ~, <<, >> behave on two's complement infinite-width big integers.
- Comparison: relational operators (<, >, <=, >=) and equality (===, !==) work between bigint and bigint. Strict equality between BigInt and Number is always false; use numeric conversion carefully.

Interop with Number
- Cannot mix BigInt and Number with arithmetic operators; doing so throws TypeError. Convert explicitly:
  - Number to BigInt: BigInt(42) (note truncation of fractional part)
  - BigInt to Number: Number(42n) (may lose precision)

Utility APIs
- BigInt.asIntN(width, bigint) -> bigint: returns signed integer truncated to width bits.
- BigInt.asUintN(width, bigint) -> bigint: returns unsigned integer truncated to width bits.
- bigint.toString([radix]) -> string: converts to string in given radix.

Implementation notes and best practices
- Use BigInt for bit-level Hamming distances when integers may exceed Number.MAX_SAFE_INTEGER or precise bit patterns are required.
- For non-negative integer requirements, either validate typeof x === 'bigint' or accept Number and convert with explicit checks, throwing TypeError for invalid types.
- When counting differing bits between two integers that may be BigInt, use XOR on bigint operands then popcount the resulting bigint; popcount implementation must support bigint loops (shift/right and mask) or repeated Kernighan method adapted to bigint.

Reference signatures
- BigInt(value) -> bigint
- BigInt.asIntN(bits: number, x: bigint) -> bigint
- BigInt.asUintN(bits: number, x: bigint) -> bigint
- bigint.toString(radix?: number) -> string
- typeof 123n === 'bigint'

Retrieval digest
- Source: MDN BigInt documentation
- Retrieved: 2026-03-21
- Notes: Extracted creation patterns, operator semantics, interop rules and utility APIs important for implementing integer Hamming distances.

Attribution and data size
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
- Retrieved: 2026-03-21
- Approx. downloaded HTML: ~170 KB
- License: MDN content (see MDN site for license and reuse terms)

WIKIPEDIA_HAMMING_DISTANCE

Table of contents
- Definition
- Mathematical properties
- Use cases and examples
- Implementation patterns (strings)
- Troubleshooting and edge cases

Definition
The Hamming distance between two strings of equal length is the number of positions at which the corresponding symbols are different. For binary vectors or integers, it is the number of differing bits.

Mathematical properties
- d(x,y) >= 0
- d(x,y) = d(y,x)
- d(x,y) satisfies triangle inequality for Hamming space
- For strings of length n, maximum distance = n

Use cases and examples
- Error detection and correction codes: codewords compared position-wise
- Example: "karolin" vs "kathrin" => positions differing: 3 => distance 3

Implementation patterns (strings)
- Validate inputs are strings and same length; otherwise throw TypeError or RangeError respectively.
- Compare by code points (not UTF-16 code units): iterate code points of both strings in parallel and count mismatches.
- For Unicode-aware iteration use language constructs that iterate code points (see MDN String iterator and codePointAt references).

Troubleshooting and edge cases
- Unequal lengths: raise RangeError.
- Surrogate pairs: ensure iteration uses code points to avoid splitting surrogates.
- Empty strings: distance 0.

Supplementary details
- For language implementations, represent strings as sequences of Unicode code points; never compare using .length when surrogate pairs may exist.
- Use Array.from(str) or for...of to iterate code points reliably.

Reference details (implementation guidance)
- Function signature examples (JS, named exports):
  - hammingString(a, b) -> number
    - Parameters: a: string, b: string
    - Throws: TypeError if inputs not strings; RangeError if lengths differ
    - Behaviour: iterate code points, count differing code points, return integer >=0

- Exact step algorithm:
  1. If typeof a !== 'string' or typeof b !== 'string' -> throw TypeError
  2. Convert to arrays of code points: A = Array.from(a); B = Array.from(b)
  3. If A.length !== B.length -> throw RangeError
  4. let count = 0; for i in 0..A.length-1: if A[i] !== B[i] then count++
  5. return count

Detailed digest
Source: https://en.wikipedia.org/wiki/Hamming_distance
Retrieved: 2026-03-21
Crawled bytes: 166030

Attribution
Content extracted from Wikipedia article 'Hamming distance' (en.wikipedia.org). Size of crawl: 166030 bytes.

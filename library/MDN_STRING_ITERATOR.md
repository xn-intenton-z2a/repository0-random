MDN_STRING_ITERATOR

Table of contents
- Purpose and behaviour
- Iteration semantics (for...of and Array.from)
- Equivalence to code point arrays
- Implementation notes for parallel iteration

Purpose and behaviour
- String.prototype[Symbol.iterator]() yields Unicode code point strings (each iteration step returns a string containing a single Unicode code point). This means surrogate pairs are not split.

Iteration semantics
- Using for (const ch of str) iterates code points, not UTF-16 code units.
- Array.from(str) produces an array of code point strings equivalent to [...str]. Use this to obtain a sequence of comparable elements for two strings.

Equivalence to code point arrays
- Let A = Array.from(a); B = Array.from(b); then A.length and B.length reflect code point counts; comparing elements A[i] === B[i] is correct for Hamming distance.

Implementation notes for parallel iteration
- To compute Hamming distance between strings a and b:
  1. if typeof a !== 'string' or typeof b !== 'string' -> throw TypeError
  2. A = Array.from(a); B = Array.from(b)
  3. if A.length !== B.length -> throw RangeError
  4. count mismatches by comparing A[i] and B[i]

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/%40%40iterator
Retrieved: 2026-03-21
Crawled bytes: 165457

Attribution
Content extracted from MDN Web Docs 'String.prototype[Symbol.iterator]()'. Size of crawl: 165457 bytes.

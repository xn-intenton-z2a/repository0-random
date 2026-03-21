NORMALISED EXTRACT

Table of contents
- Array construction patterns
- Array.from signature
- Sparse arrays and new Array(n)
- Common iteration & mapping methods

Array construction patterns (detailed)
- Array.from(arrayLike, mapFn?, thisArg?) -> Array
  - Use to create arrays from length descriptors: Array.from({ length: n }, (_, i) => fn(i))
- new Array(n) creates a sparse array of length n; mapping directly on it can be surprising because slots are empty; prefer new Array(n).fill(0).map((_, i) => ...) or Array.from.
- Pushing elements: Array.prototype.push(...items) appends and returns new length; push is amortized O(1).

Iteration & mapping
- for loop: for (let i = 1; i <= n; i++) { ... } is simplest and minimal overhead.
- Array.prototype.map(fn) returns new array with results of calling fn for each element.

Reference details (method signatures)
- Array.from(arrayLike[, mapFn[, thisArg]]) -> Array
- Array.prototype.push(...items) -> number (new length)
- Array.prototype.map(callback[, thisArg]) -> Array
- length property: arr.length -> number

Implementation guidance (for fizzBuzz)
- For predictable behaviour and to avoid sparse arrays, use either:
  - for-loop allocation and assignment to pre-sized array
  - Array.from({length: n}, (_, i) => fizzBuzzSingle(i + 1))
- Avoid new Array(n).map(...) without fill; it produces unexpected empty slots.

DETAILED DIGEST
Source: MDN Web Docs — Array (retrieved 2026-03-21)
Crawl bytes: 236066
Extracted technical content (condensed): Array construction, Array.from signature (mapFn optional), differences between sparse arrays and filled arrays, and common iteration/mapping primitives used to produce fixed-length arrays for sequences.

ATTRIBUTION
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
Retrieved: 2026-03-21
Bytes retrieved: 236066

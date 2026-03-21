NORMALISED EXTRACT

Table of contents
- RangeError constructor and semantics
- When to throw RangeError in FizzBuzz

RangeError constructor and semantics
- Signature: RangeError([message]) -> RangeError instance
- RangeError indicates a value not in the set or range of allowed values.

When to throw RangeError in FizzBuzz
- Use RangeError for inputs outside the allowed numeric range (e.g., n < 0).
- Exact recommended check (plain text): if (n < 0) throw new RangeError('n must be non-negative')

DETAILED DIGEST
Source: MDN Web Docs — RangeError (retrieved 2026-03-21)
Crawl bytes: 155931
Extracted technical content (condensed): constructor semantics and recommended usage for signalling out-of-range numeric values.

ATTRIBUTION
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError
Retrieved: 2026-03-21
Bytes retrieved: 155931

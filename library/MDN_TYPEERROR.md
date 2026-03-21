NORMALISED EXTRACT

Table of contents
- TypeError constructor and semantics
- When to throw TypeError in FizzBuzz
- Detection patterns

TypeError constructor and semantics
- Signature: TypeError([message]) -> TypeError instance
- TypeError represents an error when an operation could not be performed because a value is not of the expected type.
- Common properties: name === 'TypeError', message string, standard Error prototype chain.

When to throw TypeError in FizzBuzz
- Non-number inputs (typeof n !== 'number')
- Numeric but non-integer inputs (!Number.isInteger(n))
- Exact recommended check (plain text): if (typeof n !== 'number' || !Number.isInteger(n)) throw new TypeError('n must be an integer')

DETAILED DIGEST
Source: MDN Web Docs — TypeError (retrieved 2026-03-21)
Crawl bytes: 154124
Extracted technical content (condensed): TypeError constructor semantics, typical usage and recommended detection patterns for type validation in JavaScript code (use Number.isInteger for integer checks).

ATTRIBUTION
Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
Retrieved: 2026-03-21
Bytes retrieved: 154124

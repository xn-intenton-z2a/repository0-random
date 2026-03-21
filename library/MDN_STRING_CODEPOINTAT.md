MDN_STRING_CODEPOINTAT

Table of contents
- Purpose and behaviour
- Signature and return values
- Handling surrogate pairs
- Examples of use in implementations
- Edge cases and compatibility

Purpose and behaviour
- String.prototype.codePointAt(pos) returns a non-negative integer that is the UTF-16 code point value at position pos in the string.
- When pos is the index of a high surrogate followed by a low surrogate, codePointAt returns the combined code point value.

Signature and return values
- Signature: str.codePointAt(pos)
- Parameters: pos (number, index into UTF-16 code units). If omitted, pos defaults to 0.
- Returns: integer (the code point) or undefined if pos is out of range.

Handling surrogate pairs
- To correctly iterate Unicode code points by index, use codePointAt to obtain the actual code point when encountering a surrogate pair. However, using Array.from(str) or for...of yields code points directly and is generally preferred for parallel iteration between two strings.

Examples of use in implementations
- For index-based checks, obtain code points at i and compare numeric values for equality.
- Beware that codePointAt takes UTF-16 index; converting strings to code point arrays simplifies length comparisons.

Edge cases and compatibility
- Older environments may not implement codePointAt; polyfills exist.
- For cross-environment correctness, prefer iteration constructs that operate on code points.

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
Retrieved: 2026-03-21
Crawled bytes: 167129

Attribution
Content extracted from MDN Web Docs 'String.prototype.codePointAt()'. Size of crawl: 167129 bytes.

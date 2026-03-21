Title: CODEPOINTAT

Table of contents
- Signature and return values
- Behavior with surrogate pairs
- Usage notes for indexing and iteration
- Examples and exact semantics
- Digest and attribution

Signature and return values
- String.prototype.codePointAt(position) -> number or undefined
- position is a zero-based index into the string's UTF-16 code units. If position is out of range, returns undefined.
- If the code unit at position is the start of a surrogate pair, codePointAt returns the combined code point value (> 0xFFFF). If it's a trailing surrogate, the returned value is the code unit value of that trailing surrogate.

Behavior with surrogate pairs
- Because position indexes code units, to obtain the Nth code point's numeric value, first map code points via Array.from or iterate via for...of and use codePointAt on the code-unit index of the start of the code point only if needed. Simpler: let cp = Array.from(str)[n]; let value = cp.codePointAt(0).

Usage notes
- To check string lengths in code points use Array.from(str).length.
- For Hamming comparisons, do not call codePointAt on raw code-unit indices without ensuring position aligns to code-point boundary.

Examples and exact semantics
- '𝌆' (U+1D306) length is 2 (two code units), Array.from('𝌆').length is 1, '𝌆'.codePointAt(0) => 119558.

Digest
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
- Retrieval date: 2026-03-21
- Bytes retrieved during crawl: 162097

Attribution
MDN codePointAt documentation, retrieved 2026-03-21; size 162097 bytes.

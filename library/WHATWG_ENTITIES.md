WHATWG_ENTITIES

TABLE OF CONTENTS
- Named character references (forms)
- Numeric character references (decimal, hex)
- Regex patterns for detection
- Common mappings (implementation subset)
- Implementation notes and pitfalls
- Supplementary details
- Reference details (exact patterns)
- Digest (excerpt) and retrieval metadata

NORMALISED EXTRACT
Named character references in HTML (the HTML Living Standard) provide mappings from name to one or more Unicode code points. Forms that must be recognised and decoded in input text:
- Named form: &name;  (e.g. &amp;, &lt;, &gt;, &quot;, &nbsp;)
- Decimal numeric form: &#NNN;  (e.g. &#34; => U+0022)
- Hex numeric form: &#xHEX;  (e.g. &#x1F600; => U+1F600)

Key behaviours to implement:
- Match patterns: an implementable detection pattern is &(?:(#x[0-9A-Fa-f]+)|(#\d+)|([A-Za-z][A-Za-z0-9]+));
- Numeric decoding: parse decimal or hex and convert to the Unicode code point string (use code point conversion, not 16-bit code unit splitting, for values > U+FFFF).
- Named decoding: lookup name in the authoritative WHATWG mapping table. Some names map to multi-code-point sequences; decoder must accept and emit sequences where specified.
- Common named mappings (minimal set useful for most use-cases):
  amp -> U+0026 ( & )
  lt -> U+003C ( < )
  gt -> U+003E ( > )
  quot -> U+0022 ( " )
  apos -> U+0027 ( ' )
  nbsp -> U+00A0 ( non-breaking space )

SUPPLEMENTARY DETAILS
- The WHATWG spec defines a comprehensive table of named references. Implementations may either: (a) include a mapping table for all named references, or (b) include a small mapping for common entities and fall back to numeric decoding for &# and &#x forms.
- Some named references are legacy and ambiguous; modern HTML parsers follow the spec exactly, including cases where semicolons are optional for a few legacy names — conservative implementations require the semicolon.
- Because named references can expand to multiple code points, treat the replacement as a sequence insertion, not a single-character replacement.
- For Unicode safety, convert numeric code points into proper UTF-16/UTF-32 code units using language runtime helpers that support code points (for JavaScript use String.fromCodePoint).

REFERENCE DETAILS
- Detection regex (implementation suggestion): &(?:(#x[0-9A-Fa-f]+)|(#\d+)|([A-Za-z][A-Za-z0-9]+));
- Numeric decode algorithm:
  - If match group 1 (hex): value = parseInt(hexDigits, 16);
  - Else if match group 2 (decimal): value = parseInt(decDigits, 10);
  - Replace by the character for the Unicode code point: in JS: String.fromCodePoint(value)
- Named decode algorithm: map the name to its Unicode sequence using the spec table; replace with mapped sequence.
- DOM-based decoding alternative (browser): use DOMParser to parse as text/html and read textContent (see DOM_PARSER doc) — this delegates full spec conformance to the browser DOM.

IMPLEMENTATION NOTES AND TROUBLESHOOTING
- When decoding, always prefer numeric decodes for safety; named decodes require a complete mapping table to be fully spec-compliant.
- Watch out for non-terminated or malformed entities; decide on a policy: ignore, leave as-is, or attempt best-effort decode.
- Entities may appear in contexts where HTML escaping is critical (e.g., attributes) — ensure decoding is used only for text-processing paths where safe.

DIGEST (excerpt from source; retrieved 2026-03-24)
- Source page: HTML Living Standard — named character references (WHATWG)
- Excerpt (start): <!DOCTYPE html><html class=split lang=en-US-x-hixie>... Title: HTML Standard ... (full named-reference table is provided in the spec page)

ATTRIBUTION
- Source: https://html.spec.whatwg.org/multipage/named-character-references.html
- Retrieved: 2026-03-24
- Bytes downloaded: 217468

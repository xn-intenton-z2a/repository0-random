HE_PACKAGE

TABLE OF CONTENTS
1. Purpose and scope
2. Decoding algorithm overview
3. Public API surface (decode/encode) and options
4. Implementation notes and fallbacks
5. Reference details
6. Detailed digest
7. Attribution

NORMALISED EXTRACT:
Purpose: 'he' is a small, fast HTML entity encoder/decoder that converts named and numeric entities to/from characters. It handles named entities, decimal and hexadecimal numeric references, and supports strict and non-strict modes.

CORE BEHAVIOUR:
- decode(input: string, options?) -> string: converts named entities (&amp;nbsp;, &amp;amp;, &amp;copy;, etc.) and numeric entities (&#x27;, &#39;) into their Unicode characters.
- encode(input: string, options?) -> string: escapes characters into named or numeric entities according to options.

IMPLEMENTATION NOTES / USAGE:
- When stripping HTML tags and decoding entities in non-browser contexts, parse tags out first then pass the fragment through an entity decoder; or use DOMParser in browser contexts to both strip tags and decode entities.
- If 'he' is not available, basic numeric entity decoding can be implemented via regex: replace /&#(x?)([0-9A-Fa-f]+);/ and convert to code point. Named-entity decoding requires a lookup table.
- Be aware of security: decoding user-provided attributes should not reintroduce executable markup; decode only after removing tags, or operate on text-only content.

REFERENCE DETAILS:
- API (common forms):
  he.decode(text: string, options?: object) -> string
  he.encode(text: string, options?: object) -> string
- Common options (implementation-specific): useNamedReferences, decimal, strict; consult package docs for full option list.

DETAILED DIGEST (retrieved 2026-03-23):
- NPM page was reached but presented a Cloudflare interstitial; core behaviour of the module and typical API surface are documented in the package README and source. Bytes retrieved during crawl: interstitial returned; fallback to canonical README recommended.

ATTRIBUTION:
NPM / he package (package page)
URL: https://www.npmjs.com/package/he


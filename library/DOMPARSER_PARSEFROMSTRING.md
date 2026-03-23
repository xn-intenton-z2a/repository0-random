DOMPARSER_PARSEFROMSTRING

TABLE OF CONTENTS
1. API signature
2. Parsing modes and accepted MIME types
3. Stripping HTML and entity decoding
4. Differences vs innerHTML
5. Implementation notes and edge cases
6. Reference details
7. Detailed digest
8. Attribution

NORMALISED EXTRACT:
API: DOMParser.parseFromString(markup: string, mimeType: string) -> Document
Accepted mimeType values (examples): 'text/html', 'text/xml', 'application/xml', 'application/xhtml+xml', 'image/svg+xml'. For 'text/html' parseFromString returns an HTMLDocument where standard HTML entity decoding is performed by the parser; access document.body.textContent to obtain decoded, tag-stripped text.

USAGE FOR STRIPHTML/DECODE:
- Coerce input: html = String(input || '')
- Parse: doc = new DOMParser().parseFromString(html, 'text/html')
- Extract text: text = doc.body ? doc.body.textContent : ''
This approach decodes HTML entities as part of the parsing step and returns a plain text representation without markup.

IMPLEMENTATION NOTES:
- parseFromString constructs a document tree; it does not execute script elements from the parsed string.
- For XML mime types, parsing errors are represented inside the returned document (parsererror elements); for HTML mimeType error handling differs by implementation.
- Server-side alternatives: use a safe HTML parser (jsdom, parse5) or a dedicated entity decoder (he) when DOMParser is not available.

EDGE CASES:
- Empty or null input: return empty string.
- Very large inputs: consider streaming or chunked parsing in environments that support it.

REFERENCE DETAILS:
- Signature: new DOMParser().parseFromString(markup, mimeType) -> Document
- Typical strip pattern: doc = new DOMParser().parseFromString(markup, 'text/html'); result = doc.body ? doc.body.textContent : ''

DETAILED DIGEST (retrieved 2026-03-23):
- Extraction from MDN describing parseFromString behaviour and recommended patterns to decode entities and strip tags. Bytes retrieved during crawl: 154.3 KB.

ATTRIBUTION:
MDN Web Docs — DOMParser: parseFromString
URL: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString


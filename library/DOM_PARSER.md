DOM_PARSER

TABLE OF CONTENTS
- API signature
- Parameters and acceptable types
- Return value and behaviour
- Using DOMParser to decode HTML entities safely
- Node.js considerations
- Digest and retrieval metadata

NORMALISED EXTRACT
- API: DOMParser.prototype.parseFromString(sourceString, mimeType) -> Document
- Acceptable mimeType values include (but are not limited to): text/html, application/xml, text/xml, application/xhtml+xml.
- For decoding HTML and obtaining plain text with entities resolved: parse the input with mimeType 'text/html' and then extract the textual representation from document.body.textContent. This yields entity-decoded text according to the browser's parser.

Example plain-text procedure (plain description):
1. Create parser: let parser = new DOMParser();
2. Parse: let doc = parser.parseFromString(htmlString, 'text/html');
3. Extract: let decoded = doc.body ? doc.body.textContent : doc.textContent;

SUPPLEMENTARY DETAILS
- parseFromString for XML mime types returns a document with parsererror nodes on malformed input; for 'text/html' the browser uses its HTML parser and returns a complete Document with a body element.
- The DOMParser API is standard in browsers but not available in Node.js runtime by default. In Node.js use a lightweight HTML parser (e.g., jsdom) or a dedicated entity decoder when DOMParser is not available.
- Using DOMParser to decode entities delegates the full HTML spec behaviour to the browser; this is reliable if the runtime is a browser environment and when the input is trusted for parsing.

REFERENCE DETAILS
- Exact signature: parseFromString(source: string, mimeType: string) -> Document
- Mime types: text/html | application/xhtml+xml | application/xml | text/xml (behaviour differs by type and parser strictness)
- For entity decoding: use document.body.textContent (or document.documentElement.textContent fallback) to obtain decoded text.

DIGEST (excerpt from MDN; retrieved 2026-03-24)
- Source: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
- Excerpt (start): "The DOMParser interface provides the ability to parse XML or HTML source code from a string into a DOM Document."

ATTRIBUTION
- Source: MDN Web Docs — DOMParser
- Retrieved: 2026-03-24
- Bytes downloaded: 146596

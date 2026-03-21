MDN_STRING_NORMALIZE

Normalised extract

Table of contents
1. Purpose and normalization forms
2. Function signature and behavior
3. Relevance to Hamming distance and when to normalize
4. Performance considerations

1. Purpose and normalization forms
String.prototype.normalize([form]) returns a string in the chosen Unicode normalization form. Valid forms: "NFC", "NFD", "NFKC", "NFKD". Default is "NFC".

2. Function signature and behavior
- Signature: str.normalize([form]) -> string
- Parameter: form: optional string, one of NFC|NFD|NFKC|NFKD. If omitted, NFC is used.
- Behavior: Returns a new string where characters are canonical/compatibility composed or decomposed depending on the form.

3. Relevance to Hamming distance and when to normalize
Hamming distance as specified in the mission compares code points, not grapheme clusters. Normalization is orthogonal: if callers expect canonically equivalent sequences to be treated as identical (for example 'é' vs 'e' + combining acute), call normalize('NFC') on both strings before comparing code points. If mission explicitly states only code point comparisons are required, avoid automatic normalization but document the option as a best practice.

4. Performance considerations
Normalization can be expensive for long strings; prefer to document it as optional pre-processing. When normalizing, choose NFC for canonical equivalence in most user-facing comparisons.

Supplementary details
- Normalization converts between composed and decomposed Unicode sequences.
- Use String.prototype.normalize to obtain deterministic code point sequences prior to iteration or codePointAt usage.

Reference details
- String.prototype.normalize([form]) -> string
  - form: "NFC" | "NFD" | "NFKC" | "NFKD" (default "NFC")
  - Returns: normalized string

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
Retrieved: 2026-03-21
Bytes fetched: 166623
Key technical facts taken from the source: normalize supports four standard Unicode normalization forms with deterministic rules; NFC is recommended for composed canonical equivalence and is the default.

Attribution
URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
Bytes fetched: 166623

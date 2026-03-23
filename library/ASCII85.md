ASCII85 (Ascii85 / Adobe / Z85 notes)

TABLE OF CONTENTS
- Alphabet and character range
- Bits per character
- Encoding algorithm (exact numeric steps)
- Special abbreviations and markers
- Decoding algorithm (exact steps)
- Implementation notes and edge cases
- Reference API signatures and usage patterns
- Detailed digest (excerpt), retrieval date and attribution

NORMALISED EXTRACT
Alphabet and mapping:
- ASCII85 (Adobe) uses the printable characters with code points 33 ('!') through 117 ('u') inclusive for digit values 0..84. Mapping formula: outputChar = 33 + digitValue (digitValue in 0..84).
- Special abbreviation in Adobe's variant: the single character 'z' (ASCII 122) stands for a group of four zero bytes (0x00 0x00 0x00 0x00) and is only valid when the 4-byte value equals zero.
- Some ASCII85 streams are delimited with markers '<~' (start) and '~>' (end) in Adobe/PostScript contexts.

Bits per character:
- log2(85) ≈ 6.410546 bits/char

Encoding algorithm (implementer-level steps):
1. Read input bytes in 4-byte blocks. If fewer than 4 bytes remain, pad the final block on the right with zero bytes to make 4 bytes and remember actual byte-count r (r=1..3).
2. Interpret the 4 bytes as a big-endian 32-bit unsigned integer V.
3. If V == 0 and using Adobe variant, emit single character 'z' (special shorthand) and continue; otherwise:
   a. For i = 4 down to 0: digit[i] = V % 85; V = floor(V / 85).
   b. Map each digit to character c = 33 + digit.
   c. Emit the five characters c0 c1 c2 c3 c4 in that order.
4. On the final partial block (when r < 4): after step 3b emit only the first r+1 characters (i.e., drop 4-r characters from the end) — this mirrors padding trimming.

Decoding algorithm (implementer-level steps):
1. Remove stream delimiters '<~' and '~>' and ignore whitespace.
2. Expand 'z' to five characters equivalent to '!!!!!' (i.e., value zero) when encountered (respecting position rules), or treat as special to append four zero bytes.
3. For every 5-character group (or final shorter group): compute V = sum_{i=0..4} (charValue(c_i) * 85^(4-i)) where charValue(c) = (codePoint(c) - 33). For partial group with length L (2..5), compute V with missing characters treated as 84? No: treat missing characters as if they were 84? Standard approach is to pad with 'u' (value 84) on the right before computing and then discard padding bytes — safer approach: pad with zeros and then remove the appropriate trailing bytes after decoding.
4. Convert 32-bit V to four bytes big-endian and append the first N bytes corresponding to original block length.

SPECIAL ABBREVIATIONS AND MARKERS
- 'z' expansion: only valid when it replaces a full 5-character group representing 0x00000000; should not be used inside partial groups.
- Adobe streams commonly use delimiters '<~' and '~>' to mark the encoded region; remove them for pure data encoding.

IMPLEMENTATION NOTES
- Use 32-bit unsigned arithmetic for V; languages without native 32-bit unsigned ints must emulate using integer or big-int typed arithmetic.
- Avoid control characters: ASCII85 uses printable ASCII only in the 33..117 range plus the special 'z' (122). Do not include space (U+0020).

REFERENCE DETAILS — API SIGNATURES
- encodeAscii85(data: Uint8Array, options?: { adobeMarkers?: boolean, allowZ?: boolean }): string
- decodeAscii85(text: string, options?: { allowZ?: boolean }): Uint8Array
- Behavior: encode produces the minimal-length ASCII85 string; when adobeMarkers true wrap with '<~' and '~>'. When allowZ true emit/accept 'z' shorthand for full-zero 4-byte groups.

DETAILED DIGEST (source excerpt)
- Ascii85 encodes groups of 4 bytes to 5 printable characters using base 85 with character range 33('!')..117('u'); Adobe variant uses 'z' as a shortcut for four zero bytes and delimiters '<~' and '~>'. Retrieval date: 2026-03-22. Retrieved bytes: ~110.4 KB. Source: https://en.wikipedia.org/wiki/Ascii85

ATTRIBUTION
- Source: Wikipedia — Ascii85 page, retrieved 2026-03-22 (~110.4 KB). Use the Adobe variant notes and the numeric mapping above for exact encode/decode rules.

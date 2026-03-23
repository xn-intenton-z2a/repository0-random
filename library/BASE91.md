basE91 (basE91 / Base91 — normative algorithm extract)

TABLE OF CONTENTS
- Purpose and compressive packing approach
- Alphabet (reference) and note about exact source
- Encoder algorithm (bit-buffer with 13/14-bit extraction)
- Decoder algorithm (inverse)
- Edge cases, binary corner-cases and validation
- Digest, retrieval date and attribution

NORMALISED EXTRACT
Purpose and packing approach:
- basE91 is a dense binary-to-text encoding that achieves higher density than Base64 by using an alphabet size of 91 and by emitting two output characters for either 13 or 14 bits at a time (variable-width extraction) to minimize wasted entropy.

Alphabet (reference):
- The canonical basE91 alphabet is provided by the original project (http://base91.sourceforge.net/). Implementations must copy the exact 91-character mapping from the source when producing compatible encodings (the alphabet contains digits, letters and many punctuation characters chosen to be printable and compact). Retrieval: 2026-03-22, ~101.1 KB. See source URL for the exact character sequence.

Encoder algorithm (core steps — implementer-level):
1. Initialize an integer bit buffer 'b' = 0 and bit count 'n' = 0.
2. For each input byte x: b |= (x << n); n += 8.
3. While n > 13: take value v = b & 8191 (13 bits). If v > 88 then v = b & 16383 (14 bits) and consume 14 bits (n -= 14), otherwise consume 13 bits (n -= 13). Emit two output characters: c1 = v % 91 and c2 = floor(v / 91); map c1 and c2 to the basE91 alphabet characters (c1 first, c2 second).
4. After processing all bytes, if n > 0 then emit one or two additional characters derived from the remaining bits; specifically produce v = b and emit characters by repeatedly dividing by 91 until v == 0 (special-case details in source reference).

Decoder algorithm (core steps):
- Symmetric inverse: accumulate input chars, map to numeric values, combine pairs to produce 13/14-bit values, reconstruct buffer and extract bytes whenever 8 or more bits are available.

EDGE CASES AND VALIDATION
- Implementations must exactly match the canonical alphabet and the 13/14-bit extraction thresholds to guarantee compatibility with other basE91 implementations.
- basE91 uses many punctuation characters; ensure text transport does not mangle these (e.g., in URLs or shells) — use safe contexts or escape appropriately.

DETAILED DIGEST (excerpt)
- basE91 homepage documents the algorithm and provides reference implementations; it is the authoritative source for the exact 91-character mapping. Retrieval date: 2026-03-22. Source: http://base91.sourceforge.net/ (~101.1 KB).

ATTRIBUTION
- Source: basE91 project (author pages on SourceForge). Use the project page for the canonical alphabet string and sample implementations.

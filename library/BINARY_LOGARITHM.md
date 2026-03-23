BINARY_LOGARITHM

Table of contents
- Definition and mathematical identity
- Relationship to bits-per-character
- Encoded-length formula (exact)
- Numeric examples for common charsets
- Implementation guidance (JS floating-point and integer safety)
- Reference usage in encoding libraries
- Digest and attribution

Normalised extract (technical details)
- Definition: binary logarithm log2(x) is the exponent to which 2 must be raised to yield x.
- bitsPerChar = log2(charsetSize)
- For input of length L bytes (bits = L * 8), the minimum number of characters required using a charset of size N is:
  encodedLength = ceil((L * 8) / bitsPerChar) where bitsPerChar = log2(N)
- Equivalently: encodedLength = ceil(bits / log2(N))

Exact numeric values (examples, high precision)
- N = 2  -> bitsPerChar = 1.000000000000
- N = 16 -> bitsPerChar = 4.000000000000
- N = 32 -> bitsPerChar = 5.000000000000
- N = 58 -> bitsPerChar = 5.857980995128
- N = 62 -> bitsPerChar = 5.954196310387
- N = 64 -> bitsPerChar = 6.000000000000
- N = 85 -> bitsPerChar = 6.409390936138
- N = 91 -> bitsPerChar = 6.507794640199
- N = 95 -> bitsPerChar = 6.569855608331

Examples
- UUID (16 bytes, 128 bits):
  - base64 (N=64): ceil(128 / 6.0) = 22 characters
  - base62 (N=62): ceil(128 / 5.954196310387) = ceil(21.496...) = 22 characters
  - base85 (N=85): ceil(128 / 6.409390936138) = ceil(19.97...) = 20 characters
  - base91 (N=91): ceil(128 / 6.507794640199) = ceil(19.66...) = 20 characters

Implementation guidance (JavaScript)
- Compute bitsPerChar using Math.log2(N) to avoid loss of precision: bitsPerChar = Math.log2(charset.length)
- Compute encoded length as: Math.ceil((input.length * 8) / bitsPerChar)
- For floating-point stability when charset sizes lead to values close to integers, consider adding a tiny epsilon before ceil: Math.ceil(value - 1e-12) only if tests show off-by-one due to FP error; prefer exact integer checks for power-of-two charsets.
- Use integer arithmetic for bit packing and unpacking to avoid cumulative FP errors when encoding/decoding; do not rely on floating-point to perform bit shifts.

Reference usage in library API
- listEncodings() should expose for each encoding: { name: string, charsetSize: number, bitsPerChar: number }
- Use bitsPerChar for length prediction and to preallocate output buffers: outputChars = Math.ceil((input.length * 8) / bitsPerChar)

Digest (source and retrieval info)
- Binary logarithm — https://en.wikipedia.org/wiki/Binary_logarithm (retrieved 2026-03-23, 279620 bytes)
- RFC 4648 — for related encoding length and padding rules (referenced in SOURCES.md)

Attribution
- Definitions and formulas taken from mathematical definitions of the binary logarithm and encoding length derivations; values computed programmatically to 12 decimal places for precision.

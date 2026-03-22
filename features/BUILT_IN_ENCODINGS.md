# BUILT_IN_ENCODINGS

Overview

Provide three built-in encodings registered at library initialization: base62, base85, and base91. These encodings serve as the baseline and benchmark for density and interoperability.

Details

- base62 uses digits 0-9, lowercase a-z and uppercase A-Z. Expected bits per character approximately 5.95.
- base85 uses a standard Ascii85 or Z85 compatible printable charset. Expected bits per character approximately 6.41.
- base91 uses a dense printable set with bits per character approximately 6.50.

Acceptance Criteria

1) Each built-in encoding is present in listEncodings with correct name, charset size and an approximate bitsPerChar value.
2) Round-trip property holds for each built-in encoding across edge-case buffers.
3) For a v7 UUID (16 bytes) the encoded lengths match the expectations used for benchmarking: base62 encodes to 22 characters, base85 encodes to 20 characters, and base91 encodes to 20 characters; unit tests assert these lengths for a canonical test UUID.
4) No control characters appear in encoded output for any built-in.

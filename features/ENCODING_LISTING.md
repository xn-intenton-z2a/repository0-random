# ENCODING_LISTING

Overview

Provide a stable listEncodings API that returns metadata for each registered encoding. Metadata enables programmatic selection and comparison of encodings.

Metadata fields returned for each encoding

- name: the encoding name as registered
- charsetSize: integer count of available characters
- bitsPerChar: computed decimal value equal to log2(charsetSize)
- urlSafe: boolean indicating whether the charset is safe for use in URLs without additional escaping
- uuidEncodedLength: precomputed encoded length for a 16-byte input under that encoding

Acceptance Criteria

1) listEncodings returns an array where each object contains the fields above for all built-in and custom encodings.
2) The uuidEncodedLength field matches the live encoded length of a 16-byte buffer when encoded by the associated encoding; unit tests verify this for each encoding.
3) bitsPerChar is computed consistently and used in documentation and README comparison table generation.

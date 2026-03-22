# ENCODER_CORE

Overview

Provide a deterministic, minimal, well-tested core API for binary-to-text conversions. The core exposes a registry of named encodings and helpers to encode and decode arbitrary binary data represented as Uint8Array.

Public API

- encode(data, encodingName) — takes a Uint8Array and a registered encoding name and returns an encoded string.
- decode(text, encodingName) — takes an encoded string and a registered encoding name and returns a Uint8Array identical to the original bytes.
- defineEncoding(name, charsetString) — registers a new named encoding built from the supplied charset string and validates the charset rules.
- listEncodings() — returns metadata for every registered encoding.
- encodeUUID(uuidString, encodingName) and decodeUUID(encodedString, encodingName) — shorthand helpers for UUID handling.

Acceptance Criteria

1) encode and decode are exact inverses for arbitrary Uint8Array inputs across all encodings, including the edge cases: empty buffer, single byte, all zeros, and all 0xFF.
2) All public API symbols are exported as named exports from src/lib/main.js.
3) Invalid input types produce a TypeError with a clear message and do not mutate the encoding registry.
4) Unit tests exercise binary round-trip, input validation, and registry mutation behavior.

Implementation notes

- Use an invertible bit-packing algorithm that works for non power-of-two charset sizes.
- Never emit control characters; all produced characters must be in the validated charset for the encoding.
- bitsPerChar is computed as log2(charsetSize) and used for documentation and length estimates.

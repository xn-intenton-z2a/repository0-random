# CUSTOM_CHARSET

Overview

Allow users to create a new encoding by supplying an explicit charset string. Validation rules ensure safe, printable and unambiguous character sets.

Validation rules

- Allowed characters are printable code points between U+0021 and U+007E excluding space.
- Reject control characters and any duplicate characters in the charset.
- Ambiguous characters 0, O, 1, l, and I must not be present; attempts to register a charset containing them should be rejected with a descriptive error.
- Charset length must be at least 2.

Acceptance Criteria

1) defineEncoding(name, charsetString) accepts a valid charset string and registers a working encoding available from listEncodings.
2) Invalid charsets are rejected without mutating the registry and a clear error is thrown; unit tests exercise each validation rule.
3) Encodings created from custom charsets satisfy the round-trip property for arbitrary binary inputs.
4) Documentation shows an example workflow for creating and using a custom encoding programmatically.

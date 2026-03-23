# CUSTOM_ENCODING

Status: Pending verification (merged; tests failing, see issue #72)

Summary
Add a first-class API to create custom encodings from a charset string and register them for use by encode/decode helpers.

Motivation
Users must be able to define bespoke alphabets to experiment with density and character-safety tradeoffs.

Behavior
- API: createEncodingFromCharset(name: string, charset: string) -> Encoding
- Validation rules:
  - Charset must be a string of unique printable characters.
  - Charset length must be at least 2.
  - Charset must not contain control characters.
  - By default reject charsets that include ambiguous characters (0, O, 1, l, I), but provide an override option allowAmbiguous if the caller explicitly requests it.
- Returned Encoding object contains: name, charset, charsetSize, bitsPerChar (log2(charsetSize)), encode(data: Uint8Array), decode(text: string)

Tests
- Creating an encoding with a valid charset succeeds and round-trips data.
- Creating with duplicate characters fails validation.
- Creating with control characters fails validation.
- Registered custom encodings appear in listEncodings().

Acceptance criteria
- createEncodingFromCharset is implemented and exported.
- Validation rules enforce uniqueness and printable-only characters by default.
- A simple custom encoding created during tests round-trips sample data.
- listEncodings includes newly-created custom encodings with correct metadata.

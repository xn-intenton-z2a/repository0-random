# API_EXPORTS

Summary
Ensure all public API is exported as named exports from src/lib/main.js and documented for consumers and tests.

Motivation
Tests and examples import specific named functions; a consistent named-export surface reduces friction and enables tree-shaking.

Required named exports
- encode(encodingName: string, data: Uint8Array) -> string
- decode(encodingName: string, text: string) -> Uint8Array
- createEncodingFromCharset(name: string, charset: string) -> Encoding
- listEncodings() -> Array
- encodeUUID(uuidString: string, encodingName: string, options?) -> string
- decodeUUID(encoded: string, encodingName: string, options?) -> string
- Convenience exports for built-ins: encodeBase62, decodeBase62, encodeAscii85, decodeAscii85, encodePrintableDense, decodePrintableDense

Tests
- Import the above names from src/lib/main.js and use them in unit tests.
- Validate named exports are present and are functions where expected.

Acceptance criteria
- src/lib/main.js exposes all required named exports.
- Unit tests import and call exports without requiring default imports.
- README and examples import named exports as shown.

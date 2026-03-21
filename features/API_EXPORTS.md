# API_EXPORTS

Summary

Ensure the library exports the public API as named exports from src/lib/main.js so consumers can import specific functions.

Specification

- src/lib/main.js must export named functions hammingString and hammingBits.
- No default export should be relied upon by public consumers for these core functions.
- README must include example import lines that use named imports from src/lib/main.js and show simple usage examples for both string and bit Hamming functions.

Acceptance Criteria

- src/lib/main.js exports hammingString and hammingBits as named exports.
- Unit tests import the two functions by name from src/lib/main.js and exercise their behaviour.
- README contains clear usage examples demonstrating both functions, including the karolin/kathrin example and the 1 vs 4 bit example.

Implementation Notes

- Keep the public API surface minimal and stable: only export the documented functions.
- If a CLI entry point is added later, it should be an additional export or a separate script; the core library must remain importable by name.
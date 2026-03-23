Title: TEXT_ENCODER (TextEncoder / TextDecoder)
Retrieval date: 2026-03-23
Source byte size: 142836

Purpose: Encode and decode between Unicode strings and UTF-8 byte sequences.

Core API:
- const encoder = new TextEncoder();
- const bytes = encoder.encode(string); // Uint8Array
- const decoder = new TextDecoder(encoding?: string, options?: {fatal?: boolean, ignoreBOM?: boolean});
- const string = decoder.decode(bytes);

Encoding characteristics: UTF-8 variable-length encoding: ASCII → 1 byte, U+0080..U+07FF → 2 bytes, U+0800..U+FFFF → 3 bytes, U+10000..U+10FFFF → 4 bytes. Bit density varies; not fixed bits/char.

Utility API signatures (recommended):
- encode(input: string): Uint8Array
- decode(input: Uint8Array | ArrayBuffer): string
- createEncoding(name: string): { encode(input: string): Uint8Array, decode(input: Uint8Array | ArrayBuffer): string, name: string }
- listEncodings(): string[]

Notes: TextEncoder defaults to UTF-8 and is safe for web and Node.js environments; use TextDecoder to handle invalid sequences with fatal flag if needed.

Attribution: TextEncoder/TextDecoder specification summary (retrieved 2026-03-23).
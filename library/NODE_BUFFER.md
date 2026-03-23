NODE_BUFFER

Normalised extract:
- Buffer is Node.js's primary API for raw binary data; Buffer is a subclass of Uint8Array and provides convenience constructors and static/instance methods for byte manipulation and encoding conversions.
- Conversions between Buffers and Uint8Array/ArrayBuffer are explicit: Buffer.from(Uint8Array) or Buffer.from(arrayBuffer, byteOffset, length).
- Use Buffer when interacting with Node APIs that expect Node buffers; prefer Uint8Array for browser-consistent code.

Table of contents:
1. Overview
2. Creating Buffer instances
3. Important static methods
4. Instance methods for reading/writing and encoding
5. Interop with Uint8Array / ArrayBuffer
6. Performance and security notes
7. Implementation notes for encoding library
8. Reference details (API signatures)
9. Detailed digest and attribution

1. Overview
Buffer is a global in Node.js for handling binary data. Many Node APIs accept or return Buffer. In Node releases where Buffer is a subclass of Uint8Array, buffers are compatible with typed-array operations but expose extra helpers (alloc, from, concat, byteLength).

2. Creating Buffer instances
- Buffer.from(arrayBuffer: ArrayBufferLike, byteOffset?: number, length?: number) -> Buffer
- Buffer.from(arrayLike: ArrayLike<number>) -> Buffer
- Buffer.from(string: string, encoding?: string) -> Buffer
- Buffer.alloc(size: number, fill?: string|number|Buffer, encoding?: string) -> Buffer
- Buffer.allocUnsafe(size: number) -> Buffer
- Buffer.allocUnsafeSlow(size: number) -> Buffer

3. Important static methods
- Buffer.concat(list: ReadonlyArray<Uint8Array|Buffer>, totalLength?: number) -> Buffer
- Buffer.byteLength(string: string, encoding?: string) -> number
- Buffer.isBuffer(obj: any) -> boolean
- Buffer.compare(buf1: Buffer, buf2: Buffer) -> number (negative, zero, positive)

4. Instance methods for reading/writing and encoding
- buffer.toString(encoding?: string, start?: number, end?: number) -> string
- buffer.write(string: string, offset?: number, length?: number, encoding?: string) -> number (bytes written)
- buffer.copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number) -> number
- buffer.slice(start?: number, end?: number) -> Buffer (shares memory in modern Node)
- buffer.equals(otherBuffer: Buffer) -> boolean
- buffer.readUInt8(offset: number) -> number, readUInt16LE(offset), readUInt16BE(offset), readUInt32LE/BE(offset) -> number
- buffer.readInt8/16/32 variants -> number
- buffer.readBigUInt64BE(offset?: number) -> bigint
- buffer.readBigUInt64LE(offset?: number) -> bigint
- buffer.writeBigUInt64BE(value: bigint, offset?: number) -> number
- buffer.writeBigUInt64LE(value: bigint, offset?: number) -> number

5. Interop with Uint8Array / ArrayBuffer
- Buffer is a subclass of Uint8Array; many operations accept either.
- To obtain a Buffer view of an existing Uint8Array without copying: Buffer.from(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength).
- To get an ArrayBuffer from a Buffer: buffer.buffer (may have offset); use buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) to obtain exact ArrayBuffer copy if needed.

6. Performance and security notes
- Buffer.allocUnsafe(size) returns uninitialized memory: faster but must be fully overwritten before use to avoid leaking memory contents.
- Prefer Buffer.alloc for security-critical or long-lived buffers.
- Buffer.concat preallocates memory when totalLength supplied for efficiency.

7. Implementation notes for encoding library
- Input type requirement for this project is Uint8Array. In Node, callers may pass a Buffer; treat Buffer as compatible with Uint8Array.
- For encoding/decoding functions that accept Uint8Array, internals may either operate directly on the Uint8Array or convert to Buffer for Node-specific helpers; to avoid copies, prefer working on the Uint8Array view or use Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength) to create a Buffer view.
- For base64 baseline comparisons: Buffer.from(bytes).toString('base64') produces standard base64 with padding; to remove padding, strip trailing '=' characters.

8. Reference details (API signatures)
- Buffer.from(arrayBuffer: ArrayBufferLike, byteOffset?: number, length?: number) -> Buffer
- Buffer.from(arrayLike: ArrayLike<number>) -> Buffer
- Buffer.from(string: string, encoding?: string) -> Buffer
- Buffer.alloc(size: number, fill?: string|number|Buffer, encoding?: string) -> Buffer
- Buffer.allocUnsafe(size: number) -> Buffer
- Buffer.concat(list: ReadonlyArray<Uint8Array|Buffer>, totalLength?: number) -> Buffer
- Buffer.byteLength(string: string, encoding?: string) -> number
- Buffer.prototype.toString(encoding?: string, start?: number, end?: number) -> string
- Buffer.prototype.write(string: string, offset?: number, length?: number, encoding?: string) -> number
- Buffer.prototype.copy(target: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number) -> number
- Buffer.prototype.readBigUInt64BE(offset?: number) -> bigint
- Buffer.prototype.writeBigUInt64BE(value: bigint, offset?: number) -> number

Encodings supported (common): 'utf8', 'utf-8', 'ascii', 'latin1', 'binary', 'base64', 'hex', 'utf16le', 'ucs2'. Using invalid encoding throws.

9. Detailed digest and attribution
- Source: Node.js Buffer API — https://nodejs.org/api/buffer.html
- Retrieval date: 2026-03-23
- Download size: 1,111,904 bytes
- Notes: Node.js docs provide exhaustive Buffer constructors, static methods, instance methods, integer read/write APIs and BigInt read/write methods (readBigUInt64*/writeBigUInt64*). Extracted signatures and interoperability guidance above for practical implementation.

Attribution: content extracted from Node.js Buffer documentation (see URL above); data size recorded for provenance.
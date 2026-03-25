NODE_FS

Normalized extract
- Node.js file system API provides synchronous, callback and promise-based filesystem operations. fs.promises exposes Promise-based functions for modern async/await usage.
- Key functions for saving plot files: fs.promises.writeFile(path, data[, options]) -> Promise<void>; fs.writeFileSync(path, data[, options]) -> undefined; fs.createWriteStream(path[, options]) -> fs.WriteStream for streaming large outputs.

Table of Contents
- fs.promises and recommended async usage
- Synchronous and streaming alternatives
- Options and encodings
- Implementation patterns for saving SVG and PNG
- Reference signatures and parameter details
- Detailed digest and retrieval metadata

fs.promises and recommended async usage
- Use fs.promises.writeFile to save buffers or strings with await fs.promises.writeFile(path, data, { encoding: 'binary' }) for binary PNG data or { encoding: 'utf8' } for SVG text.
- When writing large binary outputs prefer piping a readable stream into fs.createWriteStream to limit memory usage.

Synchronous and streaming alternatives
- fs.writeFileSync(path, data[, options]) is acceptable for small CLI tasks but blocks the event loop; avoid for scalable services.
- Streaming pattern: const ws = fs.createWriteStream(path); readableStream.pipe(ws); await once(ws, 'finish') to await completion.

Options and encodings
- writeFile/writeFileSync options parameter may be a string encoding or an object { encoding?: string | null, mode?: number, flag?: string }.
- For binary data use encoding null or 'binary' and provide Buffer input.

Implementation patterns for saving SVG and PNG
- For SVG: write the SVG string directly as UTF-8 text. Ensure you include an XML declaration if required by consumers and set output file extension .svg.
- For PNG: produce binary Buffer (from canvas.toBuffer() or sharp output) and write with fs.promises.writeFile(path, buffer).

Reference signatures
- fs.promises.writeFile(path: string | Buffer | URL, data: string | Buffer | TypedArray | DataView, options?: string | { encoding?: string | null; mode?: number; flag?: string }): Promise<void>
- fs.writeFileSync(path: string | Buffer | URL, data: string | Buffer | TypedArray | DataView, options?: string | { encoding?: string | null; mode?: number; flag?: string }): void
- fs.createWriteStream(path: string | Buffer | URL, options?: { flags?: string; encoding?: string; mode?: number; autoClose?: boolean; start?: number }): fs.WriteStream

Detailed digest and retrieval metadata
- Source: https://nodejs.org/api/fs.html#fspromises
- Retrieved: 2026-03-25
- Bytes downloaded during crawl: 935744

Attribution
- Condensed from Node.js official fs module documentation.
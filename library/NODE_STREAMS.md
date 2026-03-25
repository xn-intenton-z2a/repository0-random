NODE_STREAMS

Normalized extract
- Node.js streams provide interfaces for handling streaming data efficiently. Common stream classes: stream.Readable, stream.Writable, stream.Transform, stream.Duplex.
- For CSV loading and piping into parsers use readable streams and pipe to a parser or accumulate into memory for small files.

Table of Contents
- Stream types and typical usage
- Piping CSV parse stream to file or processor
- Events and error handling
- Backpressure and flow control
- Reference signatures
- Detailed digest and retrieval metadata

Stream types and typical usage
- stream.Readable: emits 'data' events or can be consumed via async iterator. stream.Writable: accepts writes and emits 'finish' on end. stream.Transform: used to transform chunked data (e.g., line parsing) and can be piped between readable and writable.

Piping CSV parse stream to file or processor
- Common pattern: fs.createReadStream(csvPath).pipe(csvParse(options)).on('data', handler).on('end', done). The csv-parse package accepts stream input.
- For large files prefer processing row-by-row with a transform stream to avoid buffering entire file in memory.

Events and error handling
- Always handle 'error' events on streams (readable.on('error', handler) and writable.on('error', handler)).
- Use once(stream, 'end') or stream finished utility to await completion when piping.

Backpressure and flow control
- Use stream.pipe(destination, { end: true }) to manage flow control automatically. For manual control use readable.pause() and readable.resume() when needed.

Reference signatures
- stream.Readable: class emits 'data' (chunk: Buffer | string) and 'end' events.
- readable.pipe(destination: stream.Writable, options?: { end?: boolean }): stream.Writable

Detailed digest and retrieval metadata
- Source: https://nodejs.org/api/stream.html
- Retrieved: 2026-03-25
- Bytes downloaded during crawl: 822762

Attribution
- Condensed from Node.js official Stream API documentation.
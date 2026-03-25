PNG_FORMAT

Normalized extract
- PNG file signature: the first 8 bytes of a valid PNG file are fixed and must be exactly: 89 50 4E 47 0D 0A 1A 0A (hex values). This is the canonical PNG magic header used to detect PNG files.
- After the signature the PNG file consists of chunks. The first chunk must be IHDR containing image width, height and image metadata.

Table of Contents
- PNG signature and detection
- IHDR chunk and its fields
- Chunk structure and order rules relevant to simple raster output
- Practical check used in acceptance criteria
- Detailed digest and retrieval metadata

PNG signature and detection
- Exact bytes for the PNG signature (in hexadecimal): 89 50 4E 47 0D 0A 1A 0A.
- Any PNG output produced by the CLI should begin with these eight bytes when written to disk as a .png file. Checking the first eight bytes is sufficient as a primary validation.

IHDR chunk and its fields (specifically ordered)
- IHDR chunk structure immediately follows the signature: 4 bytes length (big-endian), 4 bytes chunk type 'IHDR', 13 bytes chunk data, 4 bytes CRC.
- IHDR chunk data fields (in order): width (4 bytes, unsigned int), height (4 bytes, unsigned int), bit depth (1 byte), color type (1 byte), compression method (1 byte), filter method (1 byte), interlace method (1 byte).
- For typical truecolor PNGs used by canvas libraries: bit depth 8, color type 2 (truecolor) or 6 (truecolor with alpha).

Chunk structure and order rules relevant to simple raster output
- Chunks follow: PNG signature, IHDR, optional chunks (e.g., PLTE when needed), IDAT (image data) can span multiple IDAT chunks, IEND terminates the file.
- For basic validation only the signature and presence of IHDR and IEND are required; full decoding requires parsing IDAT.

Practical check used in acceptance criteria
- Confirm PNG: read first 8 bytes and compare to 89 50 4E 47 0D 0A 1A 0A. If they match, file starts with PNG magic bytes.
- This check is robust for acceptance tests verifying PNG output from canvas or sharp.

Detailed digest and retrieval metadata
- Source: https://en.wikipedia.org/wiki/Portable_Network_Graphics#File_header
- Retrieved: 2026-03-25
- Bytes downloaded during crawl: 375944

Attribution
- Condensed from the PNG specification summary (Wikipedia page linked above). For authoritative byte-level details consult the official PNG specification (RFC/ITU-T/ISO references).
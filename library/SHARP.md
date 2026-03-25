NORMALISED EXTRACT

Key technical points (directly actionable):
- sharp is a high-performance Node.js image processing library. It accepts Buffer, file path, or stream input and outputs PNG (or other formats) via toBuffer() or toFile().
- For SVG to PNG conversion, pass the SVG string/Buffer to sharp() and use the density option to control rasterization DPI for higher-resolution output.

TABLE OF CONTENTS
1. Basic construction and input types
2. Common transformation chain methods and signatures
3. SVG-specific options (density)
4. Output methods and return types
5. Example conversion patterns (described)

DETAILS
1. Basic construction
- sharp(input?: string|Buffer|ReadableStream, options?): SharpInstance
  - input: Buffer | string file path | readable stream. If no input provided, create blank image via sharp({create:{width,height,channels,background}}).

2. Common transformation chain methods (signatures)
- sharpInstance.resize(width?: number, height?: number, options?): SharpInstance
- sharpInstance.png(options?): SharpInstance (sets PNG-specific output options)
- sharpInstance.jpeg(options?): SharpInstance
- sharpInstance.toBuffer(): Promise<Buffer>
- sharpInstance.toFile(path: string): Promise<{format, size, width, height}>

3. SVG-specific options
- Density option (input) controls SVG rasterization DPI: sharp(Buffer.from(svgString), { density: number })
  - Default density: 72 dpi. For higher-resolution PNGs set density to 150–600 depending on desired DPI.
- When converting: sharp(svgBuffer, { density: 300 }).png().toBuffer()

4. Output methods and return types
- toBuffer(): Promise<Buffer> — resolves to image bytes of current pipeline format (PNG if .png() used).
- toFile(path): Promise<object> — writes file and resolves with info about the written file.

5. Example conversion pattern (described)
- To convert an SVG string to PNG: create Buffer from SVG string, call sharp(buffer, { density: desiredDPI }), optionally resize, then call .png() and .toBuffer() or .toFile(destinationPath).
- To generate consistent output sizes from viewBox, set width/height using resize after initial conversion or set density to influence pixel resolution.

SUPPLEMENTARY DETAILS
- Sharp is implemented in native code and uses libvips for high-speed image processing; prebuilt binaries exist for common platforms but may require native build tools on others.
- For large SVGs and high DPI, increase memory and consider streaming pipelines to avoid buffering entire results.

REFERENCE DETAILS (API SPECIFICATIONS)
- sharp(input?: string|Buffer|ReadableStream, options?: { density?: number }) -> Sharp
- Sharp.resize(width?: number, height?: number, options?: object) -> Sharp
- Sharp.png(options?: object) -> Sharp
- Sharp.toBuffer(): Promise<Buffer>
- Sharp.toFile(path: string): Promise<object>

IMPLEMENTATION PATTERNS
- SVG -> PNG: const svgBuffer = Buffer.from(svgString); await sharp(svgBuffer, { density: 300 }).png().toFile('out.png');
- Use density to control rasterization scale rather than resizing post-rasterization when angle/text fidelity matters.

TROUBLESHOOTING
- If PNG output appears low-resolution, increase density before rasterization.
- If conversion fails with native errors, ensure libvips and sharp prebuilt binaries match the platform and Node version.

DETAILED DIGEST
Source excerpt (top of page): High performance Node.js image processing. The fastest module to resize JPEG, PNG, WebP and TIFF images.
Retrieved: 2026-03-25
Crawl size: 52643 bytes

ATTRIBUTION
Source: https://sharp.pixelplumbing.com/
sharp documentation (content retrieved 2026-03-25).
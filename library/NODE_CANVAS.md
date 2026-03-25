NORMALISED EXTRACT

Key technical points (directly actionable):
- node-canvas implements the HTML Canvas 2D API for Node.js. Use createCanvas(width, height) to create a Canvas and canvas.getContext('2d') to draw; call canvas.toBuffer('image/png') or createPNGStream() to obtain PNG bytes.
- loadImage(src) returns a Promise that resolves to an Image usable with drawImage.
- node-canvas requires native system dependencies (cairo, pango, libjpeg, giflib); follow platform install notes on the repo.

TABLE OF CONTENTS
1. Core constructors and return types
2. 2D context methods needed for polyline rendering
3. Output methods (PNG export)
4. Installation caveats and platform dependencies

DETAILS
1. Core constructors and return types
- createCanvas(width: number, height: number): Canvas — returns a Canvas instance sized in pixels.
- Canvas.getContext('2d'): CanvasRenderingContext2D — object exposing 2D drawing API.
- loadImage(src: string|Buffer): Promise<Image>

2. 2D context methods needed for polyline rendering (signatures)
- ctx.beginPath(): void
- ctx.moveTo(x: number, y: number): void
- ctx.lineTo(x: number, y: number): void
- ctx.stroke(): void
- ctx.fill(): void
- ctx.strokeStyle: string — sets stroke color
- ctx.lineWidth: number — sets stroke width
- ctx.clearRect(x: number, y: number, w: number, h: number): void

3. Output methods (PNG export)
- canvas.toBuffer(mime?: 'image/png' | 'image/jpeg', callback?): Buffer | void — synchronous form returns Buffer, Promise variants may exist depending on wrapper.
- canvas.createPNGStream(): ReadableStream — pipe to fs.createWriteStream to save.
- Example output pattern: const buf = canvas.toBuffer('image/png'); fs.writeFileSync('out.png', buf);

4. Installation caveats and platform dependencies
- node-canvas depends on native libraries (cairo, pango, libjpeg, giflib). On Linux install via apt/yum: libcairo2-dev, libpango1.0-dev, libjpeg-dev, libgif-dev, librsvg2-dev, and build tools. On macOS use homebrew packages.
- Prebuilt binaries exist for some platforms but verify compatibility with Node.js version.

SUPPLEMENTARY DETAILS
- For rendering SVG directly into canvas, node-canvas may accept image loading of an SVG via loadImage(svgBuffer) but results depend on platform; for reliable SVG-to-PNG conversion prefer sharp.

REFERENCE DETAILS (API SPECIFICATIONS)
- createCanvas(width: number, height: number): Canvas
- loadImage(src: string|Buffer): Promise<Image>
- Canvas.toBuffer(format?: string): Buffer
- Canvas.createPNGStream(): ReadableStream
- CanvasRenderingContext2D: standard 2D API (moveTo, lineTo, stroke, fill, etc.)

IMPLEMENTATION PATTERNS
- To produce PNG from polyline: create canvas sized to pixel dimensions, map data coordinates to pixel coordinates, draw path using moveTo/lineTo/stroke, then call canvas.toBuffer('image/png') and write buffer to file.
- For CLI mode, prefer synchronous toBuffer and fs.writeFileSync for simplicity; for server contexts use createPNGStream or toBuffer async variants.

TROUBLESHOOTING
- If canvas.toBuffer fails, confirm native dependencies installed and node-canvas version matches Node release.
- If images appear blurry, ensure canvas dimensions match desired output pixel size and scale coordinates appropriately.

DETAILED DIGEST
Source excerpt (top of page): node-canvas is a Cairo backed Canvas implementation for Node.js. It provides the Canvas API.
Retrieved: 2026-03-25
Crawl size: 574653 bytes

ATTRIBUTION
Source: https://github.com/Automattic/node-canvas
node-canvas GitHub (content retrieved 2026-03-25).
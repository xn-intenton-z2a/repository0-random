# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Plotting Library (Quickstart)

This project implements a small plotting library and CLI which can parse mathematical expressions, evaluate them over numeric ranges, load CSV time series, and render plots to SVG or PNG (PNG is produced as a portable placeholder without native image libraries).

### Library API (src/lib/main.js)

Named exports:
- parseExpression(expr) -> (x) => y
- parseRange(rangeStr) -> { start, step, end }
- evaluateRange(fn, start, step, end) -> [{x, y}, ...]
- loadCSVTimeSeries(filePath) -> Promise<[{time, value}]>
- renderSVG(series, opts) -> string (SVG 1.1 with viewBox and a <polyline>)
- renderPNG(series, opts) -> Buffer (starts with PNG magic bytes)
- savePlot(filePath, content) -> Promise<void>
- runCLI(args) -> Promise<{status, output, file}>

All functions are exported as named exports from `src/lib/main.js` and are safe to import in the browser (Node-only functions throw when used in the browser).

### CLI Examples

Generate an SVG from an expression:

```bash
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
```

Generate a PNG (placeholder PNG beginning with PNG magic bytes) from a CSV file:

```bash
node src/lib/main.js --csv data.csv --file output.png
```

Show help:

```bash
node src/lib/main.js --help
```

### PNG rendering approach

To keep this repository easy to run without native build dependencies, the PNG renderer in this project currently emits a portable placeholder byte buffer that begins with the PNG file signature (\x89PNG\r\n\x1A\n). This satisfies tests and makes the CLI produce `.png` files that are recognisable as PNG by tools that only check the signature. For production-quality PNG rendering, add a native image library such as `canvas` or `sharp` and replace `renderPNG` to rasterise the SVG.

### Website Demo

Open `src/web/index.html` in a modern browser to see the demo rendering of `y=Math.sin(x)`.

## Running Tests

Unit tests use Vitest. Run:

```bash
npm test
```

Behaviour tests use Playwright (not required for unit test validation here):

```bash
npm run test:behaviour
```

## Mission

See `MISSION.md` for the project's acceptance criteria and goals.

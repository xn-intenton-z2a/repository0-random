NORMALISED EXTRACT

Key technical points (directly actionable):
- viewBox defines the user coordinate system for an SVG in the form: min-x min-y width height (four numbers).
- viewBox scales and translates child coordinates into the SVG viewport; combine with preserveAspectRatio to control scaling behaviour.

TABLE OF CONTENTS
1. Syntax and parsing
2. Semantics (min-x/min-y/width/height)
3. Interaction with preserveAspectRatio
4. Implementation notes for plotting

DETAILS
1. Syntax and parsing
- Attribute format: viewBox="minX minY width height". Tokens are whitespace and/or comma separated numbers parsed as floats.
- Example tokenization: split string into four numeric tokens and parseFloat each; invalid/non-numeric values render incorrectly.

2. Semantics
- minX, minY: coordinates in user space that map to the top-left of the viewport.
- width, height: dimensions in user units representing the user coordinate system extent.
- Negative or zero width/height are invalid; width and height must be positive numbers.

3. Interaction with preserveAspectRatio
- preserveAspectRatio controls how viewBox content is fitted to the viewport. Default: xMidYMid meet.
- Values: meet (fit preserving aspect ratio) vs slice (fill and crop), and alignment values (xMin/xMid/xMax, yMin/yMid/yMax).

4. Implementation notes for plotting
- Set viewBox to the data-space bounding rectangle (minX = dataMinX, minY = dataMinY, width = dataMaxX - dataMinX, height = dataMaxY - dataMinY) if emitting raw data coordinates.
- Alternatively, normalize data to a canonical user-space (e.g., 0..width, 0..height) and use viewBox that equals that range.
- To invert Y (typical for plots where higher values map up), map yplot = (maxY - ydata) when building coordinates, or set a transform on the group.

SUPPLEMENTARY DETAILS
- When producing PNG via rasterizers, increase SVG resolution/density in downstream renderer (e.g., sharp density option) rather than changing viewBox.

REFERENCE DETAILS (API SPECIFICATIONS)
- Attribute: viewBox (string) — four numbers: min-x min-y width height.
- Parsing rule: split tokens by whitespace/comma, parseFloat on each, require exactly 4 numbers.
- preserveAspectRatio default: xMidYMid meet.

IMPLEMENTATION PATTERNS
- Preferred pattern for time-series: compute data bounding box, create SVG with viewBox = "minX minY width height", create <polyline> points using raw data coordinates, set fill="none" and stroke as required.

TROUBLESHOOTING
- If SVG appears zoomed in/out unexpectedly, verify the viewBox numbers are in the same coordinate units used when generating points.
- If content is clipped, check that width/height are positive and not zero.

DETAILED DIGEST
Source excerpt (top of page): The viewBox attribute defines the position and dimension, in user space, of an SVG viewport.
Retrieved: 2026-03-25
Crawl size: 175327 bytes

ATTRIBUTION
Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
MDN Web Docs (content retrieved 2026-03-25).
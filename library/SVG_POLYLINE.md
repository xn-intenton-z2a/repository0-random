NORMALISED EXTRACT

Key technical points (directly actionable):
- The SVG <polyline> element draws a series of straight lines connecting coordinate pairs provided in the points attribute. Use fill="none" and stroke to draw a polyline for plots.
- The points attribute is a list of coordinate pairs: x,y pairs separated by whitespace and/or commas. Coordinates are user-space numbers (floats allowed, negatives allowed).
- To render a time-series or function plot, map data points to SVG user coordinates and emit a points string of the form "x1,y1 x2,y2 x3,y3 ...".

TABLE OF CONTENTS
1. Element semantics
2. points attribute grammar and examples
3. Styling attributes relevant to plots
4. Coordinate mapping and scaling guidelines
5. Accessibility and performance notes

DETAILS
1. Element semantics
- Element: polyline
- Purpose: draw open polyline connecting listed points; does not automatically close shape (polygon closes automatically).

2. points attribute grammar and parsing
- Allowed token forms: numeric tokens separated by whitespace and/or commas.
- Each pair is interpreted as an x coordinate followed by a y coordinate.
- Example token sequence: number(,|\s)number (repeat). Negative values and floating-point notation supported. Scientific notation also supported by the SVG parser.

3. Styling attributes relevant to plots
- stroke: color string — sets line color.
- stroke-width: number — sets line thickness (user units unless CSS applied).
- fill: color or 'none' — for plotting use fill="none" to avoid closed fill.
- stroke-linejoin and stroke-linecap — control joins and end caps for polylines.
- vector-effect: non-scaling-stroke can be used if stroke width must remain constant during scaling.

4. Coordinate mapping and scaling guidelines
- Choose viewBox that matches data coordinate range or map data into a normalized coordinate system then use viewBox to scale to output pixel dimensions.
- When generating points, ensure numeric formatting uses dot as decimal separator and no thousands separators.
- For large data sets, limit point count (decimation or step sampling) to reduce SVG size and rendering cost.

5. Accessibility and performance notes
- Add role="img" and aria-label or <title> to provide textual description if used as standalone graphic.
- For very large point collections, consider using canvas/PNG for heavy plots or simplify polyline data.

SUPPLEMENTARY DETAILS
- When generating the points string programmatically, join each point pair with a single space and use a comma between x and y for clarity: "x,y x,y ...".
- To ensure crisp 1px lines on integer pixel canvases, consider offsetting coordinates by 0.5 for stroke alignment when outputting to raster.

REFERENCE DETAILS (API SPECIFICATIONS)
- Element name: polyline
- points (attribute): string — 1 or more pairs of numbers separated by whitespace and/or commas; grammar accepts floats and negatives.
- fill: <color>|none — default is black; plotting typically uses fill=none.
- stroke: <paint> — color specification.
- stroke-width: <number> — numeric, in user units.
- vector-effect: non-scaling-stroke — optional.

IMPLEMENTATION PATTERNS
- To create a plot: compute scaledX(xData) and scaledY(yData) for each sample; build points = scaledX(0)+','+scaledY(0)+' '+scaledX(1)+','+scaledY(1)+' ...'; embed in <polyline points="..." stroke="#000" fill="none" /> and set svg viewBox to the data coordinate extents.

TROUBLESHOOTING
- If polyline appears empty, validate that points string contains at least one pair and uses decimal dot separators.
- If lines are clipped, check viewBox and stroke-linecap.

DETAILED DIGEST
Source excerpt (top of page): The <polyline> SVG element is an SVG basic shape that creates straight lines connecting several points. Typically a polyline is used to create open shapes as the last point doesn't have to be connected to the first point.
Retrieved: 2026-03-25
Crawl size: 174423 bytes

ATTRIBUTION
Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
MDN Web Docs (content retrieved 2026-03-25).
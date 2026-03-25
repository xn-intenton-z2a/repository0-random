# SVG_RENDERER

Summary
Render a numeric data series to an SVG 1.1 string using a polyline element and a correct viewBox attribute.

Specification
- Input: Array of points {x:number,y:number} and optional options such as width, height, and padding.
- Behavior: Compute data bounds, construct an SVG root element with version 1.1 and xmlns, include a viewBox attribute expressed as minX minY width height that encloses the data including padding, map data points to SVG coordinates, and emit a polyline element with a populated points attribute and sensible default stroke and fill values.
- Output: A string containing a valid SVG 1.1 document suitable for writing to disk or converting to PNG.

Acceptance Criteria
- The renderer returns a string that contains the substring <svg and a viewBox attribute.
- The returned SVG contains at least one <polyline element with a non-empty points attribute.
- For input points spanning x 0..10 and y 0..10, the computed viewBox covers that range (allowing for configured padding).

Implementation Notes
- Format numeric values with reasonable precision (for example three decimal places) and avoid excessive verbosity in the output string.
- Export renderSvg as a named export from src/lib/main.js.

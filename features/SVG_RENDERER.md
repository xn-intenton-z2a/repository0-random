# SVG_RENDERER

Summary
Render a numeric data series to an SVG 1.1 string using a polyline element and a correct viewBox attribute.

Specification
- Input: Array of points {x:number,y:number} and optional options {width:number,height:number,padding:number}.
- Behavior: Compute bounds, construct an SVG root element with version 1.1 and xmlns attribute, include a viewBox attribute calculated as "minX minY width height" that encloses the data (including padding). Map data points to SVG coordinates and output a polyline element with a points attribute and sensible default stroke and fill attributes.
- Output: A string containing a valid SVG 1.1 document.

Acceptance Criteria
- The renderer returns a string containing "<svg" and a viewBox attribute.
- The returned SVG contains at least one "<polyline" element with a non-empty points attribute.
- For an input where points have x values 0..10 and y values 0..10, the viewBox covers a box that includes 0 0 and 10 10 (allowing for padding).

Implementation Notes
- Use floating point formatting with reasonable precision (for example three decimals).
- Export renderSvg as a named export from src/lib/main.js.

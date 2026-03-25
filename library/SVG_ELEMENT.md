SVG_ELEMENT

Normalized extract
- The <svg> element is the top-level SVG container. Key attributes that affect plotting are viewBox (min-x min-y width height), width, height, and preserveAspectRatio.
- viewBox normalises internal coordinates: viewBox="minX minY width height" maps user coordinate space to the element viewport. All child coordinates (polyline points) are expressed in that user coordinate space.
- For plotting numeric series map numeric X and Y values to the viewBox coordinate range. SVG Y axis increases downward; invert Y when mapping numeric values to pixel-like coordinates.

Table of Contents
- Overview and responsibilities
- viewBox and coordinate system
- Mapping numeric series to polyline points
- Implementation pattern for plots
- Supplementary details
- Reference API attributes (exact names and expected values)
- Detailed digest and retrieval metadata

Overview and responsibilities
- Use <svg> as the root document for vector output. Set an explicit viewBox to establish a predictable coordinate space that is independent of output pixel dimensions. Prefer viewBox for scaling and deterministic layout.

viewBox and coordinate system
- viewBox value: four numbers separated by spaces: minX minY width height. Example structure: viewBox="minX minY width height".
- width and height on the <svg> can be absolute lengths (e.g., 800) or percent values; when omitted rendering engines fall back to CSS layout.
- preserveAspectRatio controls how the viewBox is scaled to the viewport. Default is xMidYMid meet.

Mapping numeric series to polyline points
- Compute numeric domain: Xmin, Xmax and Ymin, Ymax from the data.
- Linear mapping formula: mappedX = minX + ( (x - Xmin) / (Xmax - Xmin) ) * width; mappedY = minY + (1 - (y - Ymin) / (Ymax - Ymin)) * height. Note inversion on Y to account for SVG downward Y axis.
- Produce a points string for <polyline> as a sequence of coordinate pairs separated by spaces: "x1,y1 x2,y2 ..." where each xi and yi are mappedX and mappedY.

Implementation pattern for plots
- Choose a viewBox that matches plotting range: minX=0, minY=0, width=desiredWidth, height=desiredHeight, then map data to that coordinate range.
- Build an array of mapped coordinate pairs and join into the points attribute on <polyline>.
- Ensure escaped numeric formatting uses a locale-invariant decimal point and a limited number of fractional digits for compact SVG output.

Supplementary details
- Coordinates are floating-point numbers; SVG accepts decimals. Avoid scientific notation in points string for maximum compatibility.
- For accessibility add role="img" and include a descriptive <title> and <desc> inside <svg>.
- When producing PNG renderings, prefer preserving vector paths until rasterisation step to maximise quality.

Reference API attributes (exact names and expected values)
- viewBox: string "minX minY width height" where each item is a number (floating-point allowed). Effects: establishes user coordinate system.
- width: length or number. Effects: CSS layout size or explicit pixel size for rasterised outputs.
- height: length or number.
- preserveAspectRatio: values like "xMinYMin meet", "xMidYMid slice". Effects: scaling alignment and cropping.
- <polyline> points attribute: a single string of coordinate pairs separated by spaces and/or commas. Each coordinate pair is two numbers separated by a comma or whitespace.

Detailed digest and retrieval metadata
- Source: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
- Retrieved: 2026-03-25
- Bytes downloaded during crawl: 182571

Attribution
- Content condensed from MDN Web Docs: SVG element reference (see source URL above).
# PNG_RENDERER

Summary
Convert SVG output into a PNG binary buffer using an optional native dependency and document the chosen approach.

Specification
- Input: SVG string and optional options {width:number,height:number}.
- Behavior: When a supported renderer is available (sharp or node-canvas), convert the SVG string to a PNG Buffer. If the optional dependency is not installed, return a clear error instructing how to install it.
- Output: Buffer containing PNG file bytes.

Acceptance Criteria
- Converting a small SVG to PNG returns a Buffer whose first four bytes match the PNG signature 0x89 0x50 0x4E 0x47.
- If the optional dependency is not installed, the API returns an error describing which package is missing and how to install it.

Implementation Notes
- Prefer sharp when available for performance and reliability; use node-canvas as a documented fallback.
- Export renderPng as a named export from src/lib/main.js.

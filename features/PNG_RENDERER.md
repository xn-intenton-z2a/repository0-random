# PNG_RENDERER

Summary
Convert SVG output into a PNG binary Buffer using an optional native dependency and document the chosen approach for users.

Specification
- Input: SVG string and optional options object containing width and height.
- Behavior: Use an available renderer such as sharp or node-canvas to convert the SVG string to a PNG Buffer. If no supported renderer is installed the API returns an error explaining how to enable PNG support by installing the recommended package.
- Export: Provide renderPng as a named export from src/lib/main.js.

Acceptance Criteria
- Converting a valid SVG to PNG returns a Buffer whose first eight bytes match the PNG signature: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A.
- When no optional renderer is installed the function throws an error that names the missing package and suggests an installation command.

Implementation Notes
- Prefer sharp for performance; document node-canvas as a fallback and how to install either package.
- Keep the renderer usage abstracted so tests can stub the conversion step.

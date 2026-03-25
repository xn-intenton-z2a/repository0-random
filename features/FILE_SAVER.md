# FILE_SAVER

Summary
Save rendered plots to disk, inferring format from the file extension and choosing the correct writer.

Specification
- Input: Output path string and content (SVG string or PNG Buffer).
- Behavior: Inspect the file extension: .svg -> write UTF-8 text; .png -> write binary; unknown extension -> throw an error. Ensure writes are performed atomically where possible.
- Output: Promise that resolves to the written path upon success.

Acceptance Criteria
- Saving to output.svg writes a UTF-8 file that contains "<svg" and a viewBox attribute.
- Saving to output.png writes a binary file whose first bytes are the PNG signature.
- Attempting to save to an unsupported extension throws a descriptive error.

Implementation Notes
- Use fs.writeFile with the correct encoding for text or binary.
- Export saveToFile as a named export from src/lib/main.js.

# FILE_SAVER

Summary
Save rendered plot output to disk, inferring output format from the file extension and choosing the correct encoding.

Specification
- Input: Path string and content which may be an SVG string or a PNG Buffer.
- Behavior: Inspect the file extension: .svg implies UTF-8 text write; .png implies binary write; unknown extensions cause a descriptive error. Writes should be robust and return a promise that resolves to the written path.
- Export: Provide saveToFile as a named export from src/lib/main.js.

Acceptance Criteria
- Saving to output.svg writes a UTF-8 file that contains the substring <svg and includes a viewBox attribute.
- Saving to output.png writes a binary file whose first eight bytes match the PNG signature.
- Attempting to save to an unsupported extension throws an explanatory error.

Implementation Notes
- Use fs writeFile and choose encoding depending on extension; ensure binary mode for PNG.

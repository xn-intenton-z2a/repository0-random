# README_EXAMPLES

Summary
Document CLI usage, optional dependencies for PNG rendering, and sample output expectations so users can quickly get started.

Specification
- Include examples for:
  expression-based plot: node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
  CSV-based plot: node src/lib/main.js --csv data.csv --file output.png
- Describe the approach used to convert SVG to PNG and list the optional packages with install commands.
- Link to the public API exports and show a minimal programmatic example.

Acceptance Criteria
- README contains at least the two example CLI commands and explains how to get PNG support by installing sharp or canvas.
- README states that SVG output uses a polyline and viewBox and that PNG output starts with PNG magic bytes.
- README references the named exports in src/lib/main.js and suggests a minimal programmatic example.

Implementation Notes
- Keep examples short and actionable; point to the tests for precise expectations.

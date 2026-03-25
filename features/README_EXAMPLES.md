# README_EXAMPLES

Summary
Provide short, actionable examples for CLI usage and a note on how PNG support is enabled.

Specification
- Examples included:
  Expression-based plot: node src/lib/main.js --expression y=Math.sin(x) --range -3.14:0.01:3.14 --file output.svg
  CSV-based plot: node src/lib/main.js --csv data.csv --file output.png
- Describe PNG renderer options and how to enable them by installing a package such as sharp or canvas: npm install sharp
- Link to the library API exports and indicate that programmatic usage is supported by importing named exports from src/lib/main.js.

Acceptance Criteria
- README contains the two example CLI commands above and describes that PNG support requires installing an optional package.
- README states that SVG output uses a polyline and viewBox and that PNG output begins with the PNG signature bytes.
- README references the named exports parseExpression, evaluateRange, renderSvg, renderPng, loadCsvTimeSeries, saveToFile, and runCli.

Implementation Notes
- Keep examples minimal and direct users to tests for precise expected output values.

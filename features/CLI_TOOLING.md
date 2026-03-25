# CLI_TOOLING

Summary
A user-friendly command line interface for generating plots from expressions or CSV time series with clear flags and a help screen.

Specification
- Supported flags:
  --expression <expression> where expression is a mathematical expression using x and Math functions, for example y=Math.sin(x)
  --range <start:step:end> where start, step, end are decimal numbers
  --csv <path> path to a CSV time series file with header columns time and value
  --file <path> output path; extension determines svg or png
  --help prints usage and examples and exits with status 0
- Behavior: Validate flags, print helpful errors for invalid inputs, and call library APIs to produce and save the requested plot.
- API: Expose a named export runCli that accepts an argv array for programmatic tests.

Acceptance Criteria
- Running node src/lib/main.js --help prints a usage summary containing the flag names and exits with status 0.
- Running node src/lib/main.js --expression y=Math.sin(x) --range -3.14:0.01:3.14 --file output.svg produces output.svg that contains an SVG polyline and a viewBox attribute.
- Running node src/lib/main.js --csv data.csv --file output.png produces output.png whose first eight bytes match the PNG signature.
- Invalid flag combinations or missing required arguments produce a non-zero exit code and a clear error message on stderr.

Implementation Notes
- Keep CLI wiring thin and testable; tests should call runCli programmatically to assert behavior without spawning a child process when possible.

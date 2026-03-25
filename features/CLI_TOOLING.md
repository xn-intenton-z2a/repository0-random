# CLI_TOOLING

Summary
A user-friendly command line interface for generating plots from expressions or CSV time series with clear flags and a help screen.

Specification
- Flags supported:
  --expression <expr> where expr is an expression like y=Math.sin(x)
  --range <start:step:end> where start, step, end are numbers
  --csv <path> path to a CSV time series file with time,value
  --file <path> output path; extension determines svg or png
  --help prints usage and examples and exits
- Behavior: Validate flags, produce helpful error messages for invalid inputs, and compose library functions to produce and save the requested plot.
- Output: Exit code 0 on success, non-zero on error.

Acceptance Criteria
- Running node src/lib/main.js --help prints a usage summary and example invocations.
- Running the CLI with --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg produces an output.svg file containing SVG markup and a polyline.
- Running the CLI with --csv data.csv --file output.png produces a valid PNG file starting with PNG magic bytes.
- Invalid flag combinations produce a helpful error and non-zero exit code.

Implementation Notes
- Keep CLI code minimal and testable; expose a runCli function as a named export so tests can invoke CLI logic programmatically.

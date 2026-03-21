# CLI_TOOL

Summary

Provide a small CLI interface implemented in src/lib/main.js that accepts a single numeric argument and writes newline-separated FizzBuzz output to stdout and returns a non-zero exit code on invalid input.

Specification

- CLI behaviour:
  - Accept a single positional argument parsed as a number
  - Validate input using the same TypeError/RangeError rules as the library; on invalid input print a short usage message to stderr and exit with code 1
  - On valid numeric input n, print n lines to stdout corresponding to fizzBuzz(n) results
- Implementation note:
  - Keep CLI argument parsing minimal and colocated with exports so the same file can be used as library and script

# Acceptance Criteria

- Running node src/lib/main.js 15 writes 15 lines to stdout and the last line is FizzBuzz
- Running node src/lib/main.js abc writes a short usage message to stderr and exits with status 1
- The CLI reuses the same validation rules as the exported functions

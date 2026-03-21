# CLI_TOOL

# Overview
Define a small command-line interface to run schema diffs from the shell so quick interactive checks and CI-friendly checks are possible. The CLI acts as a thin wrapper around the public library API and exposes format selection and error reporting.

# Behaviour
- Provide a CLI entrypoint at src/lib/main.js that accepts two positional arguments representing paths to JSON Schema files: the before schema and after schema.
- Support a format option with allowed values text and json used to control renderChanges output; default to text.
- Print formatted output to stdout. On success exit with code 0. On error (invalid JSON, remote $ref, missing file) print an informative message to stderr and exit with non-zero code.
- The CLI must use resolveLocalRefs to canonicalize schemas before diffing and must propagate resolver errors (for example remote refs) as CLI errors.

# Acceptance Criteria
- Running the CLI with two valid schema files and format text prints readable multi-line text output containing a summary of changes.
- Running the CLI with format json prints a JSON array of change records to stdout.
- CLI returns a non-zero exit code and prints a helpful error message when a remote $ref is encountered.
- Unit or integration tests exercise the CLI with example schema files in the examples directory and assert stdout contains expected change path and changeType values.

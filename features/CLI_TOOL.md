# CLI_TOOL

Summary

Provide a small, well-documented command-line interface that exposes the library's string utilities as simple subcommands so users can quickly run and test functions from the terminal.

Specification

API / CLI

- Command: node src/lib/main.js <command> [args...]
- Supported subcommands (positional): slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein
- Common flags:
  - --json : emit JSON { command, input, output }
  - --help : show usage for a subcommand

Behavior

- Subcommands accept arguments as the function would: e.g. slugify "Hello World!" prints hello-world.
- truncate accepts: truncate <text> <maxLength> [suffix]
- levenshtein accepts two positional args: levenshtein <a> <b> and prints the numeric distance.
- Treat missing or empty inputs the same way as the library functions (null/undefined -> empty string).
- Exit with code 0 on success and non-zero for invalid usage.

Files to change

- src/lib/main.js: extend main to dispatch subcommands and implement --json output for results.
- tests/unit/cli.test.js: unit tests that spawn node src/lib/main.js with arguments and assert stdout and exit codes.
- README.md: add a CLI Usage section with short examples for a few subcommands.

Acceptance criteria

1. Running node src/lib/main.js slugify "Hello World!" prints exactly hello-world followed by a newline and exit code 0.
2. Running node src/lib/main.js levenshtein kitten sitting prints exactly 3 followed by a newline and exit code 0.
3. Running node src/lib/main.js truncate "Hello World" 8 prints Hello… and exit code 0.
4. Running node src/lib/main.js slugify "Hello World!" --json prints a single JSON object that includes the fields command: "slugify", input: "Hello World!", output: "hello-world" and exit code 0.
5. Invalid usage (missing required args) prints usage to stderr and exits with a non-zero status.

Test cases

- Command: node src/lib/main.js slugify "Hello World!" -> stdout: "hello-world\n"; exit: 0
- Command: node src/lib/main.js levenshtein kitten sitting -> stdout: "3\n"; exit: 0
- Command: node src/lib/main.js truncate "Hello World" 8 -> stdout: "Hello…\n"; exit: 0
- Command: node src/lib/main.js slugify "Hello World!" --json -> stdout: '{"command":"slugify","input":"Hello World!","output":"hello-world"}\n'
- Command: node src/lib/main.js truncate -> stderr contains "Usage" and exit != 0

Notes

- Keep the CLI minimal and rely on the already-exported functions; do not add heavy dependencies.
- This feature documents the library usage from the terminal and provides quick smoke tests for the implemented utilities.

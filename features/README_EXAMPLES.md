# README_EXAMPLES

Summary

Add concise usage examples to README demonstrating the primary public API: parse, stringify, nextRun, nextRuns, and matches. Examples should emphasise UTC behaviour and validation errors.

Scope

- Provide short examples showing: parsing an expression, computing a single next run, computing multiple future runs, checking match for a given UTC date, and handling invalid input.

Acceptance Criteria

1. README contains usage examples for parse, nextRun, nextRuns, matches and stringify that are easy to follow and reference the library entry point at src/lib/main.js.
2. README explicitly states that all times are UTC and that month-end skipping and leap-year rules are observed.
3. Examples do not use external dependencies and are concise enough to copy into unit tests.

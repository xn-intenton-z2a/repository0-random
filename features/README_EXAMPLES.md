# README_EXAMPLES

Summary
Add clear, minimal usage examples to README.md that show library consumers how to parse cron expressions, compute next run(s), check matches, stringify parsed objects, and use shortcuts. Examples must be plain text lines (no code fences) and demonstrate UTC semantics.

Specification
- Update README.md with an Examples section showing how to import the library and call the primary named exports: parseCron, nextRun, nextRuns, matches, stringifyCron, and expandShortcut.
- Include one-line examples demonstrating:
  - Parsing a step expression and the resulting parsed structure shape.
  - Computing the next run for a weekly schedule (showing the resulting ISO timestamp in UTC) and that fromDate exactly equal to a schedule returns the subsequent occurrence.
  - Computing the next 7 runs for @daily and showing seven consecutive ISO UTC dates.
  - Matching a specific date against a cron expression and showing a true result for 2025-12-25T00:00:00Z against a Christmas schedule.
  - Stringifying a parsed object with and without seconds present (explicitly state when a six-field string is produced).
- Add a short note that all times are UTC and that day-of-month semantics do not fall back to the last day of the month.
- Add a short example of using the CLI script start:cli to print the next runs (document the expected behaviour in one or two lines).

Acceptance Criteria
- README.md contains an Examples section referencing the main library API and demonstrating parseCron, nextRun, nextRuns, matches and stringifyCron using plain text example lines.
- Examples demonstrate the UTC nature of results and include a seven-day sequence for @daily.
- README explicitly documents that a 6-field expression yields a six-field string when stringified and that parseCron accepts both five- and six-field forms.
- README examples are concise, unambiguous and suitable for inclusion in unit tests or docs assertions.
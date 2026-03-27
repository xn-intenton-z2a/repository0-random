# README_EXAMPLES

Summary

Describe the README usage examples that demonstrate typical library and CLI usage with a before/after schema pair and the expected output.

Specification

- README must include a short example that:
  - Imports diffSchemas and resolveLocalRefs
  - Shows a minimal before-schema and after-schema pair (two small object schemas with at least one changed property)
  - Calls diffSchemas and prints two forms of output: formatChangesJSON result and formatChangesText result
  - Demonstrates classification of at least one breaking and one compatible change
- CLI example: show how to run the provided CLI entry (npm run start:cli or node src/lib/main.js) to diff two JSON files on disk and print the text output.

Acceptance Criteria

- [ ] README contains an API usage example showing before and after schema pair and JSON/text outputs
- [ ] README explains how to run the CLI example and where to find the output format

Notes

- Keep examples minimal and copy-paste friendly; prefer short schemas and short sample output so they fit on a single screen.
# FORMATTING_OUTPUT

Summary

Specification for rendering a change array into human-readable text and into structured JSON suitable for machine consumption.

Specification

- Public functions: formatChangesText(changes, options?) -> string, formatChangesJSON(changes) -> object.
- Text rendering: produce one readable line per change containing classification, path, changeType and a concise description of before -> after. Example line (plain text): breaking  /properties/email  type-changed  from string -> number
- JSON rendering: return a stable JSON object with the original change records plus a classification field for each record.

Public API (named exports)

- formatChangesText
- formatChangesJSON

Acceptance Criteria

- [ ] formatChangesText returns multi-line, human-readable output that includes path, changeType and before/after information
- [ ] formatChangesJSON returns a serializable object that augments each change with classification and preserves nested-changed structure
- [ ] Unit tests verify both text and JSON outputs for representative change arrays

Notes

- Keep the default text format concise and suitable for CLI output; allow an options object for minor formatting variations (indentation, verbosity).
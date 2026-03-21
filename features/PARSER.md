# PARSER

Summary

Define a deterministic cron expression parser that accepts standard 5-field expressions (minute hour day-of-month month day-of-week) and optional 6-field expressions with seconds. The parser must support ranges (for example 1-5), lists (for example 1,3,5), steps (for example */15), and wildcards (*). The output is a structured, language-native object that represents the allowed values or stepping rules for each field.

Scope

- Parse 5-field and 6-field expressions into a structured object with explicit fields: seconds (nullable), minutes, hours, dayOfMonth, month, dayOfWeek.
- Support ranges, lists, steps and wildcards in every field.
- Do not implement timezone handling; all times are UTC.

Acceptance Criteria

1. Parsing "*/15 * * * *" returns a structured object where the minutes field indicates a step of 15 and other fields are wildcards.
2. Parsing a 6-field expression is supported and the returned object includes the seconds field.
3. Ranges such as "1-5", lists such as "1,3,5", and steps such as "*/20" are represented in the structure and can be used by scheduling logic.
4. Parser exposes a stable API used by other features: parse(expression) -> object and throws on syntactic errors.

# VALIDATION

Summary

Provide robust validation for cron expressions and produce descriptive, actionable error messages when inputs are invalid. Validation runs as part of parsing and is used to reject bad user input early.

Scope

- Validate field count (only 5 or 6 fields allowed, or a recognised shortcut).
- Validate numeric ranges per field (for example minutes 0-59, hours 0-23, day-of-month 1-31, month 1-12, day-of-week 0-6 or 1-7 depending on choice documented).
- Validate step values and range semantics.

Acceptance Criteria

1. Parsing expressions with the wrong number of fields throws an error with message containing "expected 5 or 6 fields".
2. Parsing an out-of-range value such as a minute value of 65 throws an error that mentions the field name and the allowed range.
3. Malformed tokens such as "a,b" where numbers are expected result in descriptive syntax errors.

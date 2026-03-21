VALIDATION

Normalised extract (technical content)

TABLE OF CONTENTS
1. Supported cron syntaxes (5-field and 6-field)
2. Shortcuts supported
3. Grammar for tokens (ranges, lists, steps, wildcards)
4. Field ranges and numeric validation
5. Day-of-month / month-end and leap-year rules
6. Validation algorithm (step-by-step)
7. Reference details: signatures and error messages
8. Digest and attribution

1. Supported cron syntaxes
- Supported forms:
  - 5-field standard: minute hour day month day-of-week  (fields separated by whitespace)
  - 6-field with seconds: second minute hour day month day-of-week
- Each field supports: single numeric values, ranges (a-b), lists (a,b,c), steps (*/n or a-b/n), and wildcard (*).
- Unsupported: Quartz-only constructs (L, W, #, ?, 'LW', named special characters) are rejected; this library implements the standard numeric/list/range/step syntax only.

2. Shortcuts supported
- The following shorthand strings are accepted and mapped to their equivalent expanded 5-field cron expressions (seconds omitted):
  - @yearly  -> 0 0 1 1 *
  - @monthly -> 0 0 1 * *
  - @weekly  -> 0 0 * * 0
  - @daily   -> 0 0 * * *
  - @hourly  -> 0 * * * *
- Shortcuts may be used in place of the expression; validation accepts any exact match on the list above (case-sensitive).

3. Grammar for tokens
- Token types per comma-separated element in a field:
  - Wildcard: *
  - Single value: N (integer)
  - Range: N-M (integers, N <= M)
  - Step on wildcard: */S (S integer >= 1)
  - Step on range: N-M/S
- Formal regular expression (implementation hint for initial syntax check):
  ^(\*|(\d{1,2})(-\d{1,2})?(\/\d+)?)(,(\*|(\d{1,2})(-\d{1,2})?(\/\d+)?))*$
- After the syntactic match, perform numeric range checks per field (see section 4).

4. Field ranges and numeric validation
- If expression has 6 fields, fields map to: second(0-59), minute(0-59), hour(0-23), day-of-month(1-31), month(1-12), day-of-week(0-7)
- If expression has 5 fields, fields map to: minute, hour, day-of-month, month, day-of-week (same ranges as above except no seconds field)
- day-of-week: accept 0-7 where 0 and 7 both mean Sunday; canonical internal representation maps 7 -> 0.
- Steps: step values must be positive integers; a step value greater than the field range is allowed syntactically but will produce sparse or empty schedules.
- Month and day-of-week names: by default, names (JAN, FEB, MON, TUE, ...) are not supported unless a name-to-number preprocessor is implemented; current validator treats letters as invalid tokens and returns a descriptive error.

5. Day-of-month / month-end and leap-year rules
- Day-of-month values are validated for numeric range 1..31 only at syntax validation stage; actual match-time evaluation must check per-month validity:
  - Months with 31 days: 1,3,5,7,8,10,12
  - Months with 30 days: 4,6,9,11
  - February: 28 days normally, 29 in leap years
- Leap-year rule (Gregorian): year is leap if (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
- Implementation rule: do not apply "last-day fallback". If cron expression contains 31 for day-of-month, skip months that do not have day 31.

6. Validation algorithm (step-by-step)
1) If expression begins with '@': verify it exactly matches one of the supported shortcuts; return parsed form or error.
2) Split expression on whitespace; require 5 or 6 fields; otherwise error: "expected 5 or 6 fields".
3) For each field value:
   a) Split on commas into elements.
   b) For each element: match against grammar in section 3. If no match, error: "Invalid token in FIELD: 'TOKEN'".
   c) Extract numeric values from element and ensure each numeric is within field's allowed range; if not, error: "VALUE out of range for FIELD: min..max".
   d) For ranges N-M ensure N <= M; otherwise error: "Invalid range in FIELD: N-M".
   e) For steps ensure step >= 1; otherwise error: "Invalid step in FIELD: /S".
4) Return a parsed object with canonical numeric arrays or wildcard markers for each field (used by parser/engine). Do not resolve day-of-month against months at this stage.

7. Reference details: signatures and error messages
- validateCron(expression: string): ParsedCron
  - ParsedCron: { seconds?: FieldSpec | '*', minutes: FieldSpec | '*', hours: FieldSpec | '*', dayOfMonth: FieldSpec | '*', month: FieldSpec | '*', dayOfWeek: FieldSpec | '*' }
  - FieldSpec: array of integers (explicitly enumerated allowed values) or a representation for wildcard/steps (implementation dependent).
  - Throws SyntaxError with descriptive message on invalid syntax or range violations.
- Suggested error message patterns (exact strings recommended for tests):
  - "Invalid cron expression: expected 5 or 6 fields or supported shortcut"
  - "Invalid token in FIELD_NAME: 'TOKEN'"
  - "FIELD_NAME value OUT_OF_RANGE: NUM (allowed RANGE)"
  - "Invalid step in FIELD_NAME: '/S' — step must be >= 1"
  - "Unsupported operator in FIELD_NAME: 'OP' — only ranges, lists, steps, and wildcard are supported"

8. Digest
- Validation rules synthesised from cron field specifications (man pages and cron libraries) and implementation constraints for this mission.
- Retrieved supporting date-format references from: MDN Date and ECMAScript Date spec (see SOURCES.md for links)
- Retrieved: 2026-03-21T19:10:48Z (supporting pages fetched during extraction)
- Bytes fetched (supporting pages): MDN Date 207186 bytes, ECMAScript Date spec 1146101 bytes, ISO 8601 319657 bytes

9. Attribution
- Rules and ranges based on standard cron field semantics (crontab man pages and common implementations) and the mission constraints (support ranges, lists, steps, wildcards). See SOURCES.md for primary sources.

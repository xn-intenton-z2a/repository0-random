# PARSER

Summary
Parse cron expressions (standard five-field or optional six-field with seconds) into a structured object representation. Support ranges (1-5), lists (1,3,5), steps (*/15), and wildcards (*). The parser must be deterministic and serialisable so iterators can compute next occurrences.

Specification
- Input: a cron expression string in standard five-field form minute hour dayOfMonth month dayOfWeek, or an optional six-field variant with seconds.
- Output: an object with properties seconds (optional), minute, hour, dayOfMonth, month, dayOfWeek. Each property describes allowed values as either a concrete set of integers, a range with optional step, or a wildcard indicator.
- API: named export parseCron(expression) available from src/lib/main.js.
- The parser must accept ranges, lists, steps and wildcards and should reject malformed tokens with a descriptive error.

Acceptance Criteria
- Parsing */15 * * * * returns a structured object where minute represents a step of 15 and other fields are wildcards.
- Parsing 0 0 25 12 * returns a structured object where dayOfMonth includes 25 and month includes 12.
- Parser accepts both five-field and six-field forms; when seconds are provided, the seconds field appears in the result.
- An out-of-range numeric token (for example minute 61) causes parseCron to throw a descriptive validation error.

Implementation notes
- Keep the representation compact and serialisable for stringify and iteration. Parser may delegate shortcut tokens to the Shortcuts feature for expansion.
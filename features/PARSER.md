# PARSER

Summary
Parse cron expressions (standard five-field or optional six-field with seconds) into a structured, serialisable object. The parser also performs validation and emits descriptive errors for malformed or out-of-range tokens. Shortcuts (for example @daily) are expanded before parsing.

Specification
- Input: a cron expression string in either five-field form (minute hour dayOfMonth month dayOfWeek) or optional six-field form with seconds (seconds minute hour dayOfMonth month dayOfWeek). Leading/trailing whitespace must be ignored.
- Supported token forms: wildcard (*), single value (5), lists (1,3,5), ranges (1-5), and steps (*/15 or 1-10/2).
- Shortcuts: expressions beginning with an @ token are expanded using the Shortcuts feature prior to parsing.
- Output: return a plain POJO with properties: seconds (optional), minute, hour, dayOfMonth, month, dayOfWeek. Each property uses a compact serialisable shape that describes allowed values (for example a set of explicit values, a range with optional step, or a wildcard marker). The exact shape must be stable so stringifyCron and iteration logic can rely on it.
- API: named export parseCron(expression) from src/lib/main.js. On success returns the parsed object; on failure throws an Error with a descriptive message.

Validation rules (behaviour)
- Token count: accept exactly 5 or 6 fields after shortcut expansion; otherwise throw an error stating expected and observed field counts.
- Numeric ranges: enforce field ranges and report the offending field and value. Typical ranges:
  - seconds: 0-59
  - minute: 0-59
  - hour: 0-23
  - dayOfMonth: 1-31
  - month: 1-12
  - dayOfWeek: 0-7 (0 and 7 represent Sunday)
- Steps: step values must be positive integers within the field's numeric domain; malformed steps (for example "*/0") throw descriptive errors.
- Ranges and lists: ranges must have start <= end and both in-range; list tokens must contain only valid numeric values or ranges.
- Malformed tokens: anything that does not match the supported token grammar must cause parseCron to throw an Error that names the invalid token and field.

Acceptance Criteria
- Parsing "*/15 * * * *" returns a parsed object where the minute field represents a step of 15 and minute is not treated as an explicit list; other fields are wildcards.
- Parsing "0 0 25 12 *" returns a parsed object where dayOfMonth includes 25 and month includes 12.
- parseCron accepts both five-field and six-field forms; when seconds are provided, the returned object includes seconds.
- An out-of-range numeric token (for example minute 61 or hour 24) causes parseCron to throw an Error whose message mentions the field name and the invalid value.
- Too few or too many fields produce a descriptive error stating the expected field count and the observed count.
- Malformed range or step tokens (for example "5-" or "*/0") produce clear errors indicating which token failed validation and why.
- stringifyCron(parseCron(expression)) parses back to an equivalent parsed object for a representative set of expressions (round-trip stability for canonical expressions).

Implementation notes
- Keep the internal representation compact and serialisable. Avoid mutable prototypes; use plain objects and arrays so tests can perform deep equality checks.
- parseCron should not perform iteration or compute run times; it only produces a validated representation that iteration (nextRun, nextRuns) and stringifyCron can consume.
- No external runtime dependencies. Errors must be plain Error instances with helpful message strings for test assertions.

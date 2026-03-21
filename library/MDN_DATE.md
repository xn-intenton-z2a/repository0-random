MDN_DATE

Table of contents
- Date object constructors and primary behaviors
- Static helpers and parsing (Date.UTC, Date.parse)
- UTC getters used for cron engines (getUTCFullYear, getUTCMonth, ...)
- Time value semantics (milliseconds since 1970-01-01T00:00:00Z)
- Leap-year algorithm
- Parsing formats supported (ISO8601, RFC2822, SQL) and recommended usage
- Examples for UTC-only cron engines
- Detailed digest and attribution

Normalised extract (actionable technical points)
Constructors and primary behavior
- new Date(value?: number | string | Date): Date
  - If given a number, constructs a Date representing milliseconds since the epoch (UTC).
  - If given a string, parsing follows ECMA-262 rules (ISO 8601 recommended); behavior varies for non-standard formats.
- Date.UTC(year, monthIndex[, day=1[, hour=0[, minute=0[, second=0[, ms=0]]]]]) -> number
  - Returns the time value in milliseconds for the supplied UTC components. monthIndex is 0-11.

UTC getters (use these exclusively for UTC implementations)
- getUTCFullYear(): number
- getUTCMonth(): number (0-11)
- getUTCDate(): number (1-31)
- getUTCDay(): number (0-6; 0 = Sunday)
- getUTCHours(): number (0-23)
- getUTCMinutes(): number (0-59)
- getUTCSeconds(): number (0-59)
- getUTCMilliseconds(): number (0-999)
- getTime(): number (ms since epoch)
- toISOString(): string (ISO8601 in UTC)

Parsing formats and best practice
- Prefer ISO8601 strings (e.g., "2025-12-25T00:00:00Z") for precise, unambiguous UTC times.
- Date.parse supports ISO8601 and RFC2822; do not rely on implementation-defined parsing for non-standard formats.
- When creating Date objects for UTC arithmetic, use Date.UTC(...) to compute millisecond timestamp and pass that to new Date(ms) or use new Date(Date.UTC(...)).

Leap-year algorithm (explicit)
- A year is a leap year if and only if:
  - year % 4 === 0, and
  - (year % 100 !== 0 || year % 400 === 0)
- Use this rule when validating Feb 29 for matching expressions like "29 2".

Time value semantics (important for cron engine)
- JavaScript Date stores time as an integer number of milliseconds since 1970-01-01T00:00:00Z.
- All arithmetic should be performed using millisecond timestamps and UTC getters/setters to avoid timezone/locale drift.

Examples for UTC-only cron engine
- To check whether a candidate Date matches a cron expression in UTC:
  - Use getUTCFullYear(), getUTCMonth()+1 (to map 0-11 to 1-12), getUTCDate(), getUTCHours(), getUTCMinutes(), getUTCSeconds() (if seconds field supported).
  - Compare these integers against the normalized allowed value sets extracted from the cron expression.

Detailed digest (source snapshot)
- Source: MDN - Date - JavaScript | MDN
- Retrieval date: 2026-03-21
- Bytes fetched: 201226
- Extracted facts: Date.UTC signature and semantics, UTC getters and setters, getTime(), toISOString(), recommended use of ISO8601 for unambiguous times, leap-year explicit rule.

Attribution
- Source: MDN Web Docs, "Date - JavaScript" (developer.mozilla.org)

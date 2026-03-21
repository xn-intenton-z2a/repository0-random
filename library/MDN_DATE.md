MDN_DATE

Normalised extract (technical content)

TABLE OF CONTENTS
1. Core constructors and factory functions
2. UTC getters and setters
3. Parsing and formatting (ISO 8601)
4. Month indexing and normalization behavior
5. Invalid Date and normalization rules
6. Supplementary details for cron engine use (UTC-only)
7. Reference details (API signatures)
8. Digest (source pulled and size)
9. Attribution

1. Core constructors and factory functions
- new Date(value) constructs a Date object from a numeric timestamp (milliseconds since the epoch), an ISO 8601 string, or individual date fields. When called with no arguments it returns the current time (system clock) as a Date object representing an absolute instant.
- Date.UTC(year, monthIndex[, day[, hour[, minute[, second[, millisecond]]]]]) returns a numeric value: milliseconds since 1970-01-01T00:00:00Z for the specified UTC date/time. monthIndex is zero-based (0 = January).

2. UTC getters and setters
- getUTCFullYear(): number  (e.g., 2026)
- getUTCMonth(): number  (0-11, January=0)
- getUTCDate(): number (1-31)
- getUTCHours(): number (0-23)
- getUTCMinutes(): number (0-59)
- getUTCSeconds(): number (0-59)
- getUTCMilliseconds(): number (0-999)
- setUTCFullYear(year[, monthIndex[, date]]) and corresponding setUTC* methods update the internal time value; if inputs are out of range, Date normalizes by rolling components.

3. Parsing and formatting (ISO 8601)
- Date.parse(string) accepts ISO 8601 date strings and returns milliseconds since epoch or NaN for invalid input. Recognised format for full date-time is YYYY-MM-DDTHH:MM:SS(.sss)?Z or with timezone offset +HH:MM / -HH:MM.
- dateObj.toISOString() returns a canonical UTC string: YYYY-MM-DDTHH:MM:SS.sssZ (always 3 fractional digits for milliseconds) and is suitable for storing or displaying cron match times in UTC.

4. Month indexing and normalization behavior
- Numeric month fields passed to constructors or setters are zero-based (0..11). Human-readable representations and cron month field values are 1..12; conversion is required when constructing Date from cron values.
- When numeric components are out of the usual ranges (e.g., month > 11 or day > daysInMonth), Date normalizes the value by carrying overflow into higher-order fields (month overflow increments year, day overflow increments month).

5. Invalid Date and normalization rules
- The Date constructor or Date.parse can produce an Invalid Date (internal [[DateValue]] is NaN). Use Number.isNaN(date.getTime()) or isNaN(Date.parse(...)) to detect invalid instants.
- For cron expressions that specify day-of-month values that do not exist in a particular month (e.g., 31 in April), the expression is syntactically valid but will not match that month; do not fallback to last-day semantics unless explicitly implemented.

6. Supplementary details for cron engine use (UTC-only)
- Always build and compare Date values using UTC accessors (Date.UTC and getUTC*). Avoid local-time accessors.
- When constructing next-run instants, use Date.UTC(year, monthIndex, day, hour, minute, second, millisecond) to get the epoch milliseconds, then new Date(ms) if a Date object is required.
- Use toISOString() to present results; it guarantees the required YYYY-MM-DDTHH:MM:SS.sssZ format.

7. Reference details (API signatures)
- new Date(): Date
- new Date(value: number | string | Date): Date
- Date.UTC(year: number, monthIndex: number, day?: number, hour?: number, minute?: number, second?: number, ms?: number): number
- Date.parse(dateString: string): number | NaN
- Date.prototype.getUTCFullYear(): number
- Date.prototype.getUTCMonth(): number
- Date.prototype.getUTCDate(): number
- Date.prototype.getUTCHours(): number
- Date.prototype.getUTCMinutes(): number
- Date.prototype.getUTCSeconds(): number
- Date.prototype.getUTCMilliseconds(): number
- Date.prototype.toISOString(): string

8. Digest
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
- Retrieved: 2026-03-21T19:10:48Z
- Bytes fetched: 207186

9. Attribution
Content extracted and normalised from MDN Web Docs: Date - JavaScript (see source URL above).

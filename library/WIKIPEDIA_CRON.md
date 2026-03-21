WIKIPEDIA_CRON

TABLE OF CONTENTS
1. Cron overview
2. Standard crontab (5-field) vs extended (6/7-field)
3. Field definitions and numeric ranges
4. Special characters and precise semantics
5. Shortcuts (@yearly, @monthly, ...)
6. Edge cases (month-end, leap year, DST notes)
7. Implementation notes: parsing, validation, iteration
8. Reference grammar and validation patterns
9. Supplementary details
10. Digest and attribution

1. Cron overview
Cron is a time-based job scheduler that expresses schedules via ordered fields representing time units. Primary uses: recurring jobs defined by positional fields. Implementations differ slightly (system cron vs Quartz vs libraries).

2. Standard crontab (5-field) vs extended (6/7-field)
- System crontab (classic): five fields — minute, hour, day-of-month, month, day-of-week (in that order).
- Extended/Quartz and many libraries: include seconds as a leading field (six fields: second minute hour day-of-month month day-of-week). Some variants add a year field as a seventh optional field.
- Decision for this project: accept either 5-field (assume seconds = 0) or 6-field (seconds explicit). All times are treated as UTC.

3. Field definitions and numeric ranges (exact)
- second:   0-59 (optional when using 5-field syntax; when absent treat as 0)
- minute:   0-59
- hour:     0-23
- day-month:1-31 (no implicit "last day" fallback; a value of 31 only fires in months with 31 days)
- month:    1-12 or JAN-DEC
- day-week: 0-7 or SUN-SAT (0 or 7 = Sunday)
- year (optional): 1970-2099 or implementation-defined range

4. Special characters and precise semantics
- *   : all values in the field
- ?   : no specific value (alias of '*', used in some implementations to indicate intentionally unspecified field)
- ,   : list separator (e.g., 1,3,5)
- -   : range inclusive (e.g., 1-5 is 1,2,3,4,5)
- /   : step values (e.g., */15 means every 15th value within range)
- L   : last (in day-of-month means the last day of month; in day-of-week can mean last specific weekday of month in Quartz-style syntax)
- W   : weekday nearest given day (only valid on day-of-month numeric single values)
- #   : nth weekday of month (e.g., 6#3 = third Friday)
- H   : hashed/randomized value (library-specific; maps a stable pseudo-random value per identifier/seed)

Implementation semantics required by mission:
- Do not interpret day-of-month=31 as "last day of month" in shorter months — skip months without that day.
- Leap-year handling: 29 Feb only matches in leap years (no fallback to 28th or last day).

5. Shortcuts (must be supported)
- @yearly  => 0 0 0 1 1 *   (or 0 0 1 1 * for 5-field)  (midnight Jan 1)
- @monthly => 0 0 0 1 * *   (or 0 0 1 * * )
- @weekly  => 0 0 0 * * 0   (or 0 0 * * 0)
- @daily   => 0 0 0 * * *   (or 0 0 * * *)
- @hourly  => 0 0 * * * *   (or 0 * * * * )
- @reboot  => not applicable for UTC-only schedule computations (documented but out of scope for deterministic next-run calculations)

6. Edge cases (explicit rules for implementation)
- Month-end: expressions containing a day-of-month value greater than the number of days in a month must be skipped for that month (no fallback to last day).
- February/Leap years: 29th Feb only matches on leap years; expressions using 29 must not match in non-leap years.
- Day-of-month and day-of-week interaction: when both fields are restricted, POSIX crontab treats entry as running when either field matches. For this project adopt the classic behavior unless strict mode is requested (see implementation notes).
- DST: All computation must be in UTC; local DST rules are out of scope.

7. Implementation notes: parsing, validation, iteration
- Tokenize on whitespace (after expanding @shortcuts). Detect 5-field vs 6-field.
- Field parser: parse comma-separated items; each item is one of: single-value, range, range/step, wildcard, step-from-wildcard, special token (L, W, #, H, ?).
- Validation: reject expressions with out-of-range numeric values and unknown names; throw descriptive errors containing the field and offending token.
- Data model: parsed object should include explicit arrays or predicate functions for each field (seconds[], minutes[], hours[], dom[], month[], dow[]). Use sets or sorted arrays for fast iteration.
- Iteration: implement a deterministic nextRun(fromDate) algorithm that advances the smallest unit (second->minute->hour->day->month->year) checking field match predicates and skipping invalid dates (e.g., months without day 31). Use efficient next-candidate generation rather than scanning per-minute when possible (jump to next allowed minute/hour/day candidates).

8. Reference grammar (EBNF-like)
CRON_EXPR      := (FIELDS_6 | FIELDS_5) (EOF)
FIELDS_6       := SECOND WS MINUTE WS HOUR WS DOM WS MONTH WS DOW
FIELDS_5       := MINUTE WS HOUR WS DOM WS MONTH WS DOW
FIELD          := ITEM ("," ITEM)*
ITEM           := "*" | "?" | H_EXPR | RANGE ["/" NUMBER] | VALUE ["/" NUMBER] | SPECIAL
RANGE          := VALUE "-" VALUE
VALUE          := NUMBER | NAME
H_EXPR         := "H" ["(" NUMBER ("-" NUMBER) ")"]
SPECIAL        := VALUE "L" | VALUE "W" | VALUE "#" NUMBER
NUMBER         := [0-9]+
NAME           := [A-Za-z]{3,}

Field-specific numeric ranges are enforced (see section 3).

9. Supplementary details
- Use canonical month and weekday names for parsing (case-insensitive): JAN-DEC, SUN-SAT.
- Provide a 'strict' validation mode that disallows ambiguous expressions (e.g., both dom and dow specified) and enforces six-field expressions.
- Provide meaningful error messages, e.g., "Invalid token '32' in minute field (allowed range 0-59)" or "Unknown month name: FOO".

10. Digest and attribution
- Source: https://en.wikipedia.org/wiki/Cron
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 161,516 bytes

Attribution: content consolidated from the Wikipedia cron article (UTC retrieval), normalized and converted into implementation-directed rules for this project.

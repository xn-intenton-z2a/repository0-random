CRONTAB_MAN

Table of contents
- Fields and allowed values
- Syntax primitives (wildcard, lists, ranges, steps, tilde randomization)
- Special nicknames (@yearly, @monthly, @weekly, @daily, @hourly, @reboot)
- Day-of-month vs day-of-week matching semantics
- Environment and timezone variables
- Edge cases and implementation notes (month-end, leap years, DST)
- Reference details (explicit value ranges and name aliases)
- Detailed digest and attribution

Normalised extract (actionable technical points)
Fields and allowed values
- minute: integer 0-59
- hour: integer 0-23
- day of month: integer 1-31
- month: integer 1-12 or names JAN, FEB, ..., DEC (case-insensitive)
- day of week: integer 0-7 where 0 and 7 both mean Sunday, or names SUN, MON, ..., SAT
- Execution selection uses five time/date fields in user crontabs: minute hour day-of-month month day-of-week; some systems accept a leading seconds field (six-field format: second minute hour day month day-of-week).

Syntax primitives
- Wildcard: "*" stands for the entire allowed range of the field.
- Lists: comma-separated values express enumerations (e.g., "1,2,5").
- Ranges: "A-B" denotes all integers A..B inclusive.
- Steps: "X/Y" or "*/Y" means every Y units within the field range or within the specified range. Steps are evaluated only within the field they apply to (e.g., "*/23" in hours yields hours 0 and 23 within a day).
- Tilde randomization (cronie extension): "M~N" selects a random integer in [M, N] chosen when the crontab is parsed (rare extension).
- Command field: everything after the time/date fields up to a newline or an unescaped "%" is the command; unescaped "%" is converted to newline(s) and subsequent text is fed to command stdin.

Special nicknames supported
- @reboot (run once after reboot)
- @yearly / @annually => equivalent to "0 0 1 1 *" (or in 6-field form: "0 0 0 1 1 *")
- @monthly => "0 0 1 * *"
- @weekly => "0 0 * * 0"
- @daily => "0 0 * * *"
- @hourly => "0 * * * *"
(Implementers must map nicknames to the chosen field-count convention: 5-field vs 6-field.)

Day-of-month vs day-of-week semantics (execution rule)
- If either day-of-month or day-of-week is a wildcard ("*") and the other is restricted, jobs run when the restricted field matches.
- If both day-of-month and day-of-week are restricted (neither is "*"), the traditional V7/cronie behavior is: the job runs when either field matches (logical OR). Example: "30 4 1,15 * 5" runs on the 1st and 15th of each month and every Friday.

Environment and timezone
- crond sets default environment variables: SHELL (/bin/sh), LOGNAME, HOME; MAILTO controls email destination (MAILTO="" disables mail).
- CRON_TZ may be specified per-crontab to interpret times in that IANA timezone; crond still writes logs in the system local time. The mission here uses UTC exclusively; CRON_TZ handling is an implementation choice but should be ignored/treated as UTC if mission requires.

Edge cases and implementation notes (actionable)
- Month-end boundary: a schedule such as "0 0 31 * *" must only match months that contain day 31; do not apply "last-day-of-month" fallback. Implementation: when incrementing months, validate that the candidate date has the requested day-of-month; if not valid, skip that month.
- Leap years: dates with day-of-month = 29 and month = 2 match only for leap years (see leap-year algorithm in MDN_DATE document). Implementation: compute valid days for February using leap-year rule.
- DST transitions: non-existent local times (clocks move forward) will not match; repeated local times (clocks fall back) may match twice. For mission (UTC-only), DST is not applicable.
- Steps semantics: when parsing "A-B/N" produce numbers A, A+N, A+2N, ... <= B. For "*/N" treat A as field minimum (e.g., minutes: 0).

Supplementary details
- Names to numeric mapping: month names JAN..DEC map to 1..12; weekday names SUN..SAT map to 0..6 (both 0 and 7 map to Sunday). Accept three-letter names case-insensitive.
- Validation rules: enforce numeric ranges and valid combinations. On invalid syntax or values, throw descriptive errors such as "Invalid cron expression: field X out of range" or "Invalid token: 'foo' in month field".
- Parsing strategy: tokenize fields by whitespace (up to 5 or 6 fields), support lists/ranges/steps per field, expand to normalized sets of allowed values per field for fast matching.
- Matching strategy: to check a given UTC date, compute its UTC fields (second? minute? depending on 5/6-field mode) and test membership in each expanded field set, applying day-of-month/day-of-week OR rule as above.

Reference details (explicit specs)
- Field ranges and types (inclusive): minute 0-59, hour 0-23, day-of-month 1-31, month 1-12 (JAN=1..DEC=12), day-of-week 0-7 (0 or 7 = Sunday), optional second 0-59 for six-field format.
- Allowed tokens in fields: *, ?, -, ,, /, L (last in day-of-month or day-of-week extensions), # (nth weekday of month extension), H (hash/randomization extension in some implementations), tilde (~) (cronie random range extension).
- Day matching policy: if both DOM and DOW are non-wildcard, match when DOM or DOW matches (OR); strict implementations may forbid combined restrictions.

Detailed digest (source content snapshot)
- Source: https://man7.org/linux/man-pages/man5/crontab.5.html
- Retrieval date: 2026-03-21
- Bytes fetched: 24289
- Extracted facts: field ranges, syntax primitives, special nicknames (@yearly, @monthly, @weekly, @daily, @hourly), OR logic for day matching, step and range semantics, CRON_TZ and MAILTO behaviour, tilde randomization extension, note about DST behaviour and command "%" escaping.

Attribution
- Original manual: crontab(5) Linux manual page (Paul Vixie / cronie). HTML rendering from man7.org.

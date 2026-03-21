CRONTAB_GURU

Table of contents
- Purpose and utility (interactive expression generator)
- Field order (5-field canonical mapping used by crontab.guru)
- Common expressions and real-world patterns
- Example conversions and interpretation rules
- Edge cases and implementation hints
- Detailed digest and attribution

Normalised extract (actionable technical points)
Purpose
- Crontab.guru is an interactive editor and examples site for cron schedules; it documents how common cron expressions map to human descriptions which is useful for test cases.

Field order (crontab.guru canonical)
- 5-field crontab: minute hour day-of-month month day-of-week
- Example: "*/15 * * * *" => every 15 minutes

Common patterns (examples and exact interpretation)
- "*/N * * * *" = every N minutes (field = minute)
- "0 9 * * 1" = at 09:00 on every Monday (day-of-week 1) — when evaluating in UTC use UTC-derived weekday and hour to match scheduled times
- "0 0 25 12 *" = at 00:00 on 25 December (Christmas)
- "0 0 31 * *" = midnight on the 31st day of months that have a 31st day; skip months without day 31
- "0 0 29 2 *" = midnight on Feb 29; enforce leap-year rule

Implementation hints derived from examples
- To compute next run times, iterate candidate dates forward from the base date and test membership against normalized field sets; ensure increment strategy moves to the next plausible field-level (e.g., increment minute/hour/day) rather than naive per-day scans for performance.
- Use crontab.guru examples to derive expected human descriptions for unit-test golden values.
- Use canonical 5-field parsing for most user-facing crontabs, but include optional support for a leading seconds field if mission requires 6-field compatibility.

Detailed digest (source snapshot)
- Source: https://crontab.guru/
- Retrieval date: 2026-03-21
- Bytes fetched: 16681
- Extracted facts: canonical 5-field examples, mapping of common patterns to human descriptions, useful canonical examples for testing (*/15, @daily, day-of-week examples), recommended interpretations for edge-cases like month-end and leap-year.

Attribution
- Source: Crontab.guru (Cronitor)

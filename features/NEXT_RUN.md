# NEXT_RUN

Summary
Compute the single next run time after a given date in UTC.

Specification
- API: named export nextRun(expression, fromDate?) in src/lib/main.js. fromDate defaults to now (UTC).
- Behavior: return a Date instance in UTC representing the next occurrence strictly after fromDate.
- Respect parsed semantics including optional seconds and shortcut expansion performed by Shortcuts.
- Do not perform last-day fallback when day-of-month does not exist in a month; skip months without the specified day.

Acceptance Criteria
- For expression 0 9 * * 1 and an appropriate fromDate before the next Monday, nextRun returns the next Monday at 09:00 UTC.
- If fromDate is exactly a scheduled time, nextRun returns the subsequent occurrence after that time.
- When seconds are present in the expression, returned Date objects include the matching seconds.
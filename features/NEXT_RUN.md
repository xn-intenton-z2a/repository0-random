# NEXT_RUN

Summary

Provide functions to compute the next run time after a given UTC Date (default: now) and to compute the next N run times in ascending order. Scheduling logic must obey the parsed cron rules, handle month-end skipping, and respect leap years.

Scope

- nextRun(parsedCron, fromDate?) -> Date (UTC)
- nextRuns(parsedCron, fromDate?, count) -> Array of Dates (UTC)
- Avoid falling back to the last day of a month; skip months that do not contain the specified day-of-month.

Acceptance Criteria

1. Next run for expression "0 9 * * 1" returns the next Monday at 09:00 UTC relative to a given fromDate.
2. nextRuns for expression "@daily" returns consecutive daily UTC dates; requesting 7 returns 7 consecutive days.
3. For expression "0 0 31 * *" starting from 2025-01-01, requesting the next 3 runs returns dates on 2025-01-31, 2025-03-31, and 2025-05-31 (skipping months without day 31).
4. Returned Date objects are strictly increasing, in UTC, and use native Date instances.

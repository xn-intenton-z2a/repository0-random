# EDGE_CASES

Summary
Handle month-end boundaries, leap years and other schedule edge cases precisely.

Specification
- Behavior: schedules that specify a day-of-month that does not exist in some months (for example 31) must skip those months rather than falling back to the last day. Schedules for Feb 29 must only match in leap years.
- Iteration functions (nextRun, nextRuns) must respect these rules and never produce out-of-range dates.

Acceptance Criteria
- nextRuns for 0 0 31 * * starting from 2025-01-01 with n = 3 returns dates in January, March and May, skipping months without day 31.
- A schedule for Feb 29 only yields matches in leap years, for example 2024-02-29 and 2028-02-29.
- Iteration across months with differing lengths does not produce invalid or adjusted dates.
# NEXT_RUNS

Summary
Compute the next N run times after a given date in UTC.

Specification
- API: named export nextRuns(expression, n, fromDate?) returning an array of n Date objects in ascending order.
- Behavior: iterate the schedule efficiently, skipping months/days that are not valid (for example months without day 31) and respecting leap years. All returned Date objects are UTC.

Acceptance Criteria
- For shortcut expression @daily and n = 7, nextRuns returns seven consecutive daily dates in UTC.
- For expression 0 0 31 * * starting from 2025-01-01 and n = 3, nextRuns returns dates in January, March and May (skipping months without 31).
- When n is zero or negative, nextRuns returns an empty array.
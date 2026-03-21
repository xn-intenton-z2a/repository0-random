# MATCH_CHECK

Summary
Check whether a specific UTC date matches a cron expression.

Specification
- API: named export matches(expression, date) returning a boolean.
- Behavior: return true only when the provided date exactly satisfies all relevant fields of the schedule (including seconds when present). Accept Date objects or ISO date strings interpreted in UTC.

Acceptance Criteria
- matches for expression 0 0 25 12 * against 2025-12-25T00:00:00Z returns true.
- matches returns false for dates that do not satisfy all required fields.
- When the expression includes seconds, matches verifies the seconds component as well.
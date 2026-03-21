# MATCHER

Summary

Expose a function that checks whether a specific UTC Date matches a cron expression. Matching must consider seconds if present in the expression; if seconds are omitted the library treats second as zero for matching and next-run calculations.

Scope

- matches(parsedCron, date) -> boolean
- Support exact matching semantics; a date matches only when every cron field condition is satisfied.

Acceptance Criteria

1. Matching expression "0 0 25 12 *" against date 2025-12-25T00:00:00Z returns true.
2. When a cron expression contains a seconds field, seconds must match exactly; when seconds are omitted, the matching function treats seconds as zero.
3. Matching handles lists, ranges and steps consistently with the parser's output.

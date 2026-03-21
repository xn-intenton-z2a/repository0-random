# TESTS

Summary

Define a comprehensive unit test plan for tests/unit that verifies parsing, serialization, matching, and scheduling behaviour. Tests must cover edge cases such as month-end skipping, leap years, and invalid input.

Scope

- Add unit tests for: parser (steps, ranges, lists, wildcards), serializer (round-trip), matcher (field combinations), nextRun and nextRuns (including the acceptance examples), shortcuts, and validation errors.
- Tests must be deterministic and use UTC Date strings.

Acceptance Criteria

1. Unit tests include cases that assert: parsing "*/15 * * * *", next run for "0 9 * * 1" is next Monday at 09:00 UTC, matching "0 0 25 12 *" on 2025-12-25T00:00:00Z, next 7 runs for "@daily", and next 3 runs for "0 0 31 * *" starting 2025-01-01.
2. Tests include leap year behaviour: a cron that should run on Feb 29 only succeeds in leap years.
3. Test suite is runnable with npm test and aims to drive the implementation to satisfy mission acceptance criteria.

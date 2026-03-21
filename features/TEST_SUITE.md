# TEST_SUITE

# Overview
Add comprehensive unit tests that exercise each supported change type, nested schemas, and local $ref resolution to meet the mission acceptance criteria and guard future changes.

# Behaviour
- Tests live under tests/unit/ and use vitest. Add test cases that assert exact change objects for representative before and after schema pairs.
- Required test cases: property-added, property-removed, type-changed, required-added, required-removed, enum-value-added, enum-value-removed, description-changed, nested-changed recursion, local $ref resolution success, remote $ref error, circular ref detection, classification rules, and renderer output for text and json formats.
- Each test should assert both the presence of expected change records and the classification returned by classifyChange for critical rules such as removed required property.

# Acceptance Criteria
- Unit tests cover every supported changeType and nested recursion.
- Tests verify local $ref resolution and that remote $ref values cause an error.
- Tests assert classification for removed required properties is breaking.
- All unit tests pass when running the repository test script.

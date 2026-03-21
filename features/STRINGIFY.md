# STRINGIFY

Summary
Convert a parsed cron object back to a canonical cron string.

Specification
- API: named export stringifyCron(parsed) in src/lib/main.js.
- Behavior: accept the internal parsed representation and return a standard cron string with five fields or six when seconds are present. Use a canonical, minimal representation for ranges, lists and steps so results are stable.

Acceptance Criteria
- stringifyCron(parseCron(expression)) yields a cron string which parses back to an equivalent parsed object for a representative set of expressions.
- When the parsed object includes seconds, stringifyCron produces a six-field string; otherwise it produces a five-field string.
- Stringifying a parsed object derived from a shortcut-expanded expression yields the explicit cron string equivalent.
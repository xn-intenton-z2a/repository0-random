# SHORTCUTS

Summary
Support shortcut tokens such as @yearly, @monthly, @weekly, @daily and @hourly.

Specification
- Behavior: recognize supported shortcut tokens during parsing and expand them to their canonical cron expressions. Provide a helper expandShortcut(token) for explicit expansion.
- Integration: parseCron should accept shortcuts or delegate expansion to Shortcuts before parsing.

Acceptance Criteria
- Parsing @daily returns a parsed object equivalent to the explicit string 0 0 * * *.
- nextRuns with @daily and n = 7 returns seven consecutive daily dates.
- stringifyCron of a parsed shortcut-expanded object returns the explicit cron string equivalent.
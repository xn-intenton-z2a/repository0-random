# SHORTCUTS

Summary

Support the standard cron shortcuts and expand them to their equivalent cron expressions: @yearly, @monthly, @weekly, @daily, @hourly. Shortcuts are first-class inputs to the parser and must behave identically to their expanded equivalents.

Scope

- Recognise shortcut strings and parse them into the same structured object as expanded expressions.
- Ensure scheduling and matching logic accept shortcuts as inputs.

Acceptance Criteria

1. Parsing "@yearly" is equivalent to parsing "0 0 1 1 *".
2. Parsing "@daily" and computing nextRuns with count 7 returns seven consecutive UTC dates one day apart.
3. Shortcuts are documented and supported by parse, nextRun(s), and matches functions.

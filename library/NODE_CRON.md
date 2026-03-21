NODE_CRON

TABLE OF CONTENTS
1. Purpose and quick usage
2. Syntax and allowed fields
3. Typical API signatures and runtime behavior
4. Options and scheduling control
5. Integration and differences from cron-parser
6. Digest and attribution

1. Purpose and quick usage
Node-cron is a small scheduler for Node.js allowing scheduling via cron expressions; it supports the optional seconds field and full crontab syntax. Typical usage: cron.schedule(expression, taskFn, options);

2. Syntax and allowed fields
- Supports 6-field syntax (seconds optional): second minute hour day-of-month month day-of-week
- Allowed numeric ranges: second 0-59, minute 0-59, hour 0-23, dom 1-31, month 1-12 (or names), dow 0-7 (0 or 7 = Sunday)

3. Typical API signatures (extracted / normalized)
- schedule(expression: string, task: () => void, options?: ScheduleOptions): ScheduledTask
  - expression: cron string (5- or 6-field); when 5-field is provided, seconds implicitly 0
  - returns: ScheduledTask handle

- validate(expression: string): boolean  (common helper in cron libraries)

ScheduledTask (typical methods)
- start(): void — start the scheduled task if it was created with scheduled: false
- stop(): void — stop the scheduled task from running
- destroy(): void — remove any internal timers and allow GC

4. Options and effects
- scheduled?: boolean — if false the task is created but not started
- timezone?: string — IANA timezone for execution (note: mission requires UTC-only behavior; include option for compatibility but default to UTC semantics)

5. Integration and differences from cron-parser
- node-cron is an in-process scheduler that executes functions at matching times; cron-parser is an iterator/analysis library. For this mission, implement parsing and iteration (cron-parser style) rather than in-process scheduling.
- node-cron is useful as a reference for accepted syntax and examples for schedule() usage.

6. Digest and attribution
- Source: https://github.com/node-cron/node-cron (README) and raw README retrieved
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: raw README 5,088 bytes; GitHub HTML snapshot: 332,657 bytes

Attribution: node-cron README — usage examples and allowed syntax; use as a reference for scheduler-style API but the mission requires a parsing/iteration library exported from src/lib/main.js rather than an in-process scheduler.

CRON_NPM

TABLE OF CONTENTS
1. Normalised extract (core technical API and behavior)
2. Supplementary details (field ranges, parsing rules, edge conditions)
3. Reference details (exact signatures, parameter types, return types)
4. Detailed digest (source excerpt + retrieval date)
5. Attribution and crawl size

1. Normalised extract (core technical API and behavior)
- Purpose: cron (kelektiv/node-cron) is a Node.js scheduling library that executes functions or external jobs on cron schedules. It supports an optional seconds field (six-field cron), Date or Luxon DateTime triggers, and IANA timezone execution.

- Installation: npm install cron

- Cron pattern semantics: Supports standard cron expressions with these features: wildcards (*), lists (1,3,5), ranges (1-5), steps (*/15), names for months/days (jan, mon), and an optional leading seconds field. When seconds are omitted, default semantics align with Unix: seconds = 0.

- Execution model: Users create CronJob instances (or use helper functions) that call onTick at matching times. Jobs may be started automatically by constructor argument or explicitly via job.start(). Jobs may be stopped with job.stop().

- Time resolution and timezone: Library supports second-level resolution when using six-field expressions, and accepts a timezone parameter (IANA names) to run callbacks in that zone. Note: mission requires UTC-only behavior for implementation; timezone options are documented here for compatibility but SHOULD NOT be used by the mission runtime.

- Validation/utility functions: Library exposes helpers to validate expressions and to compute scheduled dates (e.g., nextDate/nextDates) and conversion helpers that return Date or Luxon DateTime constructs.

2. Supplementary details (field ranges, parsing rules, edge conditions)
- Field order (enhanced): second minute hour day-of-month month day-of-week
- Allowed numeric ranges:
  - second: 0-59
  - minute: 0-59
  - hour: 0-23
  - day of month: 1-31 (months with fewer days do not fire for out-of-range DOM values)
  - month: 1-12 (or names: jan..dec)
  - day of week: 0-7 (0 or 7 = Sunday; names allowed: mon..sun)

- Parsing rules:
  - Steps: specified as base/step (e.g., */15), or range/step (e.g., 1-59/2).
  - Lists: comma-separated values allowed (e.g., 1,3,5).
  - Ranges: dash separated (e.g., 1-5).
  - Names: first three letters are accepted for months and weekdays (case-insensitive).

- Edge conditions and expected behavior:
  - Month-end dates: an expression like "0 0 31 * *" fires only in months that have day 31. The library does not coerce to the last day-of-month; it simply skips months without the date.
  - Leap years: expressions referencing Feb 29 fire only in leap years.
  - Missing seconds field: expressions with 5 fields are treated as if seconds=0.
  - Time computations use system time by default; when timezone provided, the library applies zone conversion for job execution times.

3. Reference details (exact signatures, parameter types, return types)
- Standalone helpers (names inferred from README):
  - sendAt(cronExpression: string): Luxon.DateTime | Date
    - Returns a DateTime representing the next execution time for the given expression.
  - timeout(cronExpression: string): number
    - Returns milliseconds until next execution.
  - validateCronExpression(expr: string): { valid: boolean, error?: string }
    - Returns validation result and optional parse error message.

- CronJob class
  - Constructor signature (normalized):
    constructor(
      cronTime: string | Date | Luxon.DateTime,
      onTick: () => void,
      onComplete?: () => void,
      start?: boolean,
      timeZone?: string,
      context?: any,
      runOnInit?: boolean,
      utcOffset?: number,
      unrefTimeout?: boolean,
      waitForCompletion?: boolean,
      errorHandler?: (err: Error) => void,
      name?: string,
      threshold?: number
    )
    - Notes: Many parameters are optional; use CronJob.from({ ... }) when convenience/clarity is needed.

  - Static factory:
    - CronJob.from(argsObject: Record<string, any>): CronJob
      - Accepts named arguments matching constructor parameters and returns a CronJob.

  - Methods:
    - start(): void — starts the job if not already running.
    - stop(): void — stops the job from triggering further onTick calls.
    - setTime(cronTime: CronTime): void — replaces the job's CronTime.
    - lastDate(): Date | null — returns last execution date.
    - nextDate(): Date | null — returns the next execution date.
    - nextDates(count?: number): Date[] — returns an array of next N execution dates.

- CronTime class
  - Constructor: new CronTime(expr: string | Date | Luxon.DateTime)
  - Purpose: encapsulates a parsed cron expression and supports iteration to compute next occurrences.

4. Detailed digest (source excerpt + retrieval date)
- Source file retrieved: https://raw.githubusercontent.com/kelektiv/node-cron/master/README.md
- Retrieval date (UTC): 2026-03-21T18:39:35.808Z
- Key excerpts included in this document were extracted from the README sections: Features, Installation, Basic Usage, Cron Patterns, API, and CronJob details. Extraction focused on exact constructor shape, method list, parameter names and the field ranges table.

5. Attribution and crawl size
- Source: kelektiv/node-cron (GitHub raw README)
- Raw README bytes downloaded during crawl: 13,288 bytes
- Also referenced: node-cron/node-cron README (GitHub) for comparator documentation; raw README bytes: 5,088 bytes
- Original npm pages for node-cron and cron were listed in SOURCES.md but their HTML is behind Cloudflare and required fetching upstream GitHub READMEs instead.

USAGE NOTE (mission relevance)
- The mission requires implementing a parsing/iteration library (parseCron, nextRun, nextRuns, matches, stringify, shortcuts) exported from src/lib/main.js. Use the API reference above for canonical behavior and match parsing semantics (six-field support, allowed ranges, steps, lists, wildcards, and month/day-of-week name handling). The mission requires UTC-only execution semantics; therefore, the timezone handling documented here is for reference only and must not be used by the mission runtime implementation.

CRON_PARSER

Table of contents
- Overview and purpose
- Cron expression format (six-field primary, five-field compatibility)
- Special characters and semantics (H, L, #, ranges, steps, lists)
- Options and types (currentDate, startDate, endDate, tz, hashSeed, strict)
- Public API signatures and return types
- Iterator and date-range behaviour (clamping, validation)
- Timezone and DST behaviour
- Crontab file parsing utilities
- Best practices, error signals, and edge-case troubleshooting
- Detailed digest and attribution

Normalised extract (actionable technical points)
Overview
- Source: cron-parser (harrisiirak). Provides parsing, iteration, next/prev, field access, timezone-aware iteration, deterministic jitter (H), and crontab file parsing utilities.
- Primary expression form used in the project is a six-field format with an optional leading seconds field: second minute hour day-of-month month day-of-week. The library supports both 6-field (seconds present) and 5-field (seconds omitted) forms and provides consistent parsing behaviour.

Cron format and tokens (authoritative)
- Field order (six-field): second (0-59), minute (0-59), hour (0-23), day-of-month (1-31), month (1-12 / JAN-DEC), day-of-week (0-7 / SUN-SAT where 0 or 7 = Sunday).
- Supported tokens: *, ?, comma-separated lists, inclusive ranges using '-', step values using '/', 'L' for last-day semantics, '#' for nth-weekday (e.g., 1#1 = first Monday), 'H' hash/jitter token, parentheses with H for ranges (H(0-10)), and combinations such as H/5.
- Predefined nicknames: @yearly, @monthly, @weekly, @daily, @hourly, @minutely, @secondly, @weekdays, @weekends (the README documents 6-field equivalents; map nicknames to chosen field-count format).

Options (CronExpressionOptions)
- currentDate: Date | string | number — if not provided and startDate provided, startDate is used as the effective currentDate; default: now (in UTC if options.tz specified or if consumer treats Date values as UTC).
- startDate: Date | string | number — inclusive start for iteration and for clamping currentDate.
- endDate: Date | string | number — exclusive (or inclusive depending on library iteration rules) upper bound for iteration; iterations that exceed endDate trigger errors like "Out of the time span range".
- tz: string — IANA timezone identifier (e.g., "Europe/London"); when provided, iteration accounts for timezone and DST transitions using Luxon.
- hashSeed: string — deterministic seed used by the H token to produce repeatable jitter values.
- strict: boolean — enable strict validation mode; strict mode enforces six fields, forbids ambiguous DOM+DOW settings, and rejects empty/degenerate expressions.

Public API (signatures and types)
- parse(expression: string, options?: CronExpressionOptions) -> CronExpression
  - Throws on invalid expression or on strict-mode violations.
- CronExpression (returned object) exposes:
  - next(): Date  -- returns next matching Date (advances internal state)
  - prev(): Date  -- returns previous matching Date (moves internal state backward)
  - take(n: number): Date[]  -- returns next n matching Dates without modifying iterator state permanently (or as provided by API)
  - iterator: Iterable<Date>  -- supports for..of to iterate matching dates lazily
  - fields: { seconds?: number[], minutes: number[], hours: number[], dayOfMonth: number[], month: number[], dayOfWeek: number[] } -- normalized arrays representing the explicit allowed values per field
  - stringify(): string -- returns expression string normalized/with H resolved if seed provided
- CronFileParser.parseFile(filePath: string) -> Promise<CronFileParseResult>
- CronFileParser.parseFileSync(filePath: string) -> CronFileParseResult
- CronFileParseResult: { variables: Record<string,string>, expressions: Array<string>, errors: Array<{line?:number, message:string}> }
- CronFieldCollection.from(fields, overrides) -> CronFieldCollection
  - CronFieldCollection.stringify() -> string

Iterator and date-range behavior (implementation rules)
- If currentDate is omitted and startDate provided, the library uses startDate as currentDate (explicit fallback).
- If currentDate lies outside [startDate, endDate] the library will clamp currentDate to the closest bound but still validates iterations against endDate; iteration beyond endDate throws descriptive error "Out of the time span range".
- Strict mode: rejects ambiguous DOM+DOW expressions, requires complete 6-field expressions, and rejects empty expressions.
- H token: deterministic if hashSeed provided; H(seed) produces reproducible numeric replacements within the valid field range; H supports ranges and step formats (H/5, H(0-10), etc.). Implementation must convert H tokens to concrete numeric sets at parse time using seeded hash function.
- L and # semantics: L in day-of-month equals last day of month; DOW L (e.g., 1L) equals last Monday of month; '#' selects nth weekday (e.g., 1#1 = first Monday).

Timezone and DST
- When tz option is provided, the library uses Luxon to create timezone-aware Date computations and will correctly handle DST transitions: nonexistent local times never match; repeated local times may match twice according to local-wall-clock semantics. For mission scope (UTC-only), set tz implicitly to 'UTC' or operate on UTC-mapped Date objects.

Crontab file parsing
- CronFileParser extracts environment variable settings (name=value), expression lines, and reports parsing errors with file line numbers. Use parseFile/parseFileSync for file operations; result contains variables, expressions, and errors arrays for programmatic analysis.

Best practices and troubleshooting
- Validate expressions at parse time and throw descriptive errors to callers: indicate offending field, token, and numeric range.
- When using H (jitter), provide a stable hashSeed (job identifier) to get reproducible schedules across process restarts.
- For month-end schedules (day-of-month 29/30/31), explicitly compute next candidate months and validate that the requested day exists; do not coerce to last-day-of-month unless expression uses L.
- If using timezone support, set tz option explicitly; do not rely on system local timezone. For UTC-only mission, treat all Date objects and epoch milliseconds as UTC and always use Date.UTC and getUTC* getters.

Reference details (API and types)
- parse(expression: string, options?: { currentDate?: Date | string | number; startDate?: Date | string | number; endDate?: Date | string | number; tz?: string; hashSeed?: string; strict?: boolean }): CronExpression
- CronExpression.next(): Date
- CronExpression.prev(): Date
- CronExpression.take(n: number): Date[]
- CronExpression.fields: Record<string, number[]>
- CronFileParser.parseFile(path: string): Promise<CronFileParseResult>
- CronFileParser.parseFileSync(path: string): CronFileParseResult

Detailed digest (source content snapshot)
- Primary source: GitHub repository cron-parser (harrisiirak) README and API docs
- Retrieval date: 2026-03-21
- Source snapshot(s): GitHub page HTML (fetched, ~462849 bytes) and raw README content (fetched at parse time)
- Extracted facts: six-field primary format, support for H/L/# tokens, options list (currentDate, startDate, endDate, tz, hashSeed, strict), iterator API (next/prev/take/iterator), deterministic jitter rules, timezone/DST handling using Luxon, crontab file parsing utilities, strict-mode validation semantics.

Attribution
- Source: https://github.com/harrisiirak/cron-parser (README and API docs)
- License: MIT (see repo)

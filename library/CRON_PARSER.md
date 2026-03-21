CRON_PARSER

TABLE OF CONTENTS
1. Source overview and scope
2. API surface extracted (signatures and types)
3. Options and their effects (explicit)
4. Iterator semantics and methods
5. Crontab file parsing utilities
6. Hash/jitter behavior
7. Strict mode and validation
8. Implementation patterns to reuse
9. Digest and attribution

1. Source overview and scope
Source: cron-parser (harrisiirak). Provides a robust JavaScript implementation for parsing cron expressions, iteration, timezone support and advanced features (H, L, W, #). Useful as a behavioral reference for parsing rules and iterator API design.

2. API surface extracted (signatures and types)
- parse(expression: string, options?: CronOptions): CronIterator
  - expression: cron expression string (5- or 6-field accepted)
  - returns: CronIterator instance exposing next(), prev(), take(n), and iterator semantics.

- CronFileParser.parseFile(path: string): Promise<CronFileResult>
- CronFileParser.parseFileSync(path: string): CronFileResult

3. Options and their effects (explicit)
CronOptions (explicit fields):
- currentDate: Date | string | number  — current base date for iteration (defaults to now UTC)
- startDate:   Date | string | number  — earliest allowed iteration bound
- endDate:     Date | string | number  — latest allowed iteration bound
- tz:          string                 — IANA timezone identifier (e.g., 'Europe/London')
- hashSeed:    string                 — seed used to compute stable hashed values for `H`
- strict:      boolean                — enable strict validation mode (requires 6 fields, disallows ambiguous DOM+DOW)

Behavioral notes:
- If currentDate is not provided but startDate is, startDate is used as currentDate.
- If currentDate is outside [startDate,endDate] it is clamped to the range start or end and then validated during iteration; iterating beyond endDate throws an error.

4. Iterator semantics and methods
- next(): Date — returns the next matching Date (throws on overflow beyond endDate)
- prev(): Date — returns the previous matching Date
- take(n: number): Date[] — returns array of next n matches
- [Symbol.iterator]() — iterable over future dates
- stringify(): string — (where available) returns expression string

5. Crontab file parsing utilities
- parseFile(path) and parseFileSync(path) return parsed variables, expressions, and errors. Result shape: { variables: Record<string,string>, expressions: ParsedExpression[], errors: ParseError[] }

6. Hash/jitter behavior
- 'H' token: replaced with a deterministic pseudo-random value in the field range based on hashSeed; examples H, H(n-m), H/step are supported. Use hashSeed to obtain repeatable jitter values across runs.

7. Strict mode and validation
- strict: enforces 6-field expressions, disallows ambiguous DOM+DOW, and rejects empty/degenerate expressions. Errors are descriptive e.g., "Invalid cron expression, expected 6 fields" or "Cannot use both dayOfMonth and dayOfWeek together in strict mode".

8. Implementation patterns to reuse
- Use a typed options structure with normalization of date inputs (accept string/number/Date) to a single internal UTC Date representation.
- Provide iterator with lazy evaluation; support take(n) to return batches.
- Implement clear error classes: ParseError, RangeError, OutOfRangeError, IteratorEndError.
- Reuse hashSeed deterministic algorithm for H (Stable pseudo-random mapping: hash(jobId + seed) mod fieldRange).

9. Digest and attribution
- Source: https://www.npmjs.com/package/cron-parser (and project README at https://github.com/harrisiirak/cron-parser)
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: README (raw): 16,022 bytes; npm HTML snapshot: 7,186 bytes

Attribution: cron-parser README (harrisiirak) — extracts iterator design, options, H semantics and strict-mode behavior. Use these semantics as a reference for behavior compatibility, but do not copy code; project requires no external runtime dependencies.

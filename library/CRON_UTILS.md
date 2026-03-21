CRON_UTILS

TABLE OF CONTENTS
1. Normalised extract: supported fields and syntax
2. Table of contents (topics covered)
3. Detailed technical details (per-topic)
4. Supplementary implementation details
5. Reference API signatures (names and parameter types)
6. Detailed digest (retrieved content)
7. Attribution and crawl size

1. Normalised extract: supported fields and syntax
- Cron definition: fields supported by cron-utils: second, minute, hour, day-of-month (DOM), month, day-of-week (DOW), year (optional). The last field (year) can be flagged optional in a definition.
- Field value ranges: second 0-59, minute 0-59, hour 0-23, day-of-month 1-31, month 1-12, day-of-week 0-7 (with mapping), year integer values.
- Special characters supported: "*" (wildcard), "/" (step), "-" (range), "," (list), and extended tokens L, W, LW, ?, # and H.
- Extensions: Supports non-standard tokens (L, W, LW, ?, #) and nicknames (@yearly, @monthly, @weekly, @daily, @midnight, @hourly, @reboot).
- Definitions: CronDefinition is configurable; users may construct custom definitions that specify which fields exist and whether the final field is optional.
- Parsing: CronParser instantiated with a CronDefinition parses expression strings into Cron objects; parse-time validation adheres to the CronDefinition constraints.
- Builder API: CronBuilder/CronDefinitionBuilder provide programmatic construction of CronDefinitions and Cron objects to avoid string parsing ambiguity.
- Execution time: ExecutionTime.forCron(Cron) produces an ExecutionTime helper exposing lastExecution(now), nextExecution(now), timeFromLastExecution(now), timeToNextExecution(now).
- Description: CronDescriptor provides locale-specific human-readable descriptions for a Cron object (supports multiple languages).
- Migration: CronMapper converts Cron objects between different CronDefinitions (e.g., Quartz → Cron4j), enabling migrations and expression portability.

2. Table of Contents (topics covered)
1. Supported fields and value ranges
2. Special characters and extensions
3. CronDefinition and builder patterns
4. Parser behavior and validation
5. ExecutionTime: next/previous computation semantics
6. Descriptor (human-readable descriptions)
7. Migration and CronMapper semantics
8. Validation and CLI
9. Examples and usage patterns

3. Detailed technical details (per-topic)
- Supported fields and value ranges
  - second: 0-59
  - minute: 0-59
  - hour: 0-23
  - day-of-month: 1-31 (no implicit "last-day" fallback; expressions like "31" only match months that have 31 days)
  - month: 1-12 (aliases JAN-DEC supported in descriptors/parsers)
  - day-of-week: 0-7 with configurable mapping; both 0 and 7 can represent Sunday depending on definition
  - year: numeric year, optional when definition marks year as optional

- Special characters and extensions
  - "*": match all values
  - ",": list separator
  - "-": inclusive range
  - "/": steps
  - "L": last day of month (or last weekday when combined with DOW semantics)
  - "W": nearest weekday to given DOM
  - "LW": last weekday of month
  - "?": unspecified (alias in some definitions)
  - "#": nth weekday of month (e.g., 1#1 = first Monday)
  - "H": hashed/deterministic random value token (used for jitter-like behavior)

- CronDefinition and builder patterns
  - CronDefinitionBuilder.defineCron() returns a builder to declare fields and their capabilities, e.g., withSeconds().and().withMinutes().and().withYear().optional()
  - CronBuilder.cron(CronDefinition) and CronBuilder.withXXX() methods construct Cron objects programmatically; Cron.asString() returns normalized expression string.

- Parser behavior and validation
  - CronParser constructed with CronDefinition.parse(expression) returns a Cron object or throws a descriptive ParseError on invalid syntax.
  - Validation covers field ranges, illegal token combinations and provider-specific constraints.
  - Parser and Description are decoupled: parse once, describe many times without re-parsing.

- ExecutionTime semantics
  - ExecutionTime.forCron(Cron) computes lastExecution(ZonedDateTime) and nextExecution(ZonedDateTime) using standard calendar semantics.
  - Implementation notes: respects month lengths and leap years; expressions referring to non-existent DOM (e.g., 31 on Apr) simply never match in those months rather than fallback to last day.

- Descriptor and Migration
  - CronDescriptor.instance(Locale) -> CronDescriptor; descriptor.describe(Cron) -> String localized human readable description.
  - CronMapper.from<Source>To<Target>() produces a mapper that converts Cron objects between definitions (mapping constants and adjusting fields where possible).

4. Supplementary implementation details
- Normalise date inputs: accept ZonedDateTime/Instant/Date and normalise to UTC ZonedDateTime internally.
- Error classes recommended: ParseError (invalid syntax), ValidationError (semantic), ExecutionTimeError (overflow or out-of-range during iteration).
- When computing next/previous: use lazy iteration and short-circuit on overflow (detect when year grows beyond safety threshold) to avoid infinite loops.
- Hash determinism: hashed token H should use stable hash algorithm seeded by a provided string; map hash mod fieldRange to select deterministic value.
- Migration: CronMapper must be explicit about lossy conversions and expose a warning/exception when mapping is impossible.

5. Reference API signatures (names and parameter types)
- CronDefinition CronDefinitionBuilder.defineCron(): CronDefinition
- CronBuilder.cron(CronDefinition): CronBuilder
- CronBuilder.withSeconds() -> builder chain
- CronParser parser = new CronParser(CronDefinition)
- Cron cron = parser.parse(expression: String) throws ParseError
- ExecutionTime et = ExecutionTime.forCron(cron)
- ZonedDateTime next = et.nextExecution(now: ZonedDateTime)
- ZonedDateTime prev = et.lastExecution(now: ZonedDateTime)
- String desc = CronDescriptor.instance(Locale).describe(cron)
- CronMapper mapper = CronMapper.fromQuartzToCron4j(); Cron target = mapper.map(source)

6. Detailed digest (retrieved content)
- Source: https://github.com/jmrozanec/cron-utils (README)
- Retrieved: 2026-03-21
- Crawl bytes: 10743 bytes (raw README)
- Extracted sections: features list, API usage examples (builder, parse, describe, migrate), execution time examples and sample usages for descriptors and CLI commands.

7. Attribution and crawl details
- Attribution: cron-utils README (jmrozanec) under Apache-2.0 license; used as source of behavior and API patterns.
- Data obtained during crawl: README.md (raw) 10743 bytes, retrieved 2026-03-21.

USAGE NOTES (implementation targets)
- Reuse ExecutionTime naming and semantics: lastExecution(now) and nextExecution(now).
- Mirror cron-utils separation: CronDefinition (provider-specific), CronParser (parsing), ExecutionTime (time queries), CronDescriptor (human descriptions), CronMapper (migration).
- Do not copy source code; reimplement semantics and tests to match desired behavior (UTC-only time arithmetic, month-length and leap-year semantics, strict validation modes).

CRONITER

TABLE OF CONTENTS
1. Normalised extract: purpose and core semantics
2. Topics covered
3. Technical details and iteration semantics
4. Supplementary implementation notes
5. Reference patterns (API shapes)
6. Digest and attribution

1. Normalised extract: purpose and core semantics
- Purpose: Croniter is a scheduling iterator library (Python) that parses cron expressions and yields next/previous execution datetimes.
- Core capabilities: parse standard cron expressions with ranges, lists, steps, and wildcards; compute next and previous run datetimes relative to a provided start time; handle month lengths and leap years according to calendar semantics (an expression referring to DOM=31 only matches months with 31 days).

2. Topics covered
1. Parsing cron strings into an iterator
2. Iterator methods: next/get_next, prev/get_prev
3. Start-time semantics and timezone hints
4. Edge cases: month-end, leap-year handling

3. Technical details and iteration semantics
- Iterator construction: croniter(expression: str, start_time: datetime | float) -> Croniter object.
- Next computation: get_next(ret_type=datetime) -> returns next matching datetime after start_time (or after the most recent returned time when called repeatedly).
- Prev computation: get_prev(ret_type=datetime) -> returns previous matching datetime before start_time.
- Start time default: if not provided, uses current system time.
- Behavior on DOM that does not exist in a month: expression does not fire for that month (no implicit fallback to last day) — months are skipped unless expression explicitly matches an existing day.
- Leap years: February 29 matches only in leap years.

4. Supplementary implementation notes
- Provide both iterator-protocol compatibility and explicit get_next/get_prev helpers to integrate with language iteration constructs.
- When porting behavior to JavaScript, implement a CronIterator class with methods next(), prev(), take(n), and iteration protocol support. Accept a start timestamp (number) or Date object and normalise internally to UTC.
- Ensure deterministic handling of month length and leap-year checks when advancing months.

5. Reference patterns (API shapes)
- Python-idiom: from croniter import croniter; it = croniter('*/15 * * * *', start_time); next_dt = it.get_next(datetime)
- JavaScript-port suggestion: croniter(expression: string, start?: Date | string | number) => CronIterator
  - CronIterator.next(): Date
  - CronIterator.prev(): Date
  - CronIterator.take(n: number): Date[]
  - CronIterator[Symbol.iterator]() to support for..of (optional)

6. Digest and attribution
- Source: https://pypi.org/project/croniter/ (primary package page) and https://github.com/kiorky/croniter
- Retrieved: 2026-03-21
- Crawl bytes: 3101 bytes (PyPI page snapshot)
- Attribution: croniter project (Python) — used as an algorithmic reference for iterator semantics, start-time behavior, and month/leap-year handling.

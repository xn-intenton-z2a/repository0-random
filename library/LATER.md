LATER

TABLE OF CONTENTS
1. Normalised extract: parsers and schedule semantics
2. Topics covered
3. Per-topic technical details
4. Supplementary implementation notes
5. API reference (functions and behavior)
6. Digest and attribution

1. Normalised extract: parsers and schedule semantics
- Later parses schedules from three primary sources: cron expressions (parse.cron), human text expressions (parse.text), and a chainable recur API (parse.recur()).
- Schedules are serializable JSON objects and are provider-agnostic; schedules can be stored and recreated identically.
- Occurrence calculations: later.schedule(schedule).next(n) returns the next n occurrences; .prev(n, fromDate?) returns previous occurrences.
- Time handling: Later supports explicit UTC/local mode via later.date.UTC() and later.date.localTime(); schedule computations rely on the configured date mode.
- Parser examples demonstrate support for cron-like expressions including a six-field style example (seconds field) and a cron parser that supports common cron syntaxes.
- Recur API provides chainable builders to express complex temporal rules: every(2).hour().first().dayOfMonth(), on(8,20).hour().last().dayOfMonth(), except().on(12).month(), etc.
- Later includes execution helpers: later.setTimeout(callback, schedule) and later.setInterval(callback, schedule) to run code according to schedules.

2. Topics covered
1. Parsers: cron, text, recur
2. Serialization: schedules as JSON
3. Occurrence calculation semantics
4. Timezone / UTC handling
5. Execution helpers and integration
6. Determinism and test coverage

3. Per-topic technical details
- Parsers
  - parse.cron(expression) -> scheduleObject. Example expression form shown uses a six-field cron including seconds and a placeholder for day-of-month/day-of-week ("?").
  - parse.text(human) -> scheduleObject (English text like "every 5 mins").
  - parse.recur() -> chainable API with methods: every(n).unit(), on(values).unit(), first()/last(), except(), and_and().

- Serialization
  - Schedules are JSON objects with named time-period properties (e.g., {schedules:[{h: [8,20], D: [31]}]}). They can be serialized and persistently stored.

- Occurrence calculation
  - later.schedule(schedule).next(n) -> Array of Date objects (next n occurrences)
  - later.schedule(schedule).prev(n, fromDate?) -> Array of Date objects (previous n occurrences before fromDate)
  - Range queries supported via start/end parameters in many APIs.

- Time handling
  - later.date.UTC() sets calculations to UTC; later.date.localTime() sets local timezone calculations.
  - Internally Later performs deterministic calculations; DST and timezone rules are handled by switching the date mode, not by implicit timezone conversion.

- Execution helpers
  - later.setTimeout(callback, schedule) -> timer object with clear()
  - later.setInterval(callback, schedule) -> timer object with clear()

- Determinism and testing
  - Project emphasizes determinism: schedules produce the same occurrences regardless of when they are computed.
  - Large unit test coverage exists (many thousands of tests) showing focus on correctness for edge cases (last day of month, leap year behavior, etc.).

4. Supplementary implementation notes
- Implement a similar chainable builder for recur-style syntax: return an immutable, serializable schedule object.
- Provide convenience translation functions: parse.cron(expression) -> produce a schedule JSON equivalent to a recur schedule where possible.
- For occurrence computation implement both forward and backward iteration algorithms; support batching and limit checks to avoid infinite loops.

5. API reference (functions and behavior)
- parse.cron(expression: string) -> scheduleObject
- parse.text(textExpression: string) -> scheduleObject
- parse.recur() -> RecurBuilder { every(), on(), first(), last(), except(), unit selectors }
- schedule = later.schedule(scheduleObject)
- schedule.next(n: number) -> Date[]
- schedule.prev(n: number, fromDate?: Date) -> Date[]
- later.date.UTC() -> sets UTC mode
- later.date.localTime() -> sets local mode
- later.setTimeout(callback: Function, scheduleObject) -> Timer
- later.setInterval(callback: Function, scheduleObject) -> Timer

6. Digest and attribution
- Source: https://bunkat.github.io/later/ and https://github.com/bunkat/later
- Retrieved: 2026-03-21
- Crawl bytes: 11021 bytes (HTML)
- Extracted sections: parse.recur examples, cron parser example, parse.text examples, schedule.next/prev usage, later.date.UTC() configuration and setTimeout/setInterval helpers.

Attribution: Later.js homepage and repository (bunkat) — used as an implementation reference for schedule representation, chainable recur API semantics, and occurrence computation patterns.

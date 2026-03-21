QUARTZ_CRON

TABLE OF CONTENTS
1. Quartz extended cron format (6-7 fields)
2. Field definitions and allowed values
3. Special characters and semantics (L, W, #, ?)
4. Examples (explicit mappings)
5. Notes relevant to implementation (last-day semantics, name aliases)
6. Digest and attribution

1. Quartz extended cron format
Quartz uses a 6- or 7-field cron expression: second minute hour day-of-month month day-of-week [year]. Quartz explicitly documents the meaning of L, W, #, and ?. Many Java cron libraries follow this behavior.

2. Field definitions and allowed values (precise)
- Seconds    : 0-59 (mandatory in Quartz 6-field expressions)
- Minutes    : 0-59
- Hours      : 0-23
- Day-of-month: 1-31 (supports L and W modifiers)
- Month      : 1-12 or JAN-DEC
- Day-of-week: 1-7 or SUN-SAT (note: Quartz uses 1=SUN through 7=SAT in some docs; verify mapping; common interoperability maps 0/7=SUN)
- Year (optional): empty or 1970-2099

3. Special characters and semantics (exact)
- * : all values
- ? : no specific value (useful in either DOM or DOW when the other is specified)
- - : inclusive range
- , : list
- / : increments (step values) — can be applied after a range or after '*'
- L : last — in DOM means last day of month; in DOW '6L' means last Friday of month (Quartz semantics)
- W : nearest weekday to the given day-of-month (e.g., 15W)
- # : ordinal (e.g., 6#3 = third Friday)

4. Examples (explicit mappings from Quartz docs)
- "0 0 12 * * ?" => At 12:00:00pm every day
- "0 15 10 ? * *" => At 10:15:00am every day
- "0 0 12 1/5 * ?" => At 12:00pm every 5 days starting on day 1 of the month
- "0 15 10 ? * MON-FRI" => At 10:15am every Monday through Friday
- "0 0 12 L * ?" => At 12:00pm on the last day of every month

5. Implementation notes relevant to mission
- L and W semantics: L yields last calendar day; W finds nearest weekday and must not cross month boundary (if 1W and 1 is Sat, next weekday is Mon the 3rd if allowed, DO NOT move into next month if 1 is Sunday and next weekday is Monday but outside month).
- # semantics: detects nth occurrence of a weekday in the month; if no nth occurrence exists, the month has no matches.
- When both DOM and DOW are specified and neither is '?' behavior depends on implementation; Quartz has defined behaviors and special characters to avoid ambiguity — prefer using '?' for explicitness in DOM/DOW fields in strict parsing.

6. Digest and attribution
- Source: https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 22,395 bytes

Attribution: Quartz CronTrigger tutorial — authoritative for extended cron (seconds and year fields) and special-character semantics (L, W, #, ?). Use these semantics when implementing extended/6-field parsing support.

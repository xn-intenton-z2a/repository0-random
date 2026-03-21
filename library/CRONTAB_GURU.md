CRONTAB_GURU

TABLE OF CONTENTS
1. Purpose and utility
2. Natural-language mapping patterns
3. Parsing considerations for a UI helper
4. Examples and disambiguation rules
5. Supplementary implementation details
6. Digest and attribution

1. Purpose and utility
Crontab.guru is an editor and human-language translator for cron expressions. For library authors, it is a reference of canonical human-renderings for common cron patterns.

2. Natural-language mapping patterns
- Single-field wildcards: "*" -> "every <unit>" ("* * * * *" -> "every minute").
- Ranges: "1-5" -> "from X through Y" (hours 1-5 -> "between 01:00 and 05:59" depending on precision used).
- Lists: "1,3,5" -> "on the 1st, 3rd and 5th".
- Steps: "*/15" -> "every 15 <units> starting at 0"; "5/15" -> "every 15 <units> starting at 5".
- Named months/days: translate JAN->January, MON->Monday.

3. Parsing considerations for a UI helper
- Tokenize and produce a canonical internal representation first (see WIKIPEDIA_CRON for grammar). Then apply natural language templates per field in a fixed order (seconds->minutes->hours->dom->month->dow).
- Disambiguation: when both day-of-month and day-of-week are present, show both meanings: e.g., "on the 1st and on Mondays" and provide a short note: "cron runs when either matches" (unless strict mode is selected).
- Prefer concise renders: collapse contiguous ranges into "from X through Y"; collapse full-wildcards into "every <unit>".

4. Examples and disambiguation rules
- "0 9 * * 1" -> "At 09:00 UTC every Monday".
- "0 0 31 * *" -> "At 00:00 UTC on the 31st of the month (only in months that have 31 days)".
- "*/15 * * * *" -> "Every 15 minutes starting at minute 0".

5. Supplementary implementation details
- Implement a deterministic English generator mapping internal field sets to phrases, using pluralization rules for counts and ordinal generation for day-of-month values.
- Provide an optional verbosity flag for the renderer (short: single line; verbose: bullet list explanation per field).

6. Digest and attribution
- Source: https://crontab.guru/
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 16,681 bytes

Attribution: crontab.guru (UI examples and canonical phrasing). Use as a translation reference, not as authoritative behavior for edge-case semantics (man and Quartz are authoritative for semantics).

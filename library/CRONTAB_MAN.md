CRONTAB_MAN

TABLE OF CONTENTS
1. POSIX/Unix crontab canonical behavior
2. Field ranges and steps (exact)
3. Lists, ranges and step semantics
4. Day-of-month vs day-of-week interaction (POSIX note)
5. Environment variables and timezone notes
6. Shortcuts supported by many system crons
7. Digest and attribution

1. POSIX/Unix crontab canonical behavior
- System crontab is evaluated every minute by cron daemon. Each active line is either an environment setting or a scheduled command. A line contains five time/date fields followed by the command (system crontabs may include a username field before command).

2. Field ranges and steps (exact)
- minute    0-59
- hour      0-23
- day-month 1-31
- month     1-12 or names
- day-week  0-7 (0 or 7 is Sunday) or names

Step values: expressed as base/step (e.g., */15) and when combined with ranges apply only within that field's domain. Example: "0-23/2" in hours means every other hour within the day.

3. Lists, ranges and step semantics
- Lists: comma-separated values or ranges
- Ranges: hyphen inclusive
- Steps: applied after range or after wildcard (*/n)
- Randomization extension (cron variant): tilde syntax e.g., 6~15 selects a random minute between 6 and 15 at parse time (implementation-specific extension in some cron implementations like cronie).

4. Day-of-month vs day-of-week interaction (POSIX note)
- If both DOM and DOW fields are restricted (not *), POSIX cron executes the command when either field matches the current time. This leads to non-intuitive matches for combined expressions; use explicit '?' or follow Quartz semantics in strict mode to avoid ambiguity.

5. Environment variables and timezone notes
- Common environment variables: SHELL, HOME, LOGNAME, MAILTO, CRON_TZ (some implementations). CRON_TZ may influence how times are interpreted by the cron daemon, but for this library all computations are performed in UTC and CRON_TZ handling is out-of-scope.

6. Shortcuts supported by many system crons (mapping)
- @reboot, @yearly, @annually, @monthly, @weekly, @daily, @hourly — map to canonical five-field or six-field equivalents; implement support for @yearly/@monthly/@weekly/@daily/@hourly in parser.

7. Digest and attribution
- Source: https://man7.org/linux/man-pages/man5/crontab.5.html (crontab manual page)
- Retrieved: 2026-03-21
- Bytes downloaded during crawl: 24,289 bytes

Attribution: man7 crontab(5) — authoritative POSIX/system cron behavior including field ranges, step semantics, and notes on DOM/DOW interactions. Use as canonical system cron reference.

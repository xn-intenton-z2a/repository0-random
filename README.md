# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Cron engine usage (UTC-only)

This project includes a small UTC-only cron engine exported from `src/lib/main.js`.

Examples (Node ESM):

```js
import { parseCron, nextRun, nextRuns, matches, stringifyCron } from './src/lib/main.js';

// parse (5-field)
const parsed = parseCron('*/15 * * * *');
console.log(parsed.minutes); // [0,15,30,45]

// parse (6-field, seconds-first)
const parsed6 = parseCron('0 */15 * * * *');
console.log(parsed6.seconds); // [0]
console.log(parsed6.minutes); // [0,15,30,45]

// next run after given UTC date (exclusive)
const from = new Date('2026-03-21T00:00:00Z');
const next = nextRun('0 9 * * 1', from); // 5-field
console.log(next.toISOString()); // next Monday at 09:00:00Z

// 6-field next run example (seconds)
const nextSec = nextRun('5 0 9 * * *', new Date('2026-03-21T09:00:04Z'));
console.log(nextSec.toISOString()); // '2026-03-21T09:00:05.000Z'

// next N runs
const week = nextRuns('@daily', 7, new Date('2026-01-01T00:00:00Z'));
console.log(week.map(d => d.toISOString()));

// matches exact instant (seconds and milliseconds must match schedule)
console.log(matches('0 0 25 12 *', new Date('2025-12-25T00:00:00Z'))); // true
console.log(matches('5 0 9 * * *', new Date('2026-03-21T09:00:05Z'))); // true

// stringify canonical
console.log(stringifyCron(parseCron('@monthly'))); // '0 0 1 * *'
```

All functions operate in UTC and expect dates with an explicit Z suffix where applicable. For 6-field cron expressions the first field is seconds (0-59), followed by minute, hour, day-of-month, month, day-of-week.

## Getting Started

### Step 1: Create Your Repository

Click **"Use this template"** on the [repository0](https://github.com/xn-intenton-z2a/repository0) page, or use the GitHub CLI:

```bash
gh repo create my-project --template xn-intenton-z2a/repository0 --public --clone
cd my-project
```

### Step 2: Initialise with a Mission

Run the init workflow from the GitHub Actions tab (**agentic-lib-init** with mode=purge), or use the CLI:

```bash
npx @xn-intenton-z2a/agentic-lib init --purge --mission 7-kyu-understand-fizz-buzz
```

This resets the repository to a clean state with your chosen mission in `MISSION.md`. The default mission is **fizz-buzz** (7-kyu).

## File Layout

```
src/lib/main.js              <- library (browser-safe)
src/web/index.html           <- web page (imports ./lib.js)
tests/unit/*.test.js         <- unit tests (Vitest)
tests/behaviour/*            <- Playwright E2E (optional)
```

## Notes

- The cron engine supports both 5-field (minute hour day month dow) and 6-field (second minute hour day month dow) formats.
- All times are handled in UTC only.
- Validation throws SyntaxError with a descriptive message naming the offending token/field.

## License

MIT

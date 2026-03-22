# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

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

#### Built-in Missions

agentic-lib ships with 20 built-in missions plus two special modes, graded using [Codewars kyu/dan](https://docs.codewars.com/concepts/kata/) difficulty:

| Mission | Kyu/Dan | Description |
|---------|---------|-------------|
| `random` | — | Randomly select from all built-in missions |
| `generate` | — | Ask the LLM to generate a novel mission |
| `8-kyu-remember-empty` | 8 kyu | Blank template |
| `8-kyu-remember-hello-world` | 8 kyu | Hello World |
| `7-kyu-understand-fizz-buzz` | 7 kyu | Classic FizzBuzz (default) |
| `6-kyu-understand-hamming-distance` | 6 kyu | Hamming distance (strings + bits) |
| `6-kyu-understand-roman-numerals` | 6 kyu | Roman numeral conversion |
| `5-kyu-apply-ascii-face` | 5 kyu | ASCII face art |
| `5-kyu-apply-string-utils` | 5 kyu | 10 string utility functions |
| `4-kyu-apply-cron-engine` | 4 kyu | Cron expression parser |
| `4-kyu-apply-dense-encoding` | 4 kyu | Dense binary encoding |
| `4-kyu-analyze-json-schema-diff` | 4 kyu | JSON Schema diff |
| `4-kyu-apply-owl-ontology` | 4 kyu | OWL ontology processor |
| `3-kyu-analyze-lunar-lander` | 3 kyu | Lunar lander simulation |
| `3-kyu-evaluate-time-series-lab` | 3 kyu | Time series analysis |
| `2-kyu-create-markdown-compiler` | 2 kyu | Markdown compiler |
| `2-kyu-create-plot-code-lib` | 2 kyu | Code visualization library |
| `1-kyu-create-ray-tracer` | 1 kyu | Ray tracer |
| `1-dan-create-c64-emulator` | 1 dan | C64 emulator |
| `1-dan-create-planning-engine` | 1 dan | Planning engine |
| `2-dan-create-self-hosted` | 2 dan | Self-hosted AGI vision |

List all available missions:

```bash
npx @xn-intenton-z2a/agentic-lib iterate --list-missions
```

#### Write Your Own Mission

Edit `MISSION.md` directly — describe what you want to build, the features, requirements, and acceptance criteria as checkboxes:

```markdown
# Mission

Build a CLI tool that converts CSV files to formatted Markdown tables.

## Features
- Read CSV from file or stdin
- Auto-detect delimiter

## Acceptance Criteria
- [ ] Reading a CSV with 3 columns produces a 3-column Markdown table
- [ ] All unit tests pass
```

### Step 3: Enable GitHub Copilot and Configure Secrets

Add these secrets in **Settings > Secrets and variables > Actions**:

| Secret | How to create | Purpose |
|--------|---------------|---------|
| `COPILOT_GITHUB_TOKEN` | [Fine-grained PAT](https://github.com/settings/tokens?type=beta) with **GitHub Copilot** > Read | Authenticates with the Copilot SDK |
| `WORKFLOW_TOKEN` | [Classic PAT](https://github.com/settings/tokens) with **workflow** scope | Allows init to update workflow files |

Then in **Settings > Actions > General**:
- Workflow permissions: **Read and write permissions**
- Allow GitHub Actions to create PRs: **Checked**

### Step 4: Activate the Schedule

Workflows ship with schedule **off** by default. Activate them from the GitHub Actions tab by running **agentic-lib-schedule** with your desired frequency:

| Frequency | Workflow runs | Init runs | Test runs |
|-----------|--------------|-----------|-----------|
| continuous | Every 20 min | Every 4 hours | Every hour |
| hourly | Every hour | Every day | Every 4 hours |
| daily | Every day | Every week | Every day |
| weekly | Every week | Every month | Every week |
| off | Never | Never | Never |

## UUID encoding comparison

The library implements several dense, printable encodings. The table below shows a sample UUID and how the different encodings represent it (no padding):

Sample UUID: `123e4567-e89b-12d3-a456-426614174000`

| Format | Encoded value | Length |
|--------|---------------|--------|
| hex (canonical) | `123e4567e89b12d3a456426614174000` | 32 |
| base64 (no padding) | `Ej5FZ+ibEtOkVkJmFBdAAA` | 22 |
| base62 | `yqjPyWuWVBAloWtuR4THa` | 21 |
| base85 (Z85) | `5r1#mNEK!ARuV^Mf6IFx` | 20 |
| base91 | `BpmbthD9],?LHZR[m:<6` | 20 |
| base89 (densest printable, ambiguous chars removed) | `#6V,Z(a(3NHj7dP4*QK4` | 20 |
| uuid-shorthand (base89 + reversed) | `4KQ*4Pd7jHN3(a(Z,V6#` | 20 |

As shown above, the densest built-in encodings produce shorter representations than base64 (no padding) for 16-byte UUIDs.

## Usage examples

Import the library (browser or Node):

```js
import { encode, decode, listEncodings, encodeUuid, decodeUuid } from './src/lib/main.js';

// Encode arbitrary bytes
const data = new Uint8Array([0x01, 0x02, 0x03]);
const s = encode('base62', data);
const back = decode('base62', s); // Uint8Array equal to data

// List available encodings
console.log(listEncodings());

// Shorten a UUID
const uuid = '123e4567-e89b-12d3-a456-426614174000';
const shorthand = encodeUuid(uuid); // uses densest built-in by default ('base89') and reverses
console.log(shorthand);
console.log(decodeUuid(shorthand)); // returns canonical hyphenated UUID string
```

---

See `src/lib/main.js` for full API docs and the built-in character sets. If you need a custom encoding, use `createCustomEncoding(name, charset)` to register one at runtime.

# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

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

## String Utilities

This package now exposes a set of string utility functions from `src/lib/main.js`. Each function handles null/undefined by returning an empty string (except `levenshtein`, which treats null/undefined as empty strings and returns a number).

- slugify(input) -> string
  - Convert text into a URL-friendly slug. Example: slugify("Hello World!") -> "hello-world"
- truncate(input, maxLength, suffix = "…") -> string
  - Truncate text without breaking mid-word (where possible). Example: truncate("Hello World", 8) -> "Hello…"
- camelCase(input) -> string
  - Convert to camelCase. Example: camelCase("foo-bar-baz") -> "fooBarBaz"
- kebabCase(input) -> string
  - Convert to kebab-case. Example: kebabCase("Foo Bar Baz") -> "foo-bar-baz"
- titleCase(input) -> string
  - Capitalize the first letter of each word. Example: titleCase("the quick brown fox") -> "The Quick Brown Fox"
- wordWrap(input, width = 80) -> string
  - Soft-wrap text at word boundaries; never breaks words. Example: wordWrap("The quick brown fox", 10) -> "The quick\nbrown fox"
- stripHtml(input) -> string
  - Remove HTML tags and decode basic entities. Example: stripHtml("<p>Hello &amp; world</p>") -> "Hello & world"
- escapeRegex(input) -> string
  - Escape a string for use in a regular expression. Example: escapeRegex("[test].*") -> "\\[test\\]\\.\\*"
- pluralize(input) -> string
  - Basic English pluralization. Example: pluralize("baby") -> "babies"
- levenshtein(a, b) -> number
  - Compute edit distance. Example: levenshtein("kitten", "sitting") -> 3

## Website Demo

Open `src/web/index.html` in a browser (or run `npm run start`) to see a small demo that shows example outputs from the utilities.

## Remaining README content

(Original README content continues below.)

---

(Full original README content retained above this section.)

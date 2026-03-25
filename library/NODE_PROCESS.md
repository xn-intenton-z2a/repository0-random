NODE_PROCESS

Normalized extract
- process.argv is an Array of strings provided by Node.js containing command-line arguments. Index 0 is the Node executable, index 1 is the script path, and flags begin at index 2.
- CLI patterns: parse process.argv.slice(2), support flags such as --expression, --range, --csv, --file, and support --help to display usage.

Table of Contents
- process.argv structure
- Recommended parsing algorithm for simple CLIs
- Range parsing: start:step:end semantics
- Help and usage output rules
- Reference details and examples
- Detailed digest and retrieval metadata

process.argv structure
- process.argv is Array<string>. Access raw arguments via const args = process.argv.slice(2).
- Do not rely on positions beyond slice(2) for flags — parse by name to allow arbitrary ordering.

Recommended parsing algorithm for simple CLIs
- Iterate args array; for each item starting with -- treat as a flag name. If the flag expects a value (e.g., --expression, --range, --file, --csv) take the next item as its value unless the flag is a boolean switch.
- Normalize flags: allow short forms if desired (e.g., -h) but document them explicitly.
- Example parsing steps: const args = process.argv.slice(2); for i from 0 to args.length-1: token = args[i]; if token startsWith('--') then name = token.slice(2); if name in ['expression','range','file','csv'] then value = args[++i]; store mapping name->value.

Range parsing: start:step:end semantics
- Range string format: start:step:end. Split on ':' into three parts; parse each part with Number(value). Validate step != 0 and that start <= end when step > 0 (or start >= end when step < 0).
- Generate points by for (let v = start; (step>0 ? v <= end : v >= end); v = v + step) push(Number(v.toFixed(n))) where n is an appropriate decimal precision to avoid floating-point drift.

Help and usage output rules
- --help prints compact usage examples and exits with code 0. Include example commands showing both expression-driven plots and CSV-driven plots.

Reference details
- process.argv: Array<string> provided by Node.js runtime. No return type; inspect runtime values directly.

Detailed digest and retrieval metadata
- Source: https://nodejs.org/api/process.html#processargv
- Retrieved: 2026-03-25
- Bytes downloaded during crawl: 694208

Attribution
- Condensed from Node.js official process documentation.
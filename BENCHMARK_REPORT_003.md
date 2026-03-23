# Benchmark Report

**Date**: 2026-03-23
**Repository**: xn-intenton-z2a/repository0-random
**Period**: 2026-03-23T01:14:24Z → 2026-03-23T01:37:56.929Z
**Model**: gpt-5-mini

---

## Summary

Mission: implement dense binary→printable encodings and a UUID shorthand, with API, tests, and README. Progress: API and README are present and three encodings are registered, but round-trip correctness is failing for built-ins and unit tests are failing, so the mission is not complete.

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission complete | NO |
| Mission failed | NO |
| Transforms | 10 |
| Budget | 10/128 |
| Total tokens | 7279371 |
| Workflow runs | 9 |
| Commits | 5 |
| PRs merged | 1 |
| Issues (open/closed) | 1/2 |

---

## Timeline

2026-03-23T01:14:24Z — agentic-lib-init update run failed (actions run id 23417250449; workflow-runs.json) while a configuration/infra update (commit 382afc7f "update agentic-lib@7.4.58") was applied. Between 01:22–01:32 the agentic workflow created and resolved issues #74 and #75 and produced a transform that was merged as PR #77 (merged at 2026-03-23T01:32:52, commit 5a9117ed "agentic-step: transform issue #74,75 (#77)"). Subsequent test and pages builds ran (agentic-lib-test and pages runs at ~01:33) and a benchmark-report commit (2234f663) was created at 01:37:33. Immediately after merging PR #77 an instability recurred and issue #78 was opened at 2026-03-23T01:35:59 reporting failing unit tests; vitest logs in that issue show 3 failing tests in tests/unit/encodings.test.js. PR #76 remains open (agentic fix branch). Cumulative transforms recorded: 10 (agentic-lib-state.toml); budget used 10/128.

---

## Acceptance Criteria

| Criterion | Status | Evidence |
|-----------|--------|----------|
| At least 3 working encodings (base62, base85, one higher) | FAIL | src/lib/main.js registers base62, base85 and base91 via createEncodingFromCharset (see createEncodingFromCharset('base62'...), createEncodingFromCharset('base85'...), createEncodingFromCharset('base91'...)) but tests/unit/encodings.test.js shows round-trip failures for those encodings (see failing vitest output in issue #74 and #78). |
| Round-trip correct for arbitrary binary data including edge cases | FAIL | tests/unit/encodings.test.js contains explicit edge-case and random-buffer round-trip tests; vitest run failed 3 tests (edge cases, random buffers, uuid shorthand) with assertion mismatches and stack traces reported in issue #74 and #78 (see failure excerpts in issue bodies). |
| UUID encoding shorter than base64 (< 22 chars) for the densest encoding | FAIL | encodeUuid/decodeUuid are implemented in src/lib/main.js (encodeUuid reverses encoded string; decodeUuid reverses before decode) but the test that asserts densest-length < base64 (tests/unit/encodings.test.js) failed because decodeUuid threw 'decoded uuid must be 16 bytes' (stack trace shown in issue #74/#78). |
| Listing encodings returns encoding metadata (name, bits/char, charset size) | PASS | listEncodings() is implemented in src/lib/main.js (returns {name,bitsPerChar,charsetSize}); tests/unit/encodings.test.js 'custom encoding factory and listing' passed (vitest shows a green tick for that test). |
| Custom encoding can be created from a charset string | PASS | createEncodingFromCharset(name, charset, ...) implemented in src/lib/main.js; tests/unit/encodings.test.js creates 'custom-dense' and asserts encode/decode round-trip and listing — that test passed (see encodings.test.js and vitest logs). |
| All unit tests pass | FAIL | Vitest run reported 3 failing tests in tests/unit/encodings.test.js (see full failure logs attached to issue #74 and repeated in issue #78). |
| README shows UUID encoding comparison table | PASS | README.md contains a 'UUID Encoding Comparison' section with example shorthand encodings and lengths (reads: hex 32, base64 22, examples for base62/base85/base91). |

---

## Findings

### FINDING-1: API surface and documentation present (positive) (POSITIVE)

The library exposes the required named exports (listEncodings, createEncodingFromCharset, encode, decode, encodeUuid, decodeUuid, plus per-base wrappers) in src/lib/main.js and README.md contains a UUID encoding comparison table demonstrating expected output lengths. Evidence: src/lib/main.js exports block and README.md 'UUID Encoding Comparison' table.

### FINDING-2: Round-trip encode/decode failing for built-in encodings (tests failing) (CRITICAL)

Vitest shows 3 failing tests in tests/unit/encodings.test.js (edge cases, random buffers, uuid shorthand). Failure logs show mismatched Uint8Array contents after decode and a thrown error 'decoded uuid must be 16 bytes' at decodeUuid in src/lib/main.js. Evidence: failure traces embedded in issue #74 and repeated in issue #78, and the failing lines referenced (tests/unit/encodings.test.js lines ~34/45/81).

### FINDING-3: decodeUuid length check indicates data-loss or mis-decoding (CONCERN)

decodeUuid throws because the decoded byte array length is not 16 for some encodings/inputs, indicating encode/decode do not round-trip preserving exact byte-length for UUIDs. Evidence: stack trace 'Error: decoded uuid must be 16 bytes' pointing to src/lib/main.js decodeUuid check (line ~264) shown in test failure logs and issues #74/#78.

### FINDING-4: Rapid issue → PR → merge cycle did not eliminate instability (CONCERN)

Issues #74 and #75 were addressed and merged as PR #77 (commit 5a9117ed) but instability recurred and a new issue #78 reported the same failing tests shortly afterwards. Evidence: PR #77 merged at 2026-03-23T01:32:52 (pull-requests.json) and issue #78 created at 2026-03-23T01:35:59 with vitest failure logs.

### FINDING-5: Workflow flakiness and an initial failed init run (OBSERVATION)

An initial agentic-lib-init run failed (actions run id 23417250449, conclusion: failure at 01:14:24) while later test and pages runs completed successfully. Evidence: workflow-runs.json shows the failed init run; later runs (agentic-lib-test, pages) conclude success.

### FINDING-6: Sufficient transformation budget remains (OBSERVATION)

State shows cumulative-transforms=10 and transformation-budget-used=10 of 128 (agentic-lib-state.toml), so the autonomous system has capacity to iterate further without hitting budget limits. Evidence: /tmp/report-data/state.toml counters and budget sections.

---

## Recommendations

1. Create a focused debugging PR that adds instrumentation and narrow unit tests for a minimal failing case (one concrete failing byte array from the vitest logs) to reproduce and inspect the encoded string and intermediate BigInt values during encode/decode.
2. Review and correct the base conversion implementation in createEncodingFromCharset: verify endianness, leading-zero handling, and BigInt→byte reconstruction; add explicit tests for symmetric encode/decode across boundary cases (leading zeros, full-0xFF buffers, large buffers).
3. Block merges until the unit test suite is green: require the vitest job as a required status check for PR merges and prevent fast-tracked merges that reintroduce instability (PR #77 appears merged while failures recurred).
4. Open a targeted issue referencing issue #78 and the failing test logs, assign ownership, and link a PR that re-runs the failing tests locally and in CI; include a regression test that reproduces the exact failing vectors from the logs.
5. If base conversion remains brittle, consider swapping to a well-tested library for large-base encoding/decoding or implement a canonical reference algorithm (with exhaustive tests for the small domain of 16-byte inputs such as UUIDs) to ensure deterministic 16-byte round-trips.


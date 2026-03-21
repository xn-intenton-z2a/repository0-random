Table of contents
- Purpose and constraints
- Recommended small PRNGs for deterministic output
- Mulberry32 algorithm (description)
- LCG and xorshift notes
- Seeding strategies for string seeds
- Reference method signatures
- Implementation notes (JS specifics)
- Detailed digest (retrieval)
- Attribution and data size

Normalised extract
Purpose and constraints
All random generators in the mission must accept a seed and produce deterministic sequences. No runtime dependencies are allowed, so include a small, well-known, fast PRNG implementation in-source.

Recommended small PRNGs
- mulberry32: compact, good distribution for non-cryptographic uses, period ~2^32.
- xorshift variants: simple and fast, require 32/64-bit integer state.
- Linear congruential generator (LCG): simple but poorer distribution; acceptable for simple simulations if parameters chosen well.

Mulberry32 (algorithm sketch)
- Represent internal state as 32-bit unsigned integer 'a' derived from the seed.
- On each call: a = (a + 0x6D2B79F5) | 0; t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); result = ((t ^ (t >>> 14)) >>> 0) / 4294967296; return result in [0,1).
- The function returns a floating-point number in [0,1) suitable for generating noise and stochastic steps.

Seeding strategies
- Accept numeric seeds and string seeds. For string seeds, compute a 32-bit integer hash (e.g., FNV-1a or xfnv1a) then feed into PRNG initializer.
- Avoid using Date.now() as seed for deterministic tests.

LCG notes (parameters example)
- Standard LCG recurrence: X_{n+1} = (a * X_n + c) mod m. Use known-good constants for 32-bit m=2^32; e.g., a=1664525, c=1013904223.
- Return X_n / 2^32 as float.

Reference method signatures
createRNG(seed: number|string, algorithm?: 'mulberry32'|'lcg'|'xorshift') => () => number
nextRandom(rng: () => number) => number

Implementation notes (JS specifics)
- Use Math.imul for 32-bit multiplication to preserve integer wrap.
- Ensure state variables use >>>0 to coerce to unsigned 32-bit before operations.
- For reproducibility across platforms, avoid language features that differ between engines; the above integer operations are stable in modern Node versions.

Detailed digest (retrieval)
Source: https://github.com/davidbau/seedrandom
Retrieved: 2026-03-21T23:35:38Z
Bytes retrieved during crawl: 383671
Technical content extracted: seedrandom API patterns, recommended small PRNG algorithms (mulberry32 sketch) and seeding considerations for deterministic outputs.

Attribution
Content derived and normalised from: GitHub — davidbau/seedrandom (https://github.com/davidbau/seedrandom). Data size recorded above.
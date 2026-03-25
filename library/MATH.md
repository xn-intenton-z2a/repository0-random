NORMALISED EXTRACT

Key technical points (directly actionable):
- The JavaScript Math namespace provides numeric constants and pure functions for arithmetic and trigonometry used by expression evaluators. All functions accept and return Number (IEEE-754 double).
- Use Math.<name> explicitly in generated evaluation functions (Math.sin, Math.cos, Math.PI, Math.E, etc.).
- Typical functions required for plotting expressions: trig (sin, cos, tan, asin, acos, atan), exponentials/logs (exp, log, pow), roots (sqrt), absolute/min/max/clamping, rounding, sign, and random.

TABLE OF CONTENTS
1. Constants
2. Unary functions
3. Binary/variadic functions
4. Numeric behaviours and edge cases
5. Implementation notes for expression evaluators

DETAILS
1. Constants
- Math.PI: number — ratio of a circle's circumference to its diameter (~3.14159).
- Math.E: number — base of natural logarithms (~2.71828).
- Math.LN2, Math.LN10, Math.LOG2E, Math.LOG10E — numeric constants available.

2. Unary functions (signatures)
- Math.sin(x: number): number — sine of x (radians).
- Math.cos(x: number): number — cosine of x (radians).
- Math.tan(x: number): number — tangent of x (radians).
- Math.asin(x: number): number — arcsine, returns radians.
- Math.acos(x: number): number — arccosine, returns radians.
- Math.atan(x: number): number — arctangent, returns radians.
- Math.sqrt(x: number): number — square root; returns NaN for negative input.
- Math.abs(x: number): number — absolute value.
- Math.log(x: number): number — natural logarithm; NaN for x <= 0.
- Math.exp(x: number): number — e^x.
- Math.round(x: number): number; Math.floor(x: number): number; Math.ceil(x: number): number.
- Math.sign(x: number): number — sign of x.
- Math.random(): number — returns pseudo-random number in [0,1).

3. Binary/variadic functions
- Math.pow(x: number, y: number): number — x raised to y.
- Math.min(...values: number[]): number — returns smallest numeric argument.
- Math.max(...values: number[]): number — returns largest numeric argument.

4. Numeric behaviours and edge cases
- Functions operate on IEEE-754 doubles; expect NaN and ±Infinity to propagate.
- Trig inputs use radians.
- Use isFinite / Number.isFinite to validate results when necessary.

5. Implementation notes for expression evaluators
- When generating a runtime function from a string expression, expose Math explicitly or require caller to reference Math.x; do not rely on implicit global lookup.
- For allowed-function allowlists, match tokens against the canonical Math member names above.
- Validate numeric inputs (range and NaN handling) after evaluation when plotting (skip or clamp invalid points).

SUPPLEMENTARY DETAILS
- Canonical list of Math members to allow by default: PI, E, LN2, LN10, LOG2E, LOG10E, sin, cos, tan, asin, acos, atan, pow, sqrt, abs, log, exp, min, max, round, floor, ceil, sign, random.
- For deterministic test runs consider replacing Math.random or disallow it in expressions used for plots.

REFERENCE DETAILS (API SPECIFICATIONS)
- Math.sin(x: number): number — returns sine of x (x in radians).
- Math.cos(x: number): number — returns cosine of x (x in radians).
- Math.tan(x: number): number — returns tangent of x (x in radians).
- Math.asin(x: number): number
- Math.acos(x: number): number
- Math.atan(x: number): number
- Math.pow(x: number, y: number): number
- Math.sqrt(x: number): number
- Math.abs(x: number): number
- Math.log(x: number): number
- Math.exp(x: number): number
- Math.min(...values: number[]): number
- Math.max(...values: number[]): number
- Math.round(x: number): number
- Math.floor(x: number): number
- Math.ceil(x: number): number
- Math.sign(x: number): number
- Math.random(): number

IMPLEMENTATION PATTERNS
- Use explicit references: call Math.sin(x) rather than sin(x) unless you inject sin into the function scope.
- Validation pattern: after computing y = evaluate(x), accept the point only if Number.isFinite(y).
- Performance: calling Math functions repeatedly in hot loops is efficient in modern VMs; precompute constants (e.g., const PI = Math.PI) if binding into many generated functions.

TROUBLESHOOTING
- If Math functions return NaN for expected numeric inputs, check for non-numeric x (string parsing) or overflow.
- If trigonometric graph looks scaled incorrectly, confirm input units (radians vs degrees).

DETAILED DIGEST
Source excerpt (top of page): The Math namespace object contains static properties and methods for mathematical constants and functions.
Retrieved: 2026-03-25
Crawl size: 161142 bytes

ATTRIBUTION
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
MDN Web Docs (content retrieved 2026-03-25).
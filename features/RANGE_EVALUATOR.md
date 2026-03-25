# RANGE_EVALUATOR

Summary
Generate a numeric series by evaluating a callable expression function across a numeric range specified as start:step:end.

Specification
- Input: A range string in the format start:step:end where start, step, and end are decimal numbers. Step may be positive or negative.
- Behavior: Parse the range string, generate x values starting at start and advancing by step. Include the end value when it is reached exactly by stepping (inclusive semantics). For positive step include x values while x <= end; for negative step include x values while x >= end.
- Output: evaluateRange(expressionFn, rangeString) returns an array of objects {x:number, y:number} where y is the numeric result of expressionFn(x).

Acceptance Criteria
- evaluateRange(parseExpression(y=Math.sin(x)), -3.14:0.01:3.14) returns 629 points when inclusive endpoints are used; tests may accept 628 to 629 as correct depending on endpoint handling but should prefer inclusive semantics.
- evaluateRange handles negative steps such as 1:-0.1:-1 and returns a descending sequence including the endpoint when stepped.
- Malformed range strings throw a descriptive error.

Implementation Notes
- Minimize floating point drift by basing iteration on a computed count derived from (end-start)/step when practical.
- Export evaluateRange as a named export from src/lib/main.js.

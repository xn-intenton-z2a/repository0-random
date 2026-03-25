# RANGE_EVALUATOR

Summary
Produce a numeric series by evaluating a callable expression function across a range string start:step:end.

Specification
- Input: range string start:step:end where start, step, end are decimal numbers; step can be positive or negative.
- Behavior: Parse the range string and generate x values including endpoints when they are reached by stepping (use inclusive semantics: include start and include end if reached exactly within floating tolerance). For positive steps include x <= end; for negative steps include x >= end.
- Output: evaluateRange(expressionFn, rangeString) returns an array of {x:number, y:number} values where y = expressionFn(x).

Acceptance Criteria
- evaluateRange(parseExpression("y=Math.sin(x)"), "-3.14:0.01:3.14") returns 629 points (inclusive endpoints), each with numeric x and y.
- evaluateRange handles negative steps such as "1:-0.1:-1" correctly.
- For malformed range strings an informative error is thrown.

Implementation Notes
- Avoid accumulating floating point error by computing step counts or using integer arithmetic derived from the step where practical.
- Export evaluateRange as a named export from src/lib/main.js.

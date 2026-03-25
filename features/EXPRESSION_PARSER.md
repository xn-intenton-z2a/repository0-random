# EXPRESSION_PARSER

Summary
Convert a user-supplied mathematical expression string into a callable JavaScript function of x using only built-in Math and Number APIs.

Specification
- Input: A string expression that assigns y using x and Math functions, for example y=Math.sin(x) or y=x*x+2*x-1. Whitespace is allowed.
- Behavior: Extract the right-hand side expression and return a function f(x) that returns a numeric y. The evaluator must not expose node globals or allow arbitrary side effects; only Math and Number are available in the function scope.
- Errors: Invalid syntax or use of disallowed identifiers should cause parseExpression to throw an informative error.
- Export: Provide parseExpression as a named export from src/lib/main.js.

Acceptance Criteria
- parseExpression with input y=Math.sin(x) returns a callable function f such that f(0) is approximately 0 and f(Math.PI/2) is approximately 1.
- parseExpression with input y=x*x+2*x-1 returns a function f where f(2) equals 7.
- An expression attempting to reference disallowed globals such as process or require causes parseExpression to throw.
- Unit tests exercise numeric tolerance for transcendental functions and explicit equality for polynomial examples.

Implementation Notes
- A recommended approach is the Function constructor with a strict, minimal parameter list and a whitelist of allowed identifiers; avoid eval and avoid exposing unrestricted scope.

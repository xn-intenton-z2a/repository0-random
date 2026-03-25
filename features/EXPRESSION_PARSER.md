# EXPRESSION_PARSER

Summary
A concise parser that converts a user-supplied mathematical expression string into a callable JavaScript function of x. The parser must rely only on built-in Math functions and safe evaluation patterns and must be exported as parseExpression from src/lib/main.js.

Motivation
Provide safe, deterministic expression parsing for CLI and library use.

Specification
- Input: string expression of the form y=... that uses x and Math functions; whitespace allowed.
- Behavior: The parser extracts the right-hand side expression and returns a function f(x) that returns numeric y.
- Safety: The evaluator must not expose node globals, require, process, or allow arbitrary side effects; only Math and Number are permitted in the function's scope.
- Errors: Invalid expressions or usage of disallowed identifiers should throw an explicit error.

Acceptance Criteria
- parseExpression accepts "y=Math.sin(x)" and returns a callable function f such that f(0) is approximately 0.
- parseExpression with "y=x*x+2*x-1" returns a function f where f(2) equals 7.
- Passing an expression that attempts to access disallowed names (for example containing process or require) causes the parser to throw or reject the expression.
- The parser is exported as a named export parseExpression from src/lib/main.js.

Implementation Notes
- Recommend using the Function constructor with an explicit whitelist of allowed identifiers (Math) rather than eval.
- Provide unit tests that assert numeric tolerance for transcendental functions.

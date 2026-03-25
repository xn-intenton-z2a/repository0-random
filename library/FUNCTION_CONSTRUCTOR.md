NORMALISED EXTRACT

Key technical points (directly actionable):
- The Function constructor (Function) creates a new function from a list of parameter names and a function body string.
- The created function executes in the global scope (no closure over local lexical scope). Use this to evaluate dynamic expressions that reference global objects (e.g., Math) but validate inputs strictly.
- Syntax: new Function([arg1[, arg2[, ...argN]],] functionBody)

TABLE OF CONTENTS
1. Constructor signature and return
2. Scope and lexical environment
3. Errors and exceptions
4. Security and validation guidance (must implement)
5. Recommended parsing pattern for expressions

DETAILS
1. Constructor signature and return
- Function(...args: string[], body: string) -> Function object. The last argument is the function body; previous arguments are parameter names.
- When invoked with parameter names 'x' and body 'return Math.sin(x)', the result is a callable function accepting a numeric x and returning a Number.

2. Scope and lexical environment
- Functions created with the Function constructor do not capture the enclosing lexical scope. Their scope chain is the global object and their own local scope. Local variables from the creating context are not visible inside the created function.

3. Errors and exceptions
- SyntaxError is thrown when the generated function body is syntactically invalid.
- Runtime exceptions inside the function propagate to caller; wrap calls in try/catch in CLI/runner.

4. Security and validation guidance
- Never pass unvalidated user input directly to Function. Sanitize input by:
  - Tokenising the expression and validating allowed identifiers (numbers, x, Math, allowed Math members only).
  - Rejecting characters/patterns: ;, new, require, process, global, constructor, eval, Function, import, exports, window (server), globalThis, etc.
  - Limit allowed operators to arithmetic, parentheses, and permitted Math member names.
- If strict sandboxing is required, use a parser to produce an AST and evaluate the AST manually rather than using Function.

5. Recommended parsing pattern for expressions (implementation pattern)
- Normalize input by trimming whitespace.
- If expression is of form 'y=EXPR' strip leading 'y=' to get EXPR.
- Validate that EXPR contains only allowed characters and identifiers.
- Build a function with a single parameter x and body 'return (' + EXPR + ');' then call the resulting function for each x.
- After creation, test the function on small inputs and verify outputs are finite.

SUPPLEMENTARY DETAILS
- For CSV-driven expressions, pre-parse numeric input columns to Number before passing into evaluated function.
- For predictable unit tests, avoid Math.random() or stub it.

REFERENCE DETAILS (API SPECIFICATIONS)
- Constructor: Function([arg1[, arg2[, ...argN]],] functionBody)
  - Parameters: zero or more string names for arguments, followed by a final string representing the function body.
  - Returns: a Function object callable as a regular JS function.
- Exceptions: throws SyntaxError for invalid body; runtime errors propagate when calling the function.

IMPLEMENTATION PATTERNS
- Use allowlist matching for identifiers. Example allowlist: x, Math, Math.sin, Math.cos, Math.PI, numeric literals, parentheses, + - * / % ^ ** (if supported), and numeric constants.
- Recommended evaluation wrapper: call generatedFn(x) inside try/catch and treat non-finite outputs as missing points.

TROUBLESHOOTING
- If creating the Function throws SyntaxError, print or log the user expression and sanitized body for debugging.
- If function returns undefined for numeric inputs, ensure the body contains an explicit return expression.

DETAILED DIGEST
Source excerpt (top of page): The Function object provides methods for functions. In JavaScript, every function is actually a Function object.
Retrieved: 2026-03-25
Crawl size: 157123 bytes

ATTRIBUTION
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
MDN Web Docs (content retrieved 2026-03-25).
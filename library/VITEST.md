NORMALISED EXTRACT

Table of contents
- Running tests (commands)
- Test API (describe/it/test, expect matchers)
- Assertions for errors
- Coverage and npm scripts

Running tests
- Script in package.json: "test": "vitest --run tests/unit/*.test.js"
- For unit tests with coverage: "test:unit": "vitest --run --coverage tests/unit/*.test.js"

Test API (essential matchers and patterns)
- Import helpers: import { describe, it, expect } from 'vitest'
- Core assertions (plain text examples):
  - expect(value).toBe(expected)  // strict equality
  - expect(value).toEqual(expected)  // deep equality
  - expect(value).toStrictEqual(expected)  // stricter deep equality
  - expect(() => fn()).toThrow(ErrorConstructorOrMessage)
  - For async: await expect(promise).resolves.toBe(value) or rejects.toThrow()

Assertions for errors (exact patterns)
- To assert TypeError: expect(() => fn(badArg)).toThrow(TypeError)
- To assert RangeError: expect(() => fn(badArg)).toThrow(RangeError)

Coverage and integration notes
- Use npm run test:unit to run tests and produce coverage reports via Vitest's v8 coverage plugin.
- Tests for this mission should include:
  - fizzBuzz(15) returns array whose 15th element is 'FizzBuzz'
  - fizzBuzzSingle(3) returns 'Fizz'
  - fizzBuzzSingle(5) returns 'Buzz'
  - fizzBuzzSingle(15) returns 'FizzBuzz'
  - fizzBuzzSingle(7) returns '7'
  - fizzBuzz(0) returns []
  - Type and range checks: non-integer -> TypeError, negative -> RangeError

DETAILED DIGEST
Source: Vitest Guide — Getting Started (retrieved 2026-03-21)
Crawl bytes: 113697
Extracted technical content (condensed): basic vitest usage: import helpers from 'vitest', common matchers, running tests with --run, and standard patterns for asserting thrown errors and synchronous/asynchronous code.

ATTRIBUTION
Source URL: https://vitest.dev/guide/
Retrieved: 2026-03-21
Bytes retrieved: 113697

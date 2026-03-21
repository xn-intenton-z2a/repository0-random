# EXPORTS

Summary

Ensure module exports are named ESM exports so tests and documentation can import fizzBuzz and fizzBuzzSingle directly.

Specification

- Exports:
  - Define functions and export them using named export syntax compatible with type: module in package.json
  - Tests should import exactly these named exports; do not rely on a default export
- Package:
  - Confirm package.json main points to src/lib/main.js and type is module

# Acceptance Criteria

- src/lib/main.js contains named ESM exports fizzBuzz and fizzBuzzSingle
- Tests can import the functions via import { fizzBuzz, fizzBuzzSingle } from 'src/lib/main.js' and verify their behaviour

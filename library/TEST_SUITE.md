TEST_SUITE

NORMALISED EXTRACT

Table of contents
- Purpose and scope
- Repository layout and file shapes
- Test case structure and field definitions
- Running tests: runner responsibilities and algorithm
- Remote references and remotes/ mapping
- Known limitations and invariants

Purpose and scope
- The JSON Schema Test Suite provides language-agnostic JSON files that exercise validator behavior as defined by JSON Schema specifications (including draft-07).
- It is intended for validator implementers; each test encodes a schema, example instances, and expected validity outcomes.

Repository layout and file shapes
- Top-level directory: tests/ with a subdirectory per specification version (for example, draft-07/).
- Each version directory contains multiple .json files; each file is a JSON array containing test case objects.
- Special subdirectories per version include optional/ and proposals/; there is also a latest/ symlink pointing to the most recent release.

Test case structure (field definitions; use these exact shapes when building a test runner)
- Each test file is an array of test case objects.
- Test case object fields:
  - description: string — human-readable description of the test case
  - schema: JSON Schema object — the schema to validate instances against
  - tests: array of test objects
- Test object fields:
  - description: string — human-readable description of the specific example
  - data: any JSON value — the instance to be validated against the schema
  - valid: boolean — expected validation result for the instance

Running tests: required runner algorithm (step-by-step)
- For each version to test:
  1. Configure your validator to use the spec version that corresponds to the version directory (for draft-07, configure validator for draft-07 behavior).
  2. Walk each .json file in the version directory and parse it as JSON array of test cases.
  3. For each test case:
     a. Load the schema from the test case's schema field.
     b. For each test in test case.tests:
        i. Load instance from test.data.
        ii. Execute validator validation of instance against the schema.
        iii. Compare validation outcome to test.valid; if differing, record failure with test description and file path.
- The runner must support loading remote references used by tests (see remotes mapping below).

Remote references and remotes/ mapping
- Some tests exercise $ref behavior by referencing remote URIs. The suite provides a remotes/ directory containing files that correspond to the HTTP paths used in tests.
- Two recommended approaches for runners:
  - Serve remotes/ at a local HTTP server rooted at http://localhost:1234 and allow the validator to fetch by URI; or
  - Preload the remotes mapping and configure the validator to resolve known URIs to local file contents, mapping http://localhost:1234/<path> to remotes/<path>.
- The README documents a helper executable (bin/jsonschema_suite remotes) that outputs a JSON object mapping remote URIs to their in-repo contents.

Known limitations and invariants
- Every test file is valid JSON; the test suite guarantees the schema in the schema field is a valid JSON Schema for the specified version.
- The suite cannot test behaviors that cannot be represented in JSON Schema itself (for example, some normalization or environment-specific behavior).
- Optional tests (in optional/) represent tests that may not apply in all environments or languages; runners may skip them unless they explicitly opt-in.

SUPPLEMENTARY DETAILS

Version coverage
- The suite covers multiple spec versions including draft-07; some older drafts are 'frozen' and receive less frequent updates.

Test file canonicalization and stable checkout
- Recommended usage is to include the test-suite as a git subtree or submodule pinned to the main branch to ensure stable reproducible test runs.

REFERENCE DETAILS (concrete shapes and runner contract)

Test file: array of test case objects
- test file := [ test_case, test_case, ... ]
- test_case := { description: string, schema: object, tests: [ test_object, ... ] }
- test_object := { description: string, data: any, valid: boolean }

Runner contract (explicit checks to implement)
- For each test_object, the runner MUST:
  - validate test_object.data against test_case.schema
  - assert that the boolean validity matches test_object.valid
  - if mismatch, emit failure output including: file path, test_case.description, test_object.description, actual result, expected result

Remotes mapping conventions
- When running the test that expects remotes, the runner MUST ensure references to http://localhost:1234/<path> resolve to the contents of remotes/<path> from the test-suite repository unless an alternative mapping is provided and documented in runner configuration.

DETAILED DIGEST

Source: https://raw.githubusercontent.com/json-schema-org/JSON-Schema-Test-Suite/master/README.md
Retrieved: 2026-03-21
Bytes fetched: 19643

Top-level summary from source: The test suite provides JSON files organized by specification version; each file is an array of test cases where each test case contains a schema and an array of tests. Each test enumerates a data instance and a boolean expected validity result. The README contains a recommended runner algorithm, details about remotes for $ref tests, optional and proposal-based directories, and invariants about test validity.

ATTRIBUTION
- Source: json-schema-org/JSON-Schema-Test-Suite README
- URL: https://raw.githubusercontent.com/json-schema-org/JSON-Schema-Test-Suite/master/README.md
- Retrieved: 2026-03-21
- Size: 19643 bytes

USAGE NOTE FOR THIS MISSION
- Use the explicit test_object and test_case shapes above when writing unit tests for the schema-diff library to simulate validator behavior and to validate classification outcomes (breaking vs compatible) against real-world schema examples from the suite.

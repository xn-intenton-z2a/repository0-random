# VALIDATION (DEPRECATED)

Status
This feature spec has been merged into features/PARSER.md and is deprecated. The authoritative validation rules, error messages and acceptance criteria now live in PARSER.md.

Reason
Validation is an intrinsic part of parsing; keeping separate validation and parser specs caused duplication and fragmentation. To simplify the feature set and meet the mission's acceptance criteria, validation has been consolidated into the PARSER feature.

What to read
- See features/PARSER.md for the full validation rules, error messages, and testable acceptance criteria.

Acceptance Criteria (moved)
- Out-of-range values (for example minute 61) cause parseCron to throw an Error mentioning the offending field and value.
- Too few or too many fields produce a descriptive error stating the expected field count and the observed count.
- Malformed range or step tokens produce clear errors indicating which token failed validation.

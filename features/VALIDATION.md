# VALIDATION

Summary
Provide descriptive validation and error reporting for invalid cron expressions.

Specification
- API: parseCron throws on invalid syntax or out-of-range numbers with an Error whose message clearly identifies the offending field and token.
- Validation should cover token count, numeric ranges, malformed ranges/lists/steps and unsupported tokens.

Acceptance Criteria
- Expressions containing out-of-range values (for example minute 61) cause parseCron to throw an Error that mentions the minute field and the invalid value.
- Too few or too many fields produce a descriptive error stating the expected field count and the observed count.
- Malformed range or step tokens produce clear errors indicating which token failed validation.
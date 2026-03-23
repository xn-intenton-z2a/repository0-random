# CASE_CONVERSIONS

Summary

Provide three related functions: camelCase, kebabCase, and titleCase. Behavior: treat null or undefined as an empty string; normalize separators (spaces, underscores, hyphens, and other non-alphanumeric characters) into word boundaries; preserve Unicode letters; handle mixed-case inputs and collapse repeated separators.

Acceptance Criteria

- camelCase of "foo-bar-baz" returns "fooBarBaz".
- kebabCase of "Hello World" returns "hello-world".
- titleCase of "hello world" returns "Hello World".
- Null or empty input returns an empty string.
- Each function is exported as a named export from src/lib/main.js.

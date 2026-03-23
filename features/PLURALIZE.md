# PLURALIZE

Summary

Implement a basic English pluralize function following simple rules: words ending in s, x, z, ch, or sh add "es"; words ending in a consonant followed by y change to replace y with "ies"; words ending in f or fe change to "ves"; all other words add "s". Behavior: treat null or undefined as an empty string; irregular plurals are out of scope.

Acceptance Criteria

- pluralize of "box" returns "boxes".
- pluralize of "baby" returns "babies".
- pluralize of "knife" returns "knives".
- pluralize of "cat" returns "cats".
- Null or empty input returns an empty string.
- The function is exported as a named export from src/lib/main.js.

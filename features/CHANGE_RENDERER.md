# CHANGE_RENDERER

# Overview
Provide human-readable and machine-readable rendering of change records and classification utilities so consumers can display diffs in CLI, web, or programmatic contexts.

# Behaviour
- Export renderChanges(changes, options) from src/lib/main.js. Options include a format value with allowed values text and json.
- When format is text, the function returns a concise multi-line summary suitable for command-line and website snippets, listing path, change type, and before/after where applicable.
- When format is json, the function returns a JSON serializable structure representing the change objects and any annotations such as classification.
- Export classifyChange(change) which maps a change record to one of: breaking, compatible, informational. At minimum the rule must mark a removed required property as breaking.

# Acceptance Criteria
- renderChanges with format text produces readable multi-line output summarizing changes.
- renderChanges with format json returns a JSON serializable representation of the change objects and annotations.
- classifyChange returns breaking for a removed required property and is covered by unit tests.

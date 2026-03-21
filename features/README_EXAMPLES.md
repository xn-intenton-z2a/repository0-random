# README_EXAMPLES

Summary

Update README.md to document library usage with brief import examples, expected outputs for common inputs, and CLI usage notes so users and maintainers can verify behaviour by reading the docs.

Specification

- Add a Usage section that describes importing named exports from src/lib/main.js and shows example calls and their expected outputs for inputs 15 and 0
- Add a CLI section that documents running node src/lib/main.js with a numeric argument (for example 15) and describes the expected newline-separated output
- Keep examples as short, human-readable lines showing input and expected output; do not include large code blocks

# Acceptance Criteria

- README.md contains a Usage section with examples showing fizzBuzz(15) resulting in an array that ends with FizzBuzz and fizzBuzz(0) showing an empty array
- README.md contains a short CLI usage note describing how to run the CLI and what to expect
- Examples are concise and match the implemented behaviour

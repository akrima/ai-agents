# Java Version Rules

## Principle
The requested Java version is the baseline.

The review must:
- flag code incompatible with the requested version
- avoid suggesting features unavailable in that version
- suggest modernization only if compatible with that version

## Java 11
Prefer:
- modern but broadly compatible style
- var only when readability is preserved
- careful API usage compatible with Java 11

Avoid suggesting:
- records
- sealed classes
- virtual threads
- pattern matching features not available in Java 11

## Java 17
Allow and suggest when useful:
- records
- sealed classes where justified
- modern switch improvements if compatible and useful

Avoid suggesting:
- virtual threads as a standard language/runtime choice
- Java 21-specific preview/final features when not supported

## Java 21
Allow and suggest when justified:
- records
- sealed classes
- pattern matching improvements
- virtual threads for suitable blocking I/O workloads
- structured modernization when it improves readability and maintainability

## Review behavior
Always explain whether a recommendation is:
- compatible with the requested Java target
- optional modernization
- not applicable due to target version
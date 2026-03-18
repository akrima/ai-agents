# Sonar and Snyk Inspired Review Rules

## Sonar-style rules
Look for:
- duplicated code
- unused imports, variables, fields, methods
- overly complex methods
- nested conditionals reducing readability
- null-handling risks
- broad exception handling
- ignored return values
- incorrect equality/hashCode behavior
- mutable shared state
- suspicious stream usage
- weak encapsulation
- code smells from large classes and long methods
- hidden side effects

## Snyk-style rules
Look for:
- hardcoded secrets
- insecure temp file usage
- insecure deserialization
- path traversal risk
- SSRF risk
- weak external input validation
- unsafe reflection
- vulnerable dependency patterns visible from build files
- insecure logging of tokens/secrets/PII
- risky HTTP usage patterns
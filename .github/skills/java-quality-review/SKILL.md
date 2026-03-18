# Skill — Enterprise Java Quality Review

## Goal
Review a Java project in ask-question mode and produce a deep quality report.

This skill must evaluate:
- clean code
- maintainability
- hexagonal architecture
- Java version alignment
- configuration conventions
- logging quality
- testing quality
- exception handling
- resource handling
- memory leak risks
- security issues
- performance bottlenecks
- Sonar-style issues
- Snyk-style vulnerability and dependency risk patterns
- alignment with architecture/business documentation in `./docs`

## Mandatory ask-question flow
Before reviewing, ask:
- target Java version
- main project folder
- project type
- report-only or report + fixes
- strict or non-strict enforcement
- whether `./docs` should be used as business/technical baseline

## Required review dimensions

### A. Architecture
Check:
- hexagonal boundaries
- domain isolation from infrastructure
- application/use-case orchestration quality
- adapters are thin
- controllers/handlers do not contain business logic
- generated models do not leak business decisions
- config/framework dependencies do not pollute domain code

### B. Documentation alignment
When `./docs` contains Markdown documentation, compare the implementation with the documented expectations.

Check:
- technical flows match documented architecture
- handlers/services/adapters match intended responsibilities
- business rules described in documentation are implemented
- validation rules documented in architecture/business docs are respected
- interaction order matches the documentation when relevant
- expected integrations exist and are used correctly
- anti-corruption boundaries or mapping layers are respected if documented
- error-handling behavior matches the documented design
- the code does not contradict documented scope or business intent

If documentation is incomplete or ambiguous:
- state assumptions clearly
- distinguish confirmed mismatches from likely mismatches

### C. Code quality
Check:
- SRP
- cohesion/coupling
- naming
- dead code
- duplication
- very long methods/classes
- magic numbers
- side effects
- poor encapsulation
- weak abstraction boundaries

### D. Configuration
Check:
- prefer `application.yml` over `.properties` when standard requires it
- config is grouped and readable
- no duplicated config values without reason
- no secrets in config
- no config lookup logic scattered in business code

### E. Forbidden patterns
Flag:
- `System.out.println`
- `System.err.println`
- wildcard imports
- JUnit assertions where AssertJ is standard
- repeated tests that should be parameterized
- commented-out code
- empty catch blocks
- TODO/FIXME left in critical production paths

### F. Logging and observability
Check:
- correct logger usage
- no println
- meaningful log messages
- correct log levels
- no secret/PII leakage
- no duplicate exception logs
- no noisy logs in loops/hot paths
- useful correlation/context when needed

### G. Exceptions and reliability
Check:
- swallowed exceptions
- over-generic catch blocks
- lost root cause
- poor retry behavior
- business vs technical exception confusion
- invalid fallback behavior
- exceptions used as control flow
- missing validation before risky operations

### H. Performance
Check:
- expensive work in loops
- repeated allocations
- repeated parsing/serialization
- blocking I/O hotspots
- missing batching/chunking
- large object graphs
- inefficient collections/streams
- poor client reuse
- expensive startup initialization
- N+1 remote calls
- oversized logs/payload handling

### I. Memory and resource handling
Check:
- unclosed streams/files/responses
- client lifecycle issues
- executor shutdown issues
- full-file loading into memory
- unbounded caches/maps
- retained references
- large temporary buffers/strings
- static mutable state
- ThreadLocal leak risk

### J. Security
Check:
- secrets in source or logs
- token/credential leakage
- insecure deserialization
- path traversal risk
- SSRF risk
- weak input validation
- unsafe reflection
- insecure temp file handling
- poor masking of sensitive data
- dependency risk patterns visible from build files
- risky versions or obvious vulnerable patterns if detectable

### K. Sonar-style findings
Look for:
- code smells
- bugs
- maintainability issues
- duplicated logic
- null-safety risks
- incorrect equals/hashCode patterns
- mutable shared state
- cognitive complexity hotspots
- ignored return values
- unused code/imports/variables
- empty blocks
- suspicious conditionals
- overly broad visibility
- improper collection handling
- thread-safety issues

### L. Snyk-style findings
Look for:
- insecure dependency usage patterns
- risky transitive dependency areas if visible
- unsafe crypto usage
- insecure temporary file handling
- hardcoded credentials/secrets
- vulnerable configuration patterns
- insecure HTTP usage
- weak validation around external input
- unsafe deserialization or object mapping risks

### M. Testing
Check:
- AssertJ preferred over JUnit assertions
- repetitive tests -> `@ParameterizedTest`
- negative paths covered
- boundary cases covered
- over-mocking
- weak assertions
- brittle tests tied to implementation
- poor readability
- missing tests for exceptions, retries, timeouts, parsing, config validation, documented business rules

### N. Build/style conventions
Check:
- root `checkstyle.xml`
- root `settings.xml`
- likely style violations
- import discipline
- line length / braces / naming / constants / visibility patterns if detectable

## Output
Generate a Markdown report with:
- context
- assumptions
- standards applied
- documentation baseline used or not used
- top risks
- architecture review
- documentation alignment review
- code quality review
- security review
- performance review
- memory/resource review
- exceptions/reliability review
- testing review
- checkstyle/build review
- quick wins
- remediation plan
- final verdict
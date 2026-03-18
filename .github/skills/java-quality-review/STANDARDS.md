# Enterprise Java Standards

## Java
- Align code with the requested Java target
- Prefer modern Java style compatible with the chosen target
- Prefer immutability where reasonable
- Avoid unnecessary legacy idioms
- Flag usage incompatible with the requested Java target
- Suggest modernization only when compatible with the requested target

## Architecture
- Prefer hexagonal architecture
- Domain must not depend on infrastructure
- Application layer orchestrates use cases
- Adapters stay thin
- Handlers/controllers do not contain business logic
- Config/framework concerns do not leak into domain logic

## Documentation-driven validation
- When `./docs` is present and contains Markdown architecture/business docs, use it as a review baseline
- Compare documented flows with actual implementation
- Compare documented business rules with code behavior
- Call out gaps, contradictions, or undocumented implementation decisions
- Separate confirmed mismatches from assumptions

## Configuration
- Prefer `application.yml` over `.properties` when that is the project convention
- Configuration should be grouped and readable
- No hardcoded secrets
- No duplicated configuration without reason

## Logging
- Never use `System.out.println`
- Never use `System.err.println`
- Use logger framework consistently
- Logs must be useful and safe
- No sensitive data leakage

## Imports
- No wildcard imports
- Prefer explicit imports

## Testing
- Prefer AssertJ over JUnit assertions
- Prefer `@ParameterizedTest` for repeated scenarios
- Prefer readable given/when/then structure
- Avoid over-mocking
- Cover negative and boundary cases
- Cover documented business rules when docs exist

## Reliability
- Preserve root cause on exceptions
- Avoid swallowed exceptions
- Use meaningful exception types
- Validate external input before risky operations

## Performance
- Avoid expensive logic in loops
- Avoid unnecessary object creation
- Avoid full-file memory loads when streaming/chunking is better
- Reuse clients/resources when safe
- Avoid noisy logging in hot paths

## Security
- No secrets in code/logs
- Validate input
- Avoid unsafe deserialization
- Avoid insecure temp file handling
- Avoid risky reflection patterns
- Mask sensitive data

## Build/style
- Respect `checkstyle.xml`
- Be aware of `settings.xml`
- Keep imports, naming and formatting clean
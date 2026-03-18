# Review Checklist

## Initial context
- [ ] Java target version collected
- [ ] Main folder collected
- [ ] Project type collected
- [ ] Output mode collected
- [ ] Strictness collected
- [ ] Documentation baseline preference collected

## Structure
- [ ] `src/main` inspected
- [ ] `src/test` inspected
- [ ] `pom.xml` or `build.gradle` inspected
- [ ] `checkstyle.xml` detected
- [ ] `settings.xml` detected
- [ ] `./docs` inspected if present

## Architecture
- [ ] Hexagonal boundaries reviewed
- [ ] Domain isolation reviewed
- [ ] Adapter thinness reviewed
- [ ] Handler/controller responsibility reviewed
- [ ] Framework leakage reviewed

## Documentation alignment
- [ ] Architecture docs found or absence stated
- [ ] Technical flow compared to code
- [ ] Business rules compared to code
- [ ] Confirmed vs likely mismatches separated

## Clean code
- [ ] Long classes/methods reviewed
- [ ] Naming reviewed
- [ ] Duplication reviewed
- [ ] Hardcoded values reviewed
- [ ] Weak abstractions reviewed

## Configuration
- [ ] YAML vs properties reviewed
- [ ] Secret handling reviewed
- [ ] Config duplication reviewed

## Forbidden patterns
- [ ] No println
- [ ] No wildcard imports
- [ ] AssertJ preference reviewed
- [ ] Parameterized test opportunities reviewed
- [ ] Empty catch reviewed
- [ ] Commented-out code reviewed

## Logging / exceptions
- [ ] Logger usage reviewed
- [ ] Log safety reviewed
- [ ] Swallowed exceptions reviewed
- [ ] Root cause preservation reviewed
- [ ] Business vs technical exception separation reviewed

## Performance / memory / resources
- [ ] Hot paths reviewed
- [ ] Expensive loops reviewed
- [ ] Allocations reviewed
- [ ] Streaming vs full load reviewed
- [ ] Resource closing reviewed
- [ ] Cache growth reviewed
- [ ] Static mutable state reviewed
- [ ] ThreadLocal risks reviewed

## Security
- [ ] Secret leakage reviewed
- [ ] Input validation reviewed
- [ ] Path traversal reviewed
- [ ] SSRF reviewed
- [ ] Unsafe deserialization reviewed
- [ ] Risky dependency patterns reviewed

## Tests
- [ ] AssertJ vs JUnit assertions reviewed
- [ ] Parameterized test candidates reviewed
- [ ] Negative tests reviewed
- [ ] Boundary cases reviewed
- [ ] Business-rule tests reviewed if docs exist

## Output
- [ ] Severity-ranked findings included
- [ ] Quick wins included
- [ ] Final verdict included
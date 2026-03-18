# AWS Java Rules

## Lambda
- avoid fat handlers
- reuse clients when safe
- minimize cold-start overhead
- avoid dangerous static mutable state
- ensure retry semantics are understood
- keep business logic outside handler when possible

## Spring Boot / EKS
- handlers/controllers should stay thin
- business logic belongs in application/domain services
- configuration should not be scattered
- avoid thread explosion
- watch for startup-heavy beans
- avoid blocking misuse on hot paths

## File / queue / event processing
- avoid loading large files fully into memory when not needed
- validate external payloads
- classify exceptions correctly
- define logging carefully to avoid noise and cost
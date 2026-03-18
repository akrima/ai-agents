# Architecture and Business Documentation Rules

## Documentation source
When `./docs` contains Markdown files, use them as a review baseline.

## What to compare
Compare code against:
- documented architecture
- documented business rules
- documented flows and interactions
- documented validation rules
- documented error handling
- documented adapters/integrations
- documented responsibilities by layer

## Validation expectations
Check whether:
- handlers/controllers match documented entry responsibilities
- application services implement documented use cases
- domain logic respects documented business rules
- infrastructure adapters match documented integrations
- validation is implemented where documentation expects it
- error handling matches documented intent
- side effects and sequencing respect documented flows

## Reporting
When docs are used:
- cite the relevant doc file and section if available
- distinguish confirmed mismatch from likely mismatch
- distinguish technical mismatch from business-rule mismatch

## If docs are absent or too weak
- state that documentation-based validation was limited
- continue technical review normally
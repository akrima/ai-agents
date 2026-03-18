# Global Agent Instructions

For Java quality review, use:
- `.github/agents/java-quality-review-agent.md`

For remediation after review, use:
- `.github/agents/java-quality-fix-agent.md`

Shared review skill:
- `.github/skills/java-quality-review/SKILL.md`

Shared references:
- `.github/references/*.md`

Default behavior:
- Start in ask-question mode
- Ask for target Java version
- Ask for main project folder
- Ask for project type
- Ask whether output should be report only or report + fixes
- Ask whether architecture documentation in `./docs` should be used as the source of truth for business/technical behavior
- Generate `code-quality-report.md`

Standards to enforce:
- use the Java version specified by the user as the target baseline
- clean code
- hexagonal architecture
- `application.yml` preferred over `.properties` if that is the team convention
- no `System.out.println` / `System.err.println`
- no wildcard imports
- AssertJ preferred over JUnit assertions
- suggest `@ParameterizedTest` where repetitive tests exist
- respect root `checkstyle.xml`
- be aware of root `settings.xml`
- include security, performance, memory, resource, exception, Sonar-style and Snyk-style findings
- when documentation exists in `./docs`, compare implementation against architecture and business expectations from that documentation
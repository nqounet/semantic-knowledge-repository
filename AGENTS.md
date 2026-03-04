# Project Guidelines for AI Agents

These are the strict rules and guidelines that AI agents must follow when working in this repository.

## Release Process
- **Mandatory Testing**: NEVER perform a release without running tests first.
- **Release Command**: You MUST use the `mise run release` command to execute a release. This command is configured to automatically run tests (`npm test`) before bumping the version and pushing tags.
- If the tests fail, you MUST NOT proceed with the release. You must diagnose and fix the test failures first.

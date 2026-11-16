# Contributing to Portfolio

Check existing issues and pull requests before starting a change.
For substantial work, open an issue that explains the intended outcome.
Keep pull requests focused and preserve the active homepage and reference routes described in [README.md](README.md).

## Set up

Use Node.js 22.13.0 or newer and Bun.
Follow the [README](README.md) for local setup and commands.
Do not add another package-manager lockfile.

## Verify changes

Run the checks used by [CI](.github/workflows/ci.yml):

```sh
bun install --frozen-lockfile
bun run lint
bun run test
bun run blog:validate
bun run assets:check
bun run build
```

For visible changes, inspect affected routes at desktop and mobile widths, including keyboard focus and reduced-motion behavior.
For blog changes, follow [the authoring guide](docs/blog-authoring.md) and validate content before submitting a pull request.

## Submit a pull request

Explain the change, affected routes, and any related issue.
List the commands and manual checks you ran, including their results.
Explain any check you could not run and why.
Add screenshots or recordings for visible changes.
Remove credentials and sensitive information from code, logs, examples, and screenshots.

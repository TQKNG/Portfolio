# Repository Guidelines

## Project overview

This repository is a Vite single-page application built with React, TypeScript, Tailwind CSS, Framer Motion, and selected shadcn/ui primitives.

Use Node.js 22.13.0 or newer and Bun for dependency installation and project scripts.

## Project structure

- `src/pages/` contains route-level pages.
- `src/components/home/` contains the focused sections used by the production homepage.
- `src/components/blog/` contains blog cards, filters, Markdown rendering, and colocated blog tests.
- `src/components/projects/` contains project preview and case study components.
- `src/components/layout/` contains `MainLayout`, `PortfolioShell`, and shared footer components.
- `src/components/navigation/` contains `SiteNav` and the legacy navigation used by secondary pages.
- `src/components/forms/` contains form components such as `ContactForm`.
- `src/components/animations/` contains reusable Framer Motion wrappers.
- `src/components/ui/` contains retained shared UI primitives and their variant definitions.
- `src/data/` contains structured portfolio data.
- `src/content/blog/` contains Markdown blog posts.
- `src/lib/` contains shared utilities and integrations.
- `src/types/` contains shared TypeScript types.
- `public/` contains static assets.
- `scripts/validate-assets.mjs` validates source references to public assets.
- `tailwind-plus/` contains reference components and themes and must not be removed unless explicitly requested.

## Routes

- `/` is the active production homepage.
- `/projects/:slug` renders project case studies.
- `/blog/:slug` renders individual blog posts.
- `/about`, `/contact`, and `/design-system` are secondary pages.
- `/hero` and `/styleguide-hero6` are retained reference routes and are intentionally excluded from production navigation.
- The wildcard route renders `src/pages/NotFound.tsx`.

## Development commands

```sh
bun install
bun run dev
bun run build
bun run build:dev
bun run preview
bun run lint
bun run test
bun run assets:check
```

`bun run test` executes Vitest once.

Use `bun run test -- --watch` for interactive test development.

## Validation expectations

Run `bun run test`, `bun run lint`, `bun run build`, and `bun run assets:check` after implementation changes.

Use the Node.js version declared by `package.json` and `.nvmrc` when running lint or other Node-based tooling.

Manually check affected routes in a browser after user-facing changes.

For navigation changes, verify homepage hash navigation, project detail navigation, blog detail navigation, back navigation, and the not-found link.

For blog changes, verify filter selection, the `View more` state, navigation to a blog detail, and restoration after returning to the homepage.

## Coding conventions

Use functional React components and TypeScript.

Use two spaces for indentation and follow the existing ESLint configuration.

Name components and page files in PascalCase.

Name hooks with the `use` prefix and utilities in camelCase.

Keep homepage sections and reusable behavior in focused components rather than expanding route-level page files.

Keep structured portfolio copy in `src/data/` or `src/content/blog/` rather than duplicating it in page components.

Prefer existing Tailwind utilities, shared UI primitives, and the `cn` utility over new global CSS or duplicate components.

Keep accessibility behavior intact, including semantic landmarks, visible focus states, skip navigation, labels, and reduced-motion handling.

Avoid adding dependencies when an existing utility or browser API is sufficient.

Remove a dependency or component only after confirming that it is not imported by active source, test, or build files.

Do not manually modify generated files or `CHANGELOG.md` files.

## Testing conventions

Use Vitest for tests and React Testing Library for component behavior.

Colocate tests with the feature they cover and use descriptive names such as `BlogFilterBar.test.tsx`.

Test behavior and user-visible state rather than implementation details.

When changing persisted state, include malformed, stale, and round-trip cases.

## Content and asset rules

Do not commit secrets or environment-specific credentials.

Keep `bun.lockb` synchronized with `package.json` and do not add another package-manager lockfile.

Run `bun run assets:check` when adding, removing, or renaming referenced assets.

Preserve `tailwind-plus/` as a reference library unless the user explicitly requests a change to it.

## Commit and pull request guidance

Use concise imperative commit subjects such as `Refactor homepage sections`.

Do not add an agent or Codex as a commit co-author.

Pull requests should describe the user-visible change, identify affected routes or components, list validation commands, and attach screenshots or recordings for visual changes.

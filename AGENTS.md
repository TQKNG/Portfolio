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
- `src/store/` contains the focused Zustand store for shared, session-persisted state.
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

Use the Zustand store only for state shared across routes or intentionally persisted for the session.

Keep transient component state local, including menus, galleries, forms, image fallbacks, and animations.

Keep route parameters, hashes, and navigation state in React Router rather than duplicating them in the store.

Use selectors when reading store state so unrelated components do not rerender.

Preserve the existing `portfolio.blog.view-state` session-storage compatibility when changing blog state persistence.

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

## Shared agent instructions

The following rules are a snapshot of the authoring source at ~/.codex/AGENTS.md.
# Khanh's agent instructions

These are common instructions for Khanh's Codex agents across all scenarios.

## General guidelines

- Never use the em dash character. Use a plain hyphen instead.
- When writing commit messages, never add Codex or an agent name as a co-author.
- Never manually modify `CHANGELOG.md` files or files marked as auto-generated.
- When writing or substantially editing long Markdown files, put each full sentence on its own line.
- Preserve normal Markdown structure, but avoid wrapping multiple sentences onto one physical line.
- When making technical decisions, do not give excessive weight to development cost.
- Prefer quality, simplicity, robustness, scalability, and long-term maintainability.
- When fixing bugs, first reproduce the problem in an end-to-end environment that closely matches the user's real workflow.
- Confirm that the fix addresses the root problem and not only its visible symptom.
- During end-to-end testing, inspect the UI carefully and maintain a high standard for visual detail.
- If something clearly looks wrong, fix it when it is safely within the task's scope, even when it is not the direct focus of the request.
- Apply the same standard to engineering quality, including lint errors, test failures, and flaky tests.
- If you notice an issue that is outside the current scope or unsafe to change, report it clearly instead of ignoring it.
- If any user request is vague or lacks necessary context, ask brief, targeted clarifying questions before providing a full solution.
- If user request is related to herdr-app, you must read ~/.config/herdr-app/AGENTS.md and ~/.agents/skills/herdr/SKILL.md

## Khanh's opinions

When work would benefit from Khanh's viewpoints, read `~/OPINIONS.md` before making relevant decisions.

If that file is unavailable, continue with the available project context and state any material assumptions.

## Voice profile

When writing or posting on behalf of Khanh, read `~/VOICE.md` first to understand how Khanh communicates.

If that file is unavailable, use a professional, direct, concise, and natural voice.

# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite application built with React, TypeScript, shadcn/ui, and Tailwind CSS.

- `src/pages/` contains route-level page components.
- `src/components/` contains reusable UI, layout, navigation, form, project, and animation components.
- `src/data/` stores portfolio content such as projects, testimonials, and designer information.
- `src/hooks/`, `src/lib/`, and `src/types/` contain shared hooks, utilities, and type definitions.
- `src/docs/` contains project documentation and design references.
- `public/` contains static assets served from the site root.
- `tailwind-plus/` contains reference components and themes; do not remove it unless explicitly requested.

## Build, Test, and Development Commands

Install Bun, then install dependencies with `bun install`.
Use these commands:

```sh
bun run dev           # Start the Vite development server with hot reload
bun run build         # Create a production build
bun run build:dev     # Create a development-mode build
bun run preview       # Serve the production build locally
bun run lint          # Run ESLint across the repository
```

There is currently no automated test script in `package.json`.
Validate changes with `bun run lint` and `bun run build`, and manually check affected routes in the development server.

## Coding Style & Naming Conventions

Use TypeScript and functional React components.
Follow the existing ESLint configuration and use two spaces for indentation.
Name components and page files in PascalCase, hooks with the `use` prefix, and utilities in camelCase.
Prefer colocated styles and existing Tailwind utility patterns over introducing new global CSS.
Use the shared `cn` utility for conditional class names and reuse components from `src/components/ui/` where appropriate.

## Testing Guidelines

No test framework or coverage requirement is configured yet.
When adding tests, colocate them with the feature or use a clearly named test directory, and use descriptive names such as `ContactForm.test.tsx`.

## Commit & Pull Request Guidelines

Git history is not available in this workspace, so follow concise imperative commit subjects, for example `Improve project card layout`.
Pull requests should describe the user-visible change, identify affected routes or components, include validation commands, and attach screenshots or recordings for visual changes.

## Configuration & Content

Keep portfolio copy and structured content in `src/data/` rather than embedding it repeatedly in page components.
Do not commit secrets or environment-specific credentials.
Keep `bun.lockb` synchronized with dependency changes and do not add another package-manager lockfile.

# Khanh Nguyen Portfolio

This repository contains Khanh Nguyen's portfolio website.

The application is a Vite single-page application built with React, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui primitives.

## Requirements

- Node.js 22.13.0 or newer.
- Bun for dependency installation and project scripts.

## Getting started

```sh
bun install
bun run dev
```

The development server runs on the Vite default port unless another port is configured by the local environment.

## Commands

```sh
bun run dev           # Start the Vite development server.
bun run build         # Create a production build.
bun run build:dev     # Create a development-mode build.
bun run preview       # Serve the production build locally.
bun run lint          # Run ESLint.
bun run test          # Run the Vitest test suite once.
bun run assets:check  # Validate referenced public assets.
bun run blog:validate # Validate blog metadata and media references.
bun run blog:sync     # Preview changes that would be sent to DEV.
```

Use `bun run test -- --watch` for an interactive Vitest session.

## Application structure

- `src/pages/` contains route-level pages.
- `src/components/home/` contains the homepage sections.
- `src/components/blog/` contains blog cards, filters, Markdown rendering, and blog state utilities.
- `src/components/projects/` contains project previews and case study sections.
- `src/components/layout/` contains shared production shells and footer components.
- `src/components/navigation/` contains the production navigation and the legacy sidebar navigation used by secondary pages.
- `src/components/ui/` contains the small set of retained shadcn/ui primitives.
- `src/store/` contains the small Zustand store for shared, session-persisted application state.
- `src/data/` contains project, blog, and designer data.
- `src/content/blog/` contains Markdown blog content.
- `src/lib/` contains shared utilities such as class composition and toast access.
- `src/types/` contains shared TypeScript types.
- `public/` contains static assets served from the site root.
- `scripts/validate-assets.mjs` validates public asset references used by the source code.

## Routes

- `/` is the production portfolio homepage.
- `/projects/:slug` renders a project case study.
- `/blog/:slug` renders a blog post.
- `/about` renders the legacy detailed about page.
- `/contact` renders the dedicated contact page.
- `/design-system` renders the internal design system reference page.
- `/hero` and `/styleguide-hero6` are retained reference routes and are not part of the production navigation.
- Unknown routes render the minimal not-found page with a link back to `/`.

The homepage stores its blog filter and expanded-list state in `sessionStorage` so that navigating to a blog detail and returning does not lose the user's view.

Shared blog state is managed by Zustand without an application-wide provider.

Transient state such as mobile navigation, project galleries, image fallbacks, form submission, and animation state remains local to its owning component.

React Router remains the source of truth for route parameters, hashes, and navigation state.

## Testing and validation

Tests use Vitest with React Testing Library and are colocated with the blog components.

The test suite covers blog view-state parsing, stale-filter fallback behavior, and blog filter interaction.

Before submitting changes, run `bun run test`, `bun run lint`, `bun run build`, and `bun run assets:check`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution and pull request guidance.

When changing user-facing behavior, manually check the affected route in a browser at desktop and mobile widths.

## Blog publishing

Markdown files in `src/content/blog/` are the source of truth for both the portfolio and DEV.

Images are stored in the public `portfolio-assets` Azure Blob container and referenced by URL from Markdown.

See [docs/blog-authoring.md](docs/blog-authoring.md) for the authoring, image upload, validation, and publishing workflow.

## Package management

Use Bun for dependency installation and project scripts.

Keep `bun.lockb` synchronized with `package.json`.

Do not add a competing package-manager lockfile.

## Reference materials

The `tailwind-plus/` directory contains reference components and themes.

Do not remove or reorganize `tailwind-plus/` unless specifically requested.

## Deployment

The site is deployed to Vercel.

The custom domain is managed through Cloudflare.

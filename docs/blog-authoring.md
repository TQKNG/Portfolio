# Blog authoring and publishing

The portfolio repository is the source of truth for blog content.

Posts marked with `syncToDev: true` are synchronized to DEV by article ID, while their canonical URL points back to the portfolio.

## Create a post

Add a Markdown file to `src/content/blog/` with this frontmatter:

```yaml
---
slug: example-post
title: Example post
excerpt: A concise summary for cards, search results, and DEV.
category: AI Engineering
tags: [ai, agents, softwareengineering]
devToTags: [ai, agents, programming]
publishedAt: 2026-09-20T12:00:00Z
status: draft
syncToDev: false
coverImage: https://cs210032002b3e09a5d.blob.core.windows.net/portfolio-assets/blog/example-post/cover-v1.png
coverImageAlt: Descriptive alternative text for the cover image
---
```

Use no more than four DEV tags.

Keep a new post in draft until its writing, links, diagrams, and images have been reviewed.

Set `status: published` to show it on the portfolio.

Set `syncToDev: true` only when it is ready to publish or update on DEV.

## Create and upload images

Generate or design a 1600 by 680 pixel cover with a simple editorial composition, strong contrast, and enough negative space to remain readable when cropped.

Use descriptive alternative text for every meaningful image.

Preview an upload without changing Azure:

```sh
bun run blog:upload-asset -- --file /path/to/cover.png --slug example-post --name cover --version v1
```

Upload it with Microsoft Entra authentication:

```sh
bun run blog:upload-asset -- --file /path/to/cover.png --slug example-post --name cover --version v1 --write
```

The command does not overwrite an existing version.

Use a new version such as `v2` when replacing an image so the immutable cache policy remains safe.

Reference the returned Blob URL in the post frontmatter or Markdown body.

## Validate locally

Run the complete content and media validation:

```sh
bun run blog:validate -- --check-remote
bun run test
bun run lint
bun run build
bun run assets:check
```

The remote check verifies that every Blob image used by a DEV-enabled post is reachable.

## Preview and publish to DEV

Set `DEVTO_API_KEY` in the local environment for authenticated comparisons and publishing.

Preview changes without writing to DEV:

```sh
bun run blog:sync
```

Publish changes:

```sh
bun run blog:sync -- --write
```

For an imported article, keep its `devToId` in frontmatter so the sync updates the existing post instead of creating a duplicate.

The GitHub Actions workflow uses the `DEVTO_API_KEY` repository secret and the optional `SITE_URL` repository variable.

Pushes to the main branch that change blog content or publishing scripts run validation and synchronize DEV automatically.

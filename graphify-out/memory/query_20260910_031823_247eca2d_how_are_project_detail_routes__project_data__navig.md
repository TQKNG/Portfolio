---
type: "query"
date: "2026-09-10T03:18:23.606759+00:00"
question: "How are project detail routes, project data, navigation, media, and the portfolio design system connected?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["ProjectDetail.tsx", "projects.ts", "ProjectNav.tsx", "SiteNav.tsx", "AssetImage", "FadeIn", "PageTransition"]
---

# Q: How are project detail routes, project data, navigation, media, and the portfolio design system connected?

## Answer

Expanded from graph vocabulary around ProjectDetail, projects, ProjectNav, SiteNav, AssetImage, FadeIn, and PageTransition. The project route resolves a slug through projects.ts, composes shared project components, reuses the brutalist tokens and navigation, and derives previous and next links from the same ordered project collection.

## Outcome

- Signal: useful

## Source Nodes

- ProjectDetail.tsx
- projects.ts
- ProjectNav.tsx
- SiteNav.tsx
- AssetImage
- FadeIn
- PageTransition
import { describe, expect, it } from "vitest";
import { calculateReadingTime, parsePost } from "@/data/blog";

describe("blog content parsing", () => {
  it("parses publishing and DEV metadata", () => {
    const post = parsePost(`---
slug: reliable-agents
title: Reliable Agents
excerpt: A practical guide.
category: AI Engineering
tags: [ai, testing]
devToTags: [ai, testing]
publishedAt: 2026-09-20
status: draft
syncToDev: true
devToId: 123
coverImage: https://example.com/cover.png
coverImageAlt: Abstract agent evaluation pipeline
---

Draft content.`);

    expect(post).toMatchObject({
      slug: "reliable-agents",
      status: "draft",
      syncToDev: true,
      devToId: 123,
      devToTags: ["ai", "testing"],
      coverImageAlt: "Abstract agent evaluation pipeline",
    });
  });

  it("keeps legacy posts published locally but disabled for DEV", () => {
    const post = parsePost(`---
slug: legacy-post
title: Legacy Post
excerpt: Existing content.
category: Process
tags: [process]
publishedAt: 2024-01-01
---

Existing body.`);

    expect(post.status).toBe("published");
    expect(post.syncToDev).toBe(false);
  });

  it("calculates at least one minute and ignores fenced code", () => {
    expect(calculateReadingTime("A short post.")).toBe("1 min read");
    expect(calculateReadingTime(`Words before.\n\n\`\`\`ts\n${"generated ".repeat(500)}\n\`\`\``)).toBe("1 min read");
  });
});

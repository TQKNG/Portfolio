// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarkdownContent } from "@/components/blog/MarkdownContent";

describe("MarkdownContent", () => {
  it("renders GFM tables, links, images, lists, and fenced code", () => {
    const { container } = render(
      <MarkdownContent
        content={`## Guide

- One
- Two

| Tool | Role |
| --- | --- |
| Agent | Execute |

[Documentation](https://example.com)

![Architecture diagram](https://example.com/diagram.png)

\`\`\`bash
echo ready
\`\`\``}
      />,
    );

    expect(screen.getByRole("heading", { name: "Guide" })).toBeTruthy();
    expect(screen.getByRole("table")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Documentation" }).getAttribute("target")).toBe("_blank");
    expect(screen.getByRole("img", { name: "Architecture diagram" })).toBeTruthy();
    expect(container.querySelector("pre")?.textContent).toContain("echo ready");
  });
});

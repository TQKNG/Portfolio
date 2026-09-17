// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BlogFilterBar } from "./BlogFilterBar";

describe("BlogFilterBar", () => {
  it("marks the active filter and reports a new selection", () => {
    const onFilterChange = vi.fn();

    render(
      <BlogFilterBar
        options={[
          { label: "All posts", value: "all" },
          { label: "Engineering", value: "category:engineering" },
        ]}
        activeFilter="all"
        onFilterChange={onFilterChange}
      />,
    );

    expect(screen.getByRole("button", { name: "All posts" }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Engineering" }));
    expect(onFilterChange).toHaveBeenCalledWith("category:engineering");
  });
});

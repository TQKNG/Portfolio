// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_BLOG_VIEW_STATE } from "@/components/blog/blogViewState";
import { usePortfolioStore } from "./portfolioStore";

describe("portfolio store", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    usePortfolioStore.setState({ blog: DEFAULT_BLOG_VIEW_STATE, hasHydrated: true });
  });

  it("preserves expanded state when changing filters", () => {
    usePortfolioStore.getState().toggleBlogExpanded();
    usePortfolioStore.getState().setBlogFilter("category:engineering");
    usePortfolioStore.getState().setBlogFilter("all");

    expect(usePortfolioStore.getState().blog).toEqual({
      activeFilter: "all",
      showAll: true,
    });
  });

  it("persists the current blog slice in session storage", () => {
    usePortfolioStore.getState().setBlogFilter("category:systems");

    const stored = JSON.parse(window.sessionStorage.getItem("portfolio.blog.view-state") ?? "{}");
    expect(stored.state.blog).toEqual({
      activeFilter: "category:systems",
      showAll: false,
    });
    expect(stored.state.hasHydrated).toBeUndefined();
  });

  it("rehydrates the previous raw storage format", async () => {
    window.sessionStorage.setItem(
      "portfolio.blog.view-state",
      JSON.stringify({ activeFilter: "category:legacy", showAll: true }),
    );

    await usePortfolioStore.persist.rehydrate();

    expect(usePortfolioStore.getState().blog).toEqual({
      activeFilter: "category:legacy",
      showAll: true,
    });
  });
});

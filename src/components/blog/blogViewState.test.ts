import { describe, expect, it } from "vitest";
import {
  DEFAULT_BLOG_VIEW_STATE,
  isValidBlogFilter,
} from "./blogViewState";

describe("blog view state", () => {
  it("defines a stable default state", () => {
    expect(DEFAULT_BLOG_VIEW_STATE).toEqual({ activeFilter: "all", showAll: false });
  });

  it("rejects stale filters", () => {
    expect(isValidBlogFilter("category:removed", ["all", "category:systems"])).toBe(false);
  });
});

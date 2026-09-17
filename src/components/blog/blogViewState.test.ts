import { describe, expect, it } from "vitest";
import {
  DEFAULT_BLOG_VIEW_STATE,
  isValidBlogFilter,
  parseBlogViewState,
  serializeBlogViewState,
} from "./blogViewState";

describe("blog view state", () => {
  it("restores a valid filter and expanded state", () => {
    const state = parseBlogViewState(JSON.stringify({ activeFilter: "category:systems", showAll: true }));
    expect(state).toEqual({ activeFilter: "category:systems", showAll: true });
  });

  it("falls back safely for malformed or stale state", () => {
    expect(parseBlogViewState("not-json")).toEqual(DEFAULT_BLOG_VIEW_STATE);
    expect(isValidBlogFilter("category:removed", ["all", "category:systems"])).toBe(false);
  });

  it("round trips state for session storage", () => {
    const state = { activeFilter: "all", showAll: true };
    expect(parseBlogViewState(serializeBlogViewState(state))).toEqual(state);
  });
});

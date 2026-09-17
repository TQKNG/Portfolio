import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import {
  BLOG_VIEW_STATE_KEY,
  DEFAULT_BLOG_VIEW_STATE,
  type BlogViewState,
} from "@/components/blog/blogViewState";

interface PortfolioStore {
  blog: BlogViewState;
  hasHydrated: boolean;
  setBlogFilter: (activeFilter: string) => void;
  toggleBlogExpanded: () => void;
  resetBlogView: () => void;
  markHydrated: () => void;
}

const safeSessionStorage: StateStorage = {
  getItem: (name) => {
    try {
      if (typeof window === "undefined") return null;

      const value = window.sessionStorage.getItem(name);
      if (!value) return null;

      const parsed = JSON.parse(value) as { state?: unknown };
      if (parsed.state === undefined && isBlogViewState(parsed)) {
        return JSON.stringify({ state: parsed, version: 0 });
      }

      return value;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      window.sessionStorage.setItem(name, value);
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }
  },
  removeItem: (name) => {
    try {
      window.sessionStorage.removeItem(name);
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }
  },
};

const isBlogViewState = (value: unknown): value is BlogViewState => {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<BlogViewState>;
  return typeof candidate.activeFilter === "string" && typeof candidate.showAll === "boolean";
};

const mergePersistedState = (
  persistedState: unknown,
  currentState: PortfolioStore,
): PortfolioStore => {
  if (!persistedState || typeof persistedState !== "object") return currentState;

  const persisted = persistedState as {
    state?: { blog?: unknown };
    blog?: unknown;
    activeFilter?: unknown;
    showAll?: unknown;
  };
  const persistedBlog = persisted.state?.blog ?? persisted.blog ?? persisted;

  return {
    ...currentState,
    blog: isBlogViewState(persistedBlog) ? persistedBlog : DEFAULT_BLOG_VIEW_STATE,
  };
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      blog: DEFAULT_BLOG_VIEW_STATE,
      hasHydrated: false,
      setBlogFilter: (activeFilter) =>
        set((state) => ({ blog: { ...state.blog, activeFilter } })),
      toggleBlogExpanded: () =>
        set((state) => ({ blog: { ...state.blog, showAll: !state.blog.showAll } })),
      resetBlogView: () => set({ blog: DEFAULT_BLOG_VIEW_STATE }),
      markHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: BLOG_VIEW_STATE_KEY,
      storage: createJSONStorage(() => safeSessionStorage),
      partialize: (state) => ({ blog: state.blog }),
      merge: mergePersistedState,
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);

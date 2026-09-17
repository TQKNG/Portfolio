export const BLOG_VIEW_STATE_KEY = "portfolio.blog.view-state";

export interface BlogViewState {
  activeFilter: string;
  showAll: boolean;
}

export const DEFAULT_BLOG_VIEW_STATE: BlogViewState = {
  activeFilter: "all",
  showAll: false,
};

export const parseBlogViewState = (value: string | null): BlogViewState => {
  if (!value) return DEFAULT_BLOG_VIEW_STATE;

  try {
    const parsed = JSON.parse(value) as Partial<BlogViewState>;
    return {
      activeFilter: typeof parsed.activeFilter === "string" ? parsed.activeFilter : "all",
      showAll: parsed.showAll === true,
    };
  } catch {
    return DEFAULT_BLOG_VIEW_STATE;
  }
};

export const getInitialBlogViewState = (): BlogViewState => {
  if (typeof window === "undefined") return DEFAULT_BLOG_VIEW_STATE;
  return parseBlogViewState(window.sessionStorage.getItem(BLOG_VIEW_STATE_KEY));
};

export const serializeBlogViewState = (state: BlogViewState) => JSON.stringify(state);

export const isValidBlogFilter = (filter: string, options: string[]) => options.includes(filter);

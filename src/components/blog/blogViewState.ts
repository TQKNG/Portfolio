export const BLOG_VIEW_STATE_KEY = "portfolio.blog.view-state";

export interface BlogViewState {
  activeFilter: string;
  showAll: boolean;
}

export const DEFAULT_BLOG_VIEW_STATE: BlogViewState = {
  activeFilter: "all",
  showAll: false,
};

export const isValidBlogFilter = (filter: string, options: string[]) => options.includes(filter);

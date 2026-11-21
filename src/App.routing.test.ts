import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

interface VercelRewrite {
  source: string;
  destination: string;
}

interface VercelConfig {
  rewrites?: VercelRewrite[];
}

const vercelConfig: VercelConfig = JSON.parse(
  readFileSync(new URL("../vercel.json", import.meta.url), "utf8"),
);

// Vercel serves a matching file or function first, then applies the first matching rewrite.
const resolveRequestPath = (path: string) => {
  const rewrite = vercelConfig.rewrites?.find(({ source }) =>
    new RegExp(`^${source}$`).test(path),
  );

  return rewrite?.destination ?? path;
};

describe("direct loads of app routes", () => {
  it.each(projects.map((project) => `/projects/${project.slug}`))(
    "serves the app shell when %s is opened or refreshed",
    (path) => {
      expect(resolveRequestPath(path)).toBe("/index.html");
    },
  );

  it.each(["/blog/notes-from-a-brutalist-portfolio", "/about", "/contact"])(
    "serves the app shell when %s is opened or refreshed",
    (path) => {
      expect(resolveRequestPath(path)).toBe("/index.html");
    },
  );
});

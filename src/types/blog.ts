export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  devToTags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  status: "draft" | "published";
  syncToDev: boolean;
  devToId?: number;
  coverImage?: string;
  coverImageAlt?: string;
  series?: string;
  content: string;
}

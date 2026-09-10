/**
 * Type definitions for the Creative Portfolio Platform
 * Based on SPECIFICATION.md data models
 */

export interface Designer {
  name: string;
  bio: string;
  email: string;
  photo: string;
  services: string[];
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    email: string;
  };
}

export interface ProjectImage {
  id: string;
  url: string;
  localUrl?: string;
  alt: string;
  width: "full" | "half";
  caption?: string;
}

export type ProjectSectionId =
  | "context"
  | "problem"
  | "approach"
  | "solution"
  | "results"
  | "learnings";

export interface ProjectMetric {
  value: string;
  label: string;
  detail?: string;
}

export interface ProjectDecision {
  observation: string;
  decision: string;
  result: string;
}

export interface ProjectMedia {
  id: string;
  type: "image" | "video";
  src: string;
  localSrc?: string;
  poster?: string;
  alt: string;
  caption: string;
  aspectRatio?: "wide" | "standard" | "portrait";
}

export interface ProjectSection {
  id: ProjectSectionId;
  title: string;
  paragraphs: string[];
  decisions?: ProjectDecision[];
  media?: ProjectMedia[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  year: string;
  description: string;
  role: string;
  responsibilities?: string;
  team?: string;
  timeline?: string;
  users?: string;
  platform?: string;
  status?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  heroImage: string;
  localHeroImage?: string;
  previewVideo?: string;
  localPreviewVideo?: string;
  images: ProjectImage[];
  gridWidth: 3 | 6 | 12;
  featured: boolean;
  metrics?: ProjectMetric[];
  sections?: ProjectSection[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

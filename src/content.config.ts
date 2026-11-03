import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const researchers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/researchers" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    photo: z.string(),
    shortBio: z.string(),
    affiliation: z.string(),
    department: z.string(),
    email: z.string(),
    orcid: z.string(),
    orcidUrl: z.string().optional(),
    googleScholar: z.string(),
    scopus: z.string(),
    researchAreas: z.array(z.string()),
    role: z.string(),
  }),
});

const students = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/students" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    photo: z.string().optional(),
    profile: z.string().optional(),
  }),
});

const academicWorks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/academic-works" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    type: z.enum(['thesis', 'modular-project']),
    level: z.enum(['undergraduate', 'master', 'doctorate']),
    program: z.string(),
    students: z.array(z.string()),
    studentNames: z.array(z.string()).optional(),
    status: z.enum(['active', 'completed']),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    graduationDate: z.string().optional(),
    advisor: z.string(),
    coadvisor: z.string().optional(),
    repository: z.string().optional(),
    project: z.string().optional(),
    relatedSoftware: z.string().optional(),
    relatedPublications: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    shortDescription: z.string(),
    description: z.string(),
    status: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    researchers: z.array(z.string()),
    students: z.array(z.string()),
    academicWorks: z.array(z.string()),
    publications: z.array(z.string()),
    software: z.array(z.string()),
    repositories: z.array(z.string()).optional(),
  }),
});

const software = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/software" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    image: z.string(),
    shortDescription: z.string(),
    description: z.string(),
    status: z.string(),
    technologies: z.array(z.string()),
    website: z.string().optional(),
    repository: z.string().optional(),
    publication: z.string().optional(),
    project: z.string().optional(),
    academicWork: z.string().optional(),
    relatedStudents: z.array(z.string()),
    relatedResearchers: z.array(z.string()),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    authors: z.array(z.string()),
    publicationDate: z.string(),
    year: z.number(),
    venue: z.string(),
    doi: z.string().optional(),
    url: z.string().optional(),
    lasaidResearchers: z.array(z.string()),
    relatedAcademicWorks: z.array(z.string()),
    relatedStudents: z.array(z.string()),
    relatedProjects: z.array(z.string()),
    featured: z.boolean(),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/activities" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    type: z.enum(['event', 'conference', 'academic-participation', 'award', 'presentation', 'outreach', 'training']),
    description: z.string(),
    image: z.string().optional(),
    relatedPeople: z.array(z.string()).optional(),
    url: z.string().optional(),
  }),
});

export const collections = {
  researchers,
  students,
  'academic-works': academicWorks,
  projects,
  software,
  publications,
  activities,
};

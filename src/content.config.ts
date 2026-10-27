import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const researchers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/researchers" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    areas: z.array(z.string()),
    email: z.string().email().optional(),
  }),
});

const students = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/students" }),
  schema: z.object({
    name: z.string(),
    level: z.enum(['Licenciatura', 'Maestría', 'Doctorado']),
    status: z.enum(['Activo', 'Egresado']),
    director: z.string(),
    codirector: z.string().optional(),
  }),
});

const theses = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/theses" }),
  schema: z.object({
    title: z.string(),
    student: z.string(),
    director: z.string(),
    codirector: z.string().optional(),
    year: z.number(),
    status: z.enum(['En proceso', 'Concluida']),
  }),
});

const software = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/software" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    website: z.string().url(),
    repository: z.string().url(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    participants: z.array(z.string()),
    relatedSoftware: z.string().optional(),
  }),
});

export const collections = {
  researchers,
  students,
  theses,
  software,
  projects,
};

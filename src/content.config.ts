import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** A few words saying what it is, shown after the title, e.g. "7-DOF robotic arm". */
      tagline: z.string(),
      /** One or two sentences for the project list. */
      summary: z.string(),
      /** Where and when, e.g. "Terra Labs, spring 2026". */
      context: z.string(),
      /** Lower numbers come first. */
      order: z.number(),
      /** Show in the project list on the home page. */
      featured: z.boolean().default(false),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      /** A video in public/, shown first in the gallery. Paths are relative to public/. */
      video: z.object({ src: z.string(), poster: z.string().optional(), caption: z.string().optional() }).optional(),
      facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
      /** Line drawings (names in src/assets/drawings/) shown faintly behind the project page. */
      sketches: z.array(z.string()).default([]),
    }),
});

export const collections = { projects };

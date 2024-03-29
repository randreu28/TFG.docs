import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const projects = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    pagination: z.number(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  projects: projects,
};

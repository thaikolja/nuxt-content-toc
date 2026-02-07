import { defineContentConfig, defineCollection, z } from '@nuxt/content'

/**
 * Content Collection Configuration
 *
 * @description Defines the content collection for the playground.
 * This configuration is required for @nuxt/content v3.
 */
export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
  },
})

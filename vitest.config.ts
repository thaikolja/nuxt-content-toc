import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    alias: {
      'bun:test': 'vitest',
    },
  },
})

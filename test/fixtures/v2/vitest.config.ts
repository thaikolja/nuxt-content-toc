import { defineVitestConfig } from '@nuxt/test-utils/config'
import { fileURLToPath } from 'node:url'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
  },
  resolve: {
    alias: {
      'bun:test': fileURLToPath(new URL('./mocks/bun-test.ts', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      external: ['bun:test'],
    },
  },
})

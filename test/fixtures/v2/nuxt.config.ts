export default defineNuxtConfig({
  modules: [
    '../../../src/module',
    '@nuxt/content',
  ],
  experimental: {
    appManifest: false,
  },
  contentToc: {
    levels: [2, 3],
    align: 'center',
  },
})

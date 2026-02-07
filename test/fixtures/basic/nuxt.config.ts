export default defineNuxtConfig({
  modules: ['nuxt-content-toc', '@nuxt/content'],
  compatibilityDate: 'latest',
  contentToc: {
    levels: [2, 3],
    activeClass: 'test-active',
    scrollOffset: 100,
  },
})

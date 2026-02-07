export default defineNuxtConfig({

  modules: ['nuxt-content-toc', '@nuxt/content', '@nuxtjs/tailwindcss'],
  ssr: false,
  devtools: { enabled: false },

  css: ['~/assets/global.css'],

  // Content module configuration
  content: {
    // Default content configuration
  },
  compatibilityDate: 'latest',

  // Module configuration
  contentToc: {
    levels: [2, 3, 4],
    activeClass: 'toc-active',
    scrollOffset: 80,

  },
})

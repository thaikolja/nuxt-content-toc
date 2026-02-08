export default defineNuxtConfig({

  modules: ['nuxt-content-toc', '@nuxt/content', '@nuxtjs/tailwindcss'],

  devtools: { enabled: false },
  app: {
    baseURL: '/nuxt-content-toc/',
  },

  css: ['~/assets/global.css'],

  content: {
    // Default content configuration
  },
  compatibilityDate: 'latest',

  nitro: {
    output: {
      publicDir: '../docs',
    },
  },

  // Module configuration
  contentToc: {
    levels: [2, 3, 4],
    activeClass: 'toc-active',
  },
})

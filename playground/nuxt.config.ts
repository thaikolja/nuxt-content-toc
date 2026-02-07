export default defineNuxtConfig({

  modules: ['nuxt-content-toc', '@nuxt/content', '@nuxtjs/tailwindcss'],

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

  nitro: {
    output: {
      publicDir: '../docs',
    },
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/nuxt-content-toc/',
  },
})

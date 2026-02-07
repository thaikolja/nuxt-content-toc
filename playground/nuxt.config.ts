export default defineNuxtConfig({

  modules: ['nuxt-content-toc', '@nuxt/content', '@nuxtjs/tailwindcss'],

  devtools: { enabled: false },

  //  app: {
  //    baseURL: process.env.NUXT_APP_BASE_URL || '/nuxt-content-toc/',
  //  },

  css: ['~/assets/global.css'],

  // Content module configuration
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
    scrollOffset: 80,
  },
})

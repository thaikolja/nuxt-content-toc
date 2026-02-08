export default defineNuxtConfig({

  modules: ['nuxt-content-toc', '@nuxt/content', '@nuxtjs/tailwindcss'],

  devtools: { enabled: false },
  app: {
    baseURL: '/nuxt-content-toc/',
    buildAssetsDir: '/_nuxt/', // Ensure this is explicit
  },
  css: ['~/assets/global.css'],

  content: {
    // Default content configuration
  },
  compatibilityDate: 'latest',
  // ... rest of config
  nitro: {
    output: {
      publicDir: '../docs',
    },
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // Module configuration
  contentToc: {
    levels: [2, 3, 4],
    activeClass: 'toc-active',
  },
})

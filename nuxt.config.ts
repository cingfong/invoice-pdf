// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
      ]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
  ],
  imports: {
    autoImport: false
  },
  vite: {
    resolve: {
      alias: {
        'jspdf': 'jspdf/dist/jspdf.es.js'
      }
    }
  },
  css: ['~/assets/css/main.css']
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  css: ['~/assets/css/main.css']
})
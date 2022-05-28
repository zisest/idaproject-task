import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '@/assets/styles/reset.scss',
    '@/assets/styles/variables.scss',
    '@/assets/styles/globals.scss',
    '@/assets/styles/breakpoints.scss'

  ],
  modules: [
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      'Source+Sans+Pro': [400, 600]
    }
  }
})

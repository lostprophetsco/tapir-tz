// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // TypeScript настройки
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // SSR настройки - только для разработки
  ssr: process.env.NODE_ENV !== 'production',

  // Настройки для Nitro (для GitHub Pages)
  nitro: {
    preset: 'github-pages',
    output: {
      publicDir: '.output/public'
    },
    // Статическая генерация для продакшена
    prerender: {
      routes: [
        '/',
        '/catalog'
      ]
    }
  },

  // Настройки для API
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://test-task-api.tapir.ws',
    },
  },

  // Базовый путь для GitHub Pages
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/tapir-tz/' : '/',
    buildAssetsDir: '/_nuxt/'
  }
})

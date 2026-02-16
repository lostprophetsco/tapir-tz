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

  // SSR настройки
  ssr: true,

  // Настройки для API
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://test-task-api.tapir.ws',
    },
  },
})

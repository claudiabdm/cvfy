import { defineNuxtConfig } from 'nuxt/config'
import en from './lang/en.json'

export default defineNuxtConfig({
  devtools: { enabled: true },

  site: {
    url:
      // eslint-disable-next-line node/prefer-global/process
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:3000'
        : 'https://www.cvfy.xyz',
  },

  imports: {
    autoImport: true,
  },

  app: {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: 'CGbgWpLEg4fyBPWujKEYS3rrwZR4mMU7XfsDEGArchg',
        },
      ],
    },
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/styles.css'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-module-eslint-config',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
  ],

  eslintConfig: {
    setup: false,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  postcss: {
    // Add plugin names as key and arguments as value
    // Install them before as dependencies with npm or yarn
    plugins: {
      'postcss-nested': {},
    },
  },

  i18n: {
    strategy: 'prefix_and_default',
    locales: [
      {
        code: 'en',
        file: 'en.json',
        name: 'English',
      },
      {
        code: 'es',
        file: 'es.json',
        name: 'Español',
      },
      {
        code: 'id',
        file: 'id.json',
        name: 'Indonesian',
      },
      {
        code: 'de',
        file: 'de.json',
        name: 'German',
      },
      {
        code: 'fr',
        file: 'fr.json',
        name: 'Francais',
      },
      {
        code: 'ar',
        file: 'ar.json',
        name: 'Arabic',
      },
      {
        code: 'zh',
        file: 'zh.json',
        name: 'Chinese',
      },
      {
        code: 'pt',
        file: 'pt.json',
        name: 'Portuguese',
      },
    ],
    lazy: false,
    langDir: 'lang/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  router: {
    options: {
      linkActiveClass: 'form__btn--active',
    },
  },

  pwa: {
    devOptions: {
      enabled: true,
    },
    registerType: 'autoUpdate',
    pwaAssets: {
      config: true,
    },
    manifest: {
      name: en['title-tag'],
      short_name: 'CvFy',
      description: en.description,
      theme_color: '#f3f4f6',
    },
  },

  sitemap: {
    autoI18n: true,
  },
})

import { defineNuxtConfig } from 'nuxt/config';
import en from './lang/en.json';

export default defineNuxtConfig({
  devtools: { enabled: true },

  site: {
    url: process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://www.cvfy.xyz',
  },

  imports: {
    autoImport: true,
  },

  app: {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
      title:
        'CvFy - Create, visulize and save your CV as PDF in a few minutes and free!',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'author',
          name: 'author',
          content: 'claudiabdm',
        },
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: 'CGbgWpLEg4fyBPWujKEYS3rrwZR4mMU7XfsDEGArchg',
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: 'https://cvfy.xyz/',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'icon.png',
        },
      ],
      htmlAttrs: {
        lang: 'es',
      },
    },
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/styles.css'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],

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
    ],
    lazy: true,
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
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: en['title-tag'],
      short_name: 'CvFy',
      description: en.description,
      theme_color: '#f3f4f6',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  sitemap: {
    autoI18n: true,
  },
});

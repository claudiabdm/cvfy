export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  server: {
    port: 3000, // default: 3000
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'CvFy - Create, visulize and save your CV as PDF in a few minutes!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'author',
        content: 'claudiabdm',
      },
      {
        name: 'keywords',
        content:
          'cv, curriculum, resume, curriculum vitae, nuxt, vue, tailwindcss',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://cvfy.netlify.app/',
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

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/styles.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'nuxt-i18n',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        'postcss-nested': {},
      },
    },
  },
  tailwindcss: {
    configPath: '~/tailwind.config.js',
  },
  i18n: {
    strategy: 'prefix',
    locales: [
      {
        code: 'en',
        file: 'en.js',
        name: 'English',
      },
      {
        code: 'es',
        file: 'es.js',
        name: 'Español',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,
    },
  },
  router: {
    linkActiveClass: 'form__btn--active',
  },
  pwa: {
    meta: {
      theme_color: '#5B21B6',
    },
  },
}

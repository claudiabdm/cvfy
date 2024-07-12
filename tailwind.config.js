const process = require('node:process')

export default {
  darkMode: 'selector',
  theme: {
    fontFamily: {
      app: ['Helvetica', 'sans-serif'],
      landing: ['Inter', 'sans-serif'],
      logo: ['Roboto Slab', 'serif'],
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-lighter': 'var(--primary-lighter)'
      },
    },
    future: {
      purgeLayersByDefault: true,
    },
    purge: {
      // enable remove unused CSS only in production
      enabled: process.env.NODE_ENV === 'production',
      // any file containing the reference of CSS styles by class name.
      content: [
        'components/**/*.vue',
        'layouts/**/*.vue',
        'pages/**/*.vue',
        'plugins/**/*.js',
        'nuxt.config.js',
      ],
    },
  },
  plugins: [
    require('@domchristie/tailwind-utopia'),
  ],
}

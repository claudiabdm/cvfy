import type { Config } from 'tailwindcss'
import TailwindUtopia from '@domchristie/tailwind-utopia'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        app: ['Helvetica', 'sans-serif'],
        landing: ['Inter', 'sans-serif'],
        logo: ['"Roboto Slab"', 'serif'],
      },
      colors: {
        primary: 'var(--primary)',
      },
    },
  },
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js',
  ],
  plugins: [
    TailwindUtopia,
  ],
}

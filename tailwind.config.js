const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto Slab', 'serif'],
    },
    extend: {
      colors: {
        primary: defaultTheme.colors.purple,
      },
    },
    future: {
      purgeLayersByDefault: true,
    },
    purge: {
      layers: ['utilities'],
    },
  },
}

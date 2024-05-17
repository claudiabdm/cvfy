export default {
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto Slab', 'serif'],
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
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

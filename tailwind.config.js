export default {
  theme: {
    fontFamily: {
      app: ['Helvetica', 'sans-serif'],
      landing: ['Inter', 'sans-serif'],
      logo: ['Roboto Slab', 'serif'],
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
  plugins: [
    require('@domchristie/tailwind-utopia'),
  ],
}

import {
  createAppleSplashScreens,
  defineConfig,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    ...minimal2023Preset,
    maskable: {
      padding: 0,
      sizes: [{ width: 512, height: 512 }],
    },
    apple: {
      padding: 0,
      sizes: [{ width: 512, height: 512 }],
    },
    appleSplashScreens: createAppleSplashScreens({
      padding: 0.3,
      resizeOptions: { fit: 'contain', background: 'white' },
    }, ['iPad Air 9.7"']),
  },
  images: ['public/logo.svg'],
})

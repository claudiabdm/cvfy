import antfu from '@antfu/eslint-config'
import NuxtEslintConfig from './.nuxt/eslint.config.mjs'

export default antfu({
  typescript: true,
  vue: true,
  NuxtEslintConfig,
})

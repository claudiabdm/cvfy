<script setup lang="ts">
import { useCvState } from '~/data/useCvState'

const CVFY_IMAGE = 'https://cvfy.xyz/CvFy-no-border.png'

const { setUpCvSettings } = useCvState()
const route = useRoute()
const { t, locale } = useI18n()

const href = `https://cvfy.xyz${route.path}`

onMounted(() => {
  setUpCvSettings()
})

useHead({
  htmlAttrs: {
    lang: locale,
  },
  title: t('title-tag'),
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: 'https://cdn.ko-fi.com/cdn/kofi5.png?v=3',
    },
    {
      rel: 'canonical',
      href,
    },
  ],
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: t('description'),
    },
    {
      hid: 'author',
      name: 'author',
      content: 'claudiabdm',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: CVFY_IMAGE,
    },
    {
      hid: 'og:author',
      property: 'og:author',
      content: 'Claudia Benito',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: t('title-tag'),
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: t('description'),
    },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: '@claudiabdm',
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: t('title-tag'),
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: href,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: t('description'),
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: CVFY_IMAGE,
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: t('description'),
    },
  ],
})
</script>

<template>
  <main class="font-app main">
    <CvSettings class="basis-1/4 min-w-80" />
    <CvPreview class="basis-3/4" />
  </main>
</template>

<style lang="postcss">
@import '@/assets/styles/form.postcss';
@media screen and (min-width: 1024px) {
  .main {
    @apply flex h-screen overflow-hidden;
  }
}
</style>

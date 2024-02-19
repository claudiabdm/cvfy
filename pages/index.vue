<template>
  <div class="main">
    <cv-settings></cv-settings>
    <cv-preview></cv-preview>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CvSettings from '@/components/CvSettings.vue';
import CvPreview from '@/components/CvPreview.vue';

const CVFY_IMAGE = 'https://cvfy.xyz/CvFy-no-border.png';

export default defineComponent({
  name: 'Index',
  components: { CvSettings, CvPreview },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      title: this.$t('title-tag') as string,
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: 'https://cdn.ko-fi.com/cdn/kofi5.png?v=3',
        },
        {
          rel: 'canonical',
          href: 'https://cvfy.xyz/',
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('description') as string,
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
          content: this.$t('title-tag') as string,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('description') as string,
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@claudiabdm',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.$t('title-tag') as string,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.$t('description') as string,
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
          content: this.$t('description') as string,
        },
      ],
    };
  },
});
</script>
<style lang="postcss" scoped>
@media screen and (min-width: 1024px) {
  .main {
    @apply flex h-full;
  }
}
</style>

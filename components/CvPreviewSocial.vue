<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<Pick<Cv, 'linkedin' | 'displaySocial' | 'twitter' | 'github' | 'website' | 'layout'>>()
</script>

<template>
  <section
    v-if="displaySocial"
    class="cv__section"
  >
    <h4
      class="cv__section-title"
      :class="layout === 'one-column' && 'sr-only'"
    >
      {{ $t("social") }}
    </h4>
    <div
      class="flex"
      :class="layout === 'one-column' ? 'flex-row flex-wrap gap-2' : 'flex-col'"
    >
      <div
        v-if="linkedin"
        class="cv__icon-wrapper"
      >
        <svg class="cv__icon">
          <use href="@/assets/sprite.svg#linkedin-color" />
        </svg>
        <a
          target="_blank"
          rel="noopener"
          :href="`https://linkedin.com/in/${linkedin}`"
        >{{ linkedin }}</a>
      </div>
      <div
        v-if="twitter"
        class="cv__icon-wrapper"
      >
        <svg class="cv__icon">
          <use href="@/assets/sprite.svg#twitter-color" />
        </svg>
        <a
          target="_blank"
          rel="noopener"
          :href="`https://twitter.com/${twitter}`"
        >{{ twitter }}</a>
      </div>
      <div
        v-if="github"
        class="cv__icon-wrapper"
      >
        <svg class="cv__icon">
          <use href="@/assets/sprite.svg#github-color" />
        </svg>
        <a
          target="_blank"
          rel="noopener"
          :href="`https://github.com/${github}`"
        >{{ github }}</a>
      </div>
      <div
        v-if="website"
        class="cv__icon-wrapper"
      >
        <svg class="cv__icon">
          <use href="@/assets/sprite.svg#website" />
        </svg>
        <a
          target="_blank"
          rel="noopener"
          :href="website.includes('https') ? website : `https://${website}`"
        >{{
          website
        }}</a>
      </div>
    </div>
  </section>
</template>

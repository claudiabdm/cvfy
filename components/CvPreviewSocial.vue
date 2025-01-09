<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()
</script>

<template>
  <section
    v-if="formSettings.displaySocial"
    class="cv__section"
  >
    <h4
      class="cv__section-title"
      :class="formSettings.layout === 'one-column' && 'sr-only'"
    >
      {{ $t("social") }}
    </h4>
    <div
      class="flex"
      :class="formSettings.layout === 'one-column' ? 'flex-row flex-wrap gap-2' : 'flex-col'"
    >
      <div
        v-if="formSettings.linkedin"
        class="cv__icon-wrapper"
        itemscope
        itemtype="https://schema.org/Person"
      >
        <meta itemprop="url" :content="`https://linkedin.com/in/${formSettings.linkedin}`">
        <svg class="cv__icon" aria-hidden="true">
          <use href="@/assets/sprite.svg#linkedin-color" />
        </svg>
        <a
          target="_blank"
          rel="noopener"
          :href="`https://linkedin.com/in/${formSettings.linkedin}`"
          itemprop="sameAs"
          class="linkedin-profile"
          aria-label="LinkedIn Profile"
        >
          <span class="sr-only">https://linkedin.com/in/</span>{{ formSettings.linkedin }}
        </a>
      </div>
      <div
        v-if="formSettings.twitter"
        class="cv__icon-wrapper"
      >
        <meta itemprop="url" :content="`https://twitter.com/${formSettings.twitter}`">
        <svg class="cv__icon" aria-hidden="true">
          <use href="@/assets/sprite.svg#twitter-color" />
        </svg>
        <a
          target="_blank"
          rel="noopener"
          :href="`https://twitter.com/${formSettings.twitter}`"
          aria-label="Twitter Profile"
        >
          <span class="sr-only">https://twitter.com/</span>{{ formSettings.twitter }}
        </a>
      </div>
      <div
        v-if="formSettings.github"
        class="cv__icon-wrapper"
      >
        <meta itemprop="url" :content="`https://github.com/${formSettings.github}`">
        <svg class="cv__icon" aria-hidden="true">
          <use href="@/assets/sprite.svg#github-color" />
        </svg>
        <a
          target="_blank"
          rel="noopener"
          :href="`https://github.com/${formSettings.github}`"
          aria-label="GitHub Profile"
        >
          <span class="sr-only">https://github.com/</span>{{ formSettings.github }}
        </a>
      </div>
      <div
        v-if="formSettings.website"
        class="cv__icon-wrapper"
      >
        <meta itemprop="url" :content="formSettings.website.includes('https') ? formSettings.website : `https://${formSettings.website}`">
        <svg class="cv__icon" aria-hidden="true">
          <use href="@/assets/sprite.svg#website" />
        </svg>
        <a
          target="_blank"
          rel="noopener"
          :href="formSettings.website.includes('https') ? formSettings.website : `https://${formSettings.website}`"
          aria-label="Personal Website"
        >{{ formSettings.website }}</a>
      </div>
    </div>
  </section>
</template>

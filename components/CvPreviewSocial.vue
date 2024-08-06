<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'
import LinkedinSvg from '~/assets/icons/PDF/linkedin-color.svg'
import TwitterSvg from '~/assets/icons/PDF/twitter-color.svg'
import GithubSvg from '~/assets/icons/PDF/github-color.svg'
import WebsiteSvg from '~/assets/icons/PDF/website.svg'

const { formSettings } = useCvState()
</script>

<template>
  <section
    v-if="formSettings.displaySocial"
    class="cv__section"
  >
    <h4
      data-cv-elem="social"
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
        data-cv-elem="linkedin"
        class="cv__icon-wrapper"
      >
        <LinkedinSvg class="cv__icon" />
        <a
          target="_blank"
          rel="noopener"
          :href="`https://linkedin.com/in/${formSettings.linkedin}`"
        >{{ formSettings.linkedin }}</a>
      </div>
      <div
        v-if="formSettings.twitter"
        data-cv-elem="twitter"
        class="cv__icon-wrapper"
      >
        <TwitterSvg class="cv__icon" />
        <a
          target="_blank"
          rel="noopener"
          :href="`https://twitter.com/${formSettings.twitter}`"
        >{{ formSettings.twitter }}</a>
      </div>
      <div
        v-if="formSettings.github"
        data-cv-elem="github"
        class="cv__icon-wrapper"
      >
        <GithubSvg class="cv__icon" />
        <a
          target="_blank"
          rel="noopener"
          :href="`https://github.com/${formSettings.github}`"
        >{{ formSettings.github }}</a>
      </div>
      <div
        v-if="formSettings.website"
        data-cv-elem="website"
        class="cv__icon-wrapper"
      >
        <WebsiteSvg class="cv__icon" />
        <a
          target="_blank"
          rel="noopener"
          :href="formSettings.website.includes('https') ? formSettings.website : `https://${formSettings.website}`"
        >{{
          formSettings.website
        }}</a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()
</script>

<template>
  <section class="cv__section">
    <h4
      class="cv__section-title"
      :class="formSettings.layout === 'one-column' ? 'cv__section-title--main' : 'sr-only'"
    >
      <span>
        {{ $t("skills") }}
      </span>
      <span
        v-if="formSettings.displayInterests"
        class="slash"
      >/</span>
      <span v-if="formSettings.displayInterests">
        {{ $t("interests") }}
      </span>
    </h4>
    <CvPreviewSkill
      :skill-name="$t('technical-skills')"
      :display="formSettings.displayJobSkills"
      :skills="formSettings.jobSkills"
      :with-tags="true"
    />
    <CvPreviewSkill
      :skill-name="$t('soft-skills')"
      :display="formSettings.displaySoftSkills"
      :skills="formSettings.softSkills"
    />
    <CvPreviewSkill
      :skill-name="$t('languages')"
      :display="formSettings.displayLanguages"
      :skills="formSettings.languages"
      :is-language="true"
    />
    <CvPreviewSkill
      :skill-name="$t('interests')"
      :display="formSettings.displayInterests"
      :skills="formSettings.interests"
    />
  </section>
</template>

<style class="postcss" scoped>
.slash {
  flex-shrink: 0;
  white-space: preserve;

  &::before {
    content: ' ';
  }

  &::after {
    content: ' ';
  }
}
</style>

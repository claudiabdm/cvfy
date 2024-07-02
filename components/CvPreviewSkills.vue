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
      <div class="flex shrink-0" data-cv-elem="skills">
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
      </div>
    </h4>
    <CvPreviewSkill
      skill-name="jobSkills"
      :skill-title="$t('technical-skills')"
      :display="formSettings.displayJobSkills"
      :skills="formSettings.jobSkills"
      :with-tags="true"
    />
    <CvPreviewSkill
      skill-name="softSkills"
      :skill-title="$t('soft-skills')"
      :display="formSettings.displaySoftSkills"
      :skills="formSettings.softSkills"
    />
    <CvPreviewLanguages />
    <CvPreviewSkill
      skill-name="interests"
      :skill-title="$t('interests')"
      :display="formSettings.displayInterests"
      :skills="formSettings.interests"
    />
  </section>
</template>

<style class="postcss" scoped>
:deep(.comma) {
  white-space: preserve;
}

:deep(ul) :not(li:last-child).comma::after {
  content: ', ';
}

:deep(.two-dots) {

  &::after {
    content: ': ';
  }
}

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

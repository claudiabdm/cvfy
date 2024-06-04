<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<Pick<Cv, 'jobSkills' | 'softSkills' | 'languages' | 'interests' | 'layout' | 'displayJobSkills' | 'displaySoftSkills' | 'displayLanguages' | 'displayInterests'>>()
</script>

<template>
  <section class="cv__section">
    <h4
      class="cv__section-title"
      :class="layout === 'one-column' ? 'cv__section-title--main' : 'sr-only'"
    >
      <span>
        {{ $t("skills") }}
      </span>
      <span
        v-if="displayInterests"
        class="slash"
      >/</span>
      <span v-if="displayInterests">
        {{ $t("interests") }}
      </span>
    </h4>
    <CvPreviewSkill
      :skill-name="$t('technical-skills')"
      :display="displayJobSkills"
      :skills="jobSkills"
      :layout="layout"
    />
    <CvPreviewSkill
      :skill-name="$t('soft-skills')"
      :display="displaySoftSkills"
      :skills="softSkills"
      :layout="layout"
    />
    <section
      v-if="displayLanguages"
      class="cv__section"
      :class="layout === 'one-column' && 'flex gap-1 mb-1'"
    >
      <h3
        class="capitalize"
        :class="layout === 'one-column' ? 'two-dots inline flex-shrink-0' : 'cv__section-title'"
      >
        {{ $t("languages") }}
      </h3>

      <ul :class="layout === 'one-column' && 'flex flex-wrap break-words'">
        <li
          v-for="lang in languages"
          :key="`preview${lang.lang}`"
          :class="layout === 'one-column' ? 'comma' : 'flex justify-between pr-4'"
        >
          <span :class="layout === 'one-column' && 'font-light'">
            {{ lang.lang }}
          </span>
          <span class="font-light">
            <template v-if="layout === 'one-column'"> (</template>{{
              $t(lang.level)
            }}<template v-if="layout === 'one-column'">)</template>
          </span>
        </li>
      </ul>
    </section>
    <CvPreviewSkill
      :skill-name="$t('interests')"
      :display="displayInterests"
      :skills="interests"
      :layout="layout"
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

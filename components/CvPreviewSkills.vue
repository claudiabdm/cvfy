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
    <section
      v-if="formSettings.displayLanguages"
      class="cv__section"
      :class="formSettings.layout === 'one-column' && 'flex gap-1 mb-1'"
    >
      <h3
        class="capitalize"
        :class="formSettings.layout === 'one-column' ? 'two-dots inline flex-shrink-0' : 'cv__section-title'"
      >
        {{ $t("languages") }}
      </h3>

      <ul :class="formSettings.layout === 'one-column' && 'flex flex-wrap break-words'">
        <li
          v-for="lang in formSettings.languages"
          :key="`preview${lang.lang}`"
          :class="formSettings.layout === 'one-column' ? 'comma' : 'flex justify-between pr-4'"
        >
          <span :class="formSettings.layout === 'one-column' && 'font-light'">
            {{ lang.lang }}
          </span>
          <span class="font-light">
            <template v-if="formSettings.layout === 'one-column'"> (</template>{{
              $t(lang.level)
            }}<template v-if="formSettings.layout === 'one-column'">)</template>
          </span>
        </li>
      </ul>
    </section>
    <CvPreviewSkill
      :skill-name="$t('interests')"
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

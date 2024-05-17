<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

const props = defineProps<Pick<Cv, 'jobSkills' | 'softSkills' | 'languages' | 'layout' | 'displayJobSkills' | 'displaySoftSkills' | 'displayLanguages'>>()
</script>

<template>
  <section class="cv__section">
    <h4
      class="cv__section-title"
      :class="layout === 'one-column' ? 'cv__section-title--main' : 'sr-only'"
    >
      {{ $t("skills") }}
    </h4>
    <section
      v-if="displayJobSkills"
      class="cv__section"
      :class="layout === 'one-column' && 'flex gap-1 mb-1'"
    >
      <h3
        class="capitalize"
        :class="layout === 'one-column' ? 'two-dots inline flex-shrink-0' : 'cv__section-title'"
      >
        {{ $t("technical-skills") }}
      </h3>
      <ul :class="layout === 'one-column' ? 'flex flex-wrap' : 'cv__tags'">
        <li
          v-for="skill in props.jobSkills"
          :key="`preview${skill}`"
          :class="layout === 'one-column' ? 'font-light comma' : 'cv__tag'"
        >
          {{ skill }}
        </li>
      </ul>
    </section>
    <section
      v-if="displaySoftSkills"
      class="cv__section"
      :class="layout === 'one-column' && 'flex gap-1 mb-1'"
    >
      <h3
        class="capitalize"
        :class="layout === 'one-column' ? 'two-dots inline flex-shrink-0' : 'cv__section-title'"
      >
        {{ $t("soft-skills") }}
      </h3>
      <ul
        class="font-light"
        :class="layout === 'one-column' ? 'flex flex-wrap' : 'cv__list'"
      >
        <li
          v-for="skill in props.softSkills"
          :key="`preview${skill}`"
          :class="layout === 'one-column' && 'comma'"
        >
          {{ skill }}
        </li>
      </ul>
    </section>
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
  </section>
</template>

<style class="postcss" scoped>
.comma {
  white-space: preserve;
}

ul :not(li:last-child).comma::after {
  content: ', ';
}

.two-dots {

  &::after {
    content: ': ';
  }
}
</style>

<script lang="ts" setup generic="T extends boolean">
import { useCvState } from '~/data/useCvState'
import type { LanguagesSkill } from '~/types/cvfy'

defineProps<{
  display?: boolean
  skills: T extends true ? LanguagesSkill['skill'][] : string[]
  skillName: string
  withTags?: boolean
  isLanguage?: T
}>()

const { formSettings } = useCvState()
</script>

<template>
  <section
    v-if="display"
    class="cv__section preview-skill"
    :class="formSettings.layout === 'one-column' && 'inline-block w-full'"
  >
    <h3
      class="capitalize"
      :class="formSettings.layout === 'one-column' ? 'two-dots inline' : 'cv__section-title'"
    >
      {{ skillName }}
    </h3>
    <ul
      class="font-light"
      :class="[{ inline: formSettings.layout === 'one-column' }, { cv__list: formSettings.layout !== 'one-column' && !withTags && !isLanguage }, { cv__tags: withTags }]"
    >
      <li
        v-for="skill in skills"
        :key="`preview${skill}`"
        :class="[{ 'flex justify-between': isLanguage && formSettings.layout === 'two-column' }, { inline: formSettings.layout === 'one-column' }, { comma: formSettings.layout === 'one-column' }, { cv__tag: withTags }]"
      >
        <template v-if="isLanguage">
          <span
            :class="formSettings.layout === 'one-column' ? 'font-light' : 'font-medium'"
          >
            {{ (skill as LanguagesSkill['skill']).lang }}
          </span>
          <span class="font-light ml-auto">
            <template v-if="formSettings.layout === 'one-column'">
              (</template>{{
              $t((skill as LanguagesSkill['skill']).level)
            }}<template v-if="formSettings.layout === 'one-column'">)</template>
          </span>
        </template>

        <template v-else>
          {{ skill }}
        </template>
      </li>
    </ul>
  </section>
</template>

<style lang="postcss" scoped>
.comma {
  white-space: preserve;
}

ul :not(li:last-child).comma::after {
  content: ', ';
}

ul li:last-child.comma::after {
  content: '.';
}

.two-dots {
  &::after {
    content: ': ';
  }
}

.preview-skill {
  margin-bottom: 0.25rem;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>

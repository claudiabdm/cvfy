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

function formatSkill(skillText: string, index: number, length: number) {
  if (formSettings.value.layout !== 'one-column') {
    return skillText
  }

  return `${skillText}${withPunctuation(index, length)}`
}

function formatLangLevel(langLevel: LanguagesSkill['skill']['lang'], index: number, length: number) {
  if (formSettings.value.layout !== 'one-column') {
    return langLevel
  }

  return ` (${langLevel})${withPunctuation(index, length)}`
}

function withPunctuation(index: number, length: number) {
  return formSettings.value.layout === 'one-column' && index < length - 1 ? ', ' : '.'
}
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
        v-for="(skill, i) in skills"
        :key="`preview${skill}`"
        :class="[{ 'flex justify-between': isLanguage && formSettings.layout === 'two-column' }, { inline: formSettings.layout === 'one-column' }, { cv__tag: withTags }]"
      >
        <template v-if="isLanguage">
          <span
            :class="formSettings.layout === 'one-column' ? 'font-light' : 'font-medium'"
          >
            {{ (skill as LanguagesSkill['skill']).lang }}
          </span>
          <span class="font-light ml-auto whitespace-nowrap">
            {{
              formatLangLevel($t((skill as LanguagesSkill['skill']).level), i, skills.length)
            }}
          </span>
        </template>
        <template v-else>
          {{ formatSkill(skill as string, i, skills.length) }}
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

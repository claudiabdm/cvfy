<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'

defineProps<{
  display?: boolean
  skills: string[]
  skillName: string
  skillTitle: string
  withTags?: boolean
}>()

const { formSettings } = useCvState()
</script>

<template>
  <section
    v-if="display"
    class="cv__section"
    :class="formSettings.layout === 'one-column' && 'flex gap-1 mb-1'"
    :data-cv-elem="`${skillName}Container`"
  >
    <h3
      class="capitalize"
      :class="formSettings.layout === 'one-column' ? 'two-dots inline flex-shrink-0' : 'cv__section-title'"
      :data-cv-elem="`${skillName}Title`"
    >
      {{ skillTitle }}
    </h3>
    <ul
      class="font-light"
      :class="[{ 'flex flex-wrap': formSettings.layout === 'one-column' }, { cv__list: formSettings.layout !== 'one-column' && !withTags }, { cv__tags: withTags }]"
      :data-cv-elem="`${skillName}Ul`"
    >
      <li
        v-for="skill in skills"
        :key="`preview${skill}`"
        :data-cv-elem="`${skill}Li`"
        :class="[{ comma: formSettings.layout === 'one-column' }, { cv__tag: withTags }]"
      >
        <span :data-cv-elem="`${skill}Text`">
          {{ skill }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<{
  display?: boolean
  skills: string[]
  skillName: string
  layout: Cv['layout']
  withTags?: boolean
}>()
</script>

<template>
  <section
    v-if="display"
    class="cv__section"
    :class="layout === 'one-column' && 'flex gap-1 mb-1'"
  >
    <h3
      class="capitalize"
      :class="layout === 'one-column' ? 'two-dots inline flex-shrink-0' : 'cv__section-title'"
    >
      {{ skillName }}
    </h3>
    <ul
      class="font-light"
      :class="[{ 'flex flex-wrap': layout === 'one-column' }, { cv__list: layout !== 'one-column' && !withTags }, { cv__tags: withTags }]"
    >
      <li
        v-for="skill in skills"
        :key="`preview${skill}`"
        :class="[{ comma: layout === 'one-column' }, { cv__tag: withTags }]"
      >
        {{ skill }}
      </li>
    </ul>
  </section>
</template>

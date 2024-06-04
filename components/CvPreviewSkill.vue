<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<{
  display?: boolean
  skills: string[]
  skillName: string
  layout: Cv['layout']
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
      :class="layout === 'one-column' ? 'flex flex-wrap' : 'cv__list'"
    >
      <li
        v-for="skill in skills"
        :key="`preview${skill}`"
        :class="layout === 'one-column' && 'comma'"
      >
        {{ skill }}
      </li>
    </ul>
  </section>
</template>

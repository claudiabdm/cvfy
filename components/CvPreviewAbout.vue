<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<Pick<Cv, 'aboutme' | 'layout'>>()
</script>

<template>
  <section
    class="cv__section cv__section--main"
  >
    <h4
      class="cv__section-title cv__section-title--main"
      :class="layout === 'one-column' && 'sr-only'"
    >
      {{ $t("about-me") }}
    </h4>
    <p class="font-light">
      <!-- Avoids unnecessary spaces at the begging while still allowing break lines -->
      <span class="whitespace-pre-wrap">{{ aboutme }}</span>
    </p>
  </section>
</template>

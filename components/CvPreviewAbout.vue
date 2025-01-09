<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()
</script>

<template>
  <section class="cv__section cv__section--main">
    <!-- :class="formSettings.layout === 'one-column' && 'sr-only'" -->
    <h4
      class="cv__section-title cv__section-title--main"
    >
      Summary
    </h4>
    <p class="font-light">
      <!-- Avoids unnecessary spaces at the begging while still allowing break lines -->
      <span class="whitespace-pre-wrap">{{ formSettings.aboutme }}</span>
    </p>
  </section>
</template>

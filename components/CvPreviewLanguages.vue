<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<Pick<Cv, 'languages'>>()
</script>

<template>
  <section class="cv__section">
    <h4 class="cv__section-title">
      {{ $t("languages") }}
    </h4>
    <ul>
      <li
        v-for="lang in languages"
        :key="`preview${lang.lang}`"
        class="flex justify-between pr-4"
      >
        <span>{{ lang.lang }}</span>
        <span class="font-light">{{ $t(lang.level) }}</span>
      </li>
    </ul>
  </section>
</template>

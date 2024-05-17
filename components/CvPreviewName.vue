<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<Pick<Cv, 'name' | 'lastName'>>()
</script>

<template>
  <h2
    class="text-primary text-xl/normal uppercase font-bold tracking-wide"
  >
    {{ name }} {{ lastName }}
  </h2>
</template>

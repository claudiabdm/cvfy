<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<Pick<Cv, 'jobTitle'>>()
</script>

<template>
  <h3 class="text-base/normal uppercase mb-1 font-bold">
    {{ jobTitle }}
  </h3>
</template>

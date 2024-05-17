<script setup lang="ts">
import type { Cv } from '~/types/cvfy'

defineProps<Pick<Cv, 'profileImageDataUri'>>()
</script>

<template>
  <img
    class="object-cover aspect-square max-w-[212px] max-h-[212px]"
    :src="profileImageDataUri ?? ''"
    alt="Your profile image"
  >
</template>

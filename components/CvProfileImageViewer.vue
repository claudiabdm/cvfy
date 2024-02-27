<script setup lang="ts">
import type { Cv } from '~/types/cvfy'

defineProps<{ profileImageDataUri: Cv['profileImageDataUri'] }>()
</script>

<template>
  <img
    class="mb-4 border-white border-8 object-cover aspect-square"
    :src="profileImageDataUri"
    alt="Your profile image"
  >
</template>

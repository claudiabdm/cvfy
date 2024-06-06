<script lang="ts" setup>
const localePath = useLocalePath()
</script>

<template>
  <h1>
    <NuxtLink
      :to="localePath('/')"
      class="bg-none font-bold text-fl-lg font-logo uppercase tracking-widest"
      active-class="bg-none"
    >
      <span
        class="text-transparent bg-gradient-to-br from-violet-800 to-fuchsia-700 bg-clip-text hover:opacity-80"
      >
        CvFy
      </span>
    </NuxtLink>
  </h1>
</template>

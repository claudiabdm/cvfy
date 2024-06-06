<script lang="ts" setup>
defineProps<{
  to: string
  external?: boolean
  cta?: boolean
  icon?: boolean
}>()
</script>

<template>
  <NuxtLink
    class="inline-flex justify-center items-center gap-x-1 font-light"
    :class="[{
      'bg-gradient-to-br from-violet-800 to-fuchsia-700 bg-clip-text hover:text-transparent': !cta && !icon,
      'hover:opacity-80': icon,
      'bg-primary font-normal text-white px-4 py-2 rounded  bg-gradient-to-br from-violet-800 to-fuchsia-700 hover:opacity-80': cta,
    }]"
    active-class="decoration-violet-800"
    :to="to"
    :external="external"
  >
    <slot />
  </NuxtLink>
</template>

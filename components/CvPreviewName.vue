<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()
</script>

<template>
  <h2 data-cv-elem="name" class="text-primary text-xl/normal uppercase font-bold tracking-wide">
    {{ formSettings.name }} {{ formSettings.lastName }}
  </h2>
</template>

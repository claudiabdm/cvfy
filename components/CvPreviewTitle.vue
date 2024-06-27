<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()
</script>

<template>
  <h3 class="text-base/normal uppercase mb-1 font-bold">
    {{ formSettings.jobTitle }}
  </h3>
</template>

<script lang="ts" setup>
import type { Cv, OptionalSection, SectionName } from '~/types/cvfy'

const props = defineProps<
  {
    formSettings: Cv
    name: SectionName
  }
>()

const displaySection = computed(() => `display${props.name[0].toLocaleUpperCase}${props.name.slice(1)}` as OptionalSection)
</script>

<template>
  <fieldset class="form__section grid gap-3">
    <expansion-panel :panel-name="$t(name)">
      <template #title>
        <legend class="form__legend">
          {{ $t(name) }}
        </legend>
      </template>
      <template #content>
        <div>
          <CvDisplayCheckbox
            v-if="name !== 'work'"
            class="form__display-checkbox"
            :display-section="formSettings[displaySection]"
            :section-name="name"
          />
          <CvDynamicSection
            :section-name="name"
            :entries="formSettings[name]"
          />
        </div>
      </template>
    </expansion-panel>
  </fieldset>
</template>

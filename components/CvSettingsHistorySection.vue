<script lang="ts" setup>
import type { Cv, OptionalSection, SectionName, SectionNameList } from '~/types/cvfy'

const props = defineProps<
  {
    formSettings: Cv
    section: SectionName
    name: typeof SectionNameList[SectionName]
  }
>()

const displaySection = computed(() => `display${props.section[0].toLocaleUpperCase}${props.section.slice(1)}` as OptionalSection)
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
            v-if="section !== 'work'"
            class="mb-10"
            :display-section="formSettings[displaySection]"
            :section-name="name"
          />
          <CvDynamicSection
            :section-name="section"
            :entries="formSettings[section]"
          />
        </div>
      </template>
    </expansion-panel>
  </fieldset>
</template>

<script lang="ts" setup>
import useFormatDate from '~/composables/useFormatDate'
import { orderEvents } from '~/utils/functions'
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()

const formatDate = useFormatDate()

const educationSorted = computed(() => {
  return orderEvents(formSettings.value.education)
})
</script>

<template>
  <section
    v-if="formSettings.displayEducation"
    class="cv__section cv__section--main w-full"
  >
    <h4 class="cv__section-title cv__section-title--main">
      {{ $t("education") }}
    </h4>
    <ul class="cv__event">
      <li
        v-for="edu in educationSorted"
        :key="edu.id"
      >
        <div class="gap-3" :class="[edu.displayDate ? 'grid grid-cols-3' : 'flex justify-between']">
          <h5 class="cv__section-title cv__section-title--sm">
            {{ edu.title }}
          </h5>
          <span class="justify-self-center">{{ edu.location }}</span>
          <span  v-if="edu.displayDate" class="justify-self-end flex-shrink-0">
            {{ formatDate(edu.from) }} – 
            <template v-if="edu.current">{{ $t("current")
            }}</template>
            <template v-else>{{ formatDate(edu.to) }}</template>
          </span>
        </div>
        <CvTextEditor
          v-model="edu.summary"
          :read-only="true"
          class="cv__desc"
        />
      </li>
    </ul>
  </section>
</template>

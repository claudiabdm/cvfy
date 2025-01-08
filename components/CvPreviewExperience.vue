<script lang="ts" setup>
import useFormatDate from '~/composables/useFormatDate'
import { orderEvents } from '~/utils/functions'
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()

const formatDate = useFormatDate()

const workSorted = computed(() => {
  return orderEvents(formSettings.value.work)
})
</script>

<template>
  <section class="cv__section cv__section--main w-full">
    <h4 class="cv__section-title cv__section-title--main">
      {{ $t("experience") }}
    </h4>
    <ul class="cv__event relative">
      <li
        v-for="job in workSorted"
        :key="job.id"
        class="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-gray-400 [&:not(:last-child)]:pb-4 [&:not(:last-child)]:mb-4"
      >
        <div class="grid grid-cols-3 gap-3">
          <h5 class="cv__section-title cv__section-title--sm" :class="[{ 'col-span-2': !job.location }]">
            {{ job.title }}
          </h5>
          <span v-if="job.location" class="justify-self-center">{{ job.location }}</span>
          <span class="justify-self-end">
            {{ formatDate(job.from) }} –
            <template v-if="job.current">
              {{ $t("current") }}
            </template>
            <template v-else>
              {{ formatDate(job.to) }}
            </template>
          </span>
        </div>
        <CvTextEditor
          v-model="job.summary"
          :read-only="true"
          class="cv__desc"
        />
      </li>
    </ul>
  </section>
</template>

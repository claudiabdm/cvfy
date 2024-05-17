<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'
import useFormatDate from '~/composables/useFormatDate'
import { orderEvents } from '~/utils/functions'

const props = defineProps<Pick<Cv, 'work' | 'layout'>>()

const formatDate = useFormatDate()

const workSorted = computed(() => {
  return orderEvents(props.work)
})
</script>

<template>
  <section class="cv__section cv__section--main w-full">
    <h4 class="cv__section-title cv__section-title--main">
      {{ $t("experience") }}
    </h4>
    <ul class="cv__event">
      <li
        v-for="job in workSorted"
        :key="job.id"
      >
        <div class="grid grid-cols-3 gap-3">
          <h5 class="cv__section-title cv__section-title--sm">
            {{ job.title }}
          </h5>
          <span class="justify-self-center">{{ job.location }}</span>
          <span class="justify-self-end">
            {{ formatDate(job.from) }} –
            <template v-if="job.current">{{ $t("current")
            }}</template>
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

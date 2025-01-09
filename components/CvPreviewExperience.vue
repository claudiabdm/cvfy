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
          <div class="col-span-2 flex gap-3">
            <h5 class="cv__section-title cv__section-title--sm">
              {{ job.title }}
            </h5>
            <span class="justify-self-end text-sm text-gray-600">
              {{ formatDate(job.from) }} –
              <template v-if="job.current">
                {{ $t("current") }}
              </template>
              <template v-else>
                {{ formatDate(job.to) }}
              </template>
            </span>
          </div>
          <div class="flex items-center justify-end gap-2 text-sm">
            <a
              v-if="job.companyUrl"
              :href="job.companyUrl.includes('https') ? job.companyUrl : `https://${job.companyUrl}`"
              target="_blank"
              rel="noopener"
              class="w-fit flex items-center font-medium italic text-underline before:bg-slate-700"
            >
              {{ job.company }}
              <svg class="ml-1 size-4">
                <use href="@/assets/sprite.svg#open-in-new-tab" />
              </svg>
            </a>
            <span v-else class="font-medium">{{ job.company }}</span>
            <!-- <span v-if="job.location" class="text-gray-600">· {{ job.location }}</span> -->
          </div>
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

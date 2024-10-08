<script lang="ts" setup>
import useFormatDate from '~/composables/useFormatDate'
import { orderEvents } from '~/utils/functions'
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()

const projectsSorted = computed(() => {
  return orderEvents(formSettings.value.projects)
})

const formatDate = useFormatDate()
</script>

<template>
  <section
    v-if="formSettings.displayProjects"
    class="cv__section cv__section--main w-full"
  >
    <h4 class="cv__section-title cv__section-title--main">
      {{ $t("projects") }}
    </h4>
    <ul class="cv__event">
      <li
        v-for="project in projectsSorted"
        :key="project.id"
      >
        <div class="flex justify-between">
          <h5
            class="cv__section-title cv__section-title--sm flex gap-2"
            :class="[{ 'w-full justify-between gap-0': !project.displayDate }]"
          >
            <span>{{ project.title }}</span>
            <CvPreviewProjectLink
              v-if="formSettings.layout === 'one-column'"
              :title="project.title"
              :href="project.location"
            />
          </h5>
          <span v-if="project.displayDate">
            {{ formatDate(project.from) }} –
            <template v-if="project.current">
              {{ $t("current") }}
            </template>
            <template v-else>{{ formatDate(project.to) }}</template>
          </span>
        </div>
        <CvPreviewProjectLink
          v-if="formSettings.layout === 'two-column'"
          class="mb-1"
          :href="project.location"
        />
        <CvTextEditor
          v-model="project.summary"
          :read-only="true"
          class="cv__desc"
        />
      </li>
    </ul>
  </section>
</template>

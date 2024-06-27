<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()
</script>

<template>
  <div
    class="flex flex-col gap-4 p-6 py-7 col-span-1 bg-slate-50"
    :class="formSettings.profileImageDataUri ? 'py-7' : 'py-8'"
  >
    <CvProfileImageViewer class="border-white border-8" />

    <div>
      <CvPreviewName />
      <CvPreviewTitle />
    </div>

    <CvPreviewContact />

    <CvPreviewSkills class="flex flex-col gap-6" />

    <CvPreviewSocial />
  </div>
  <div class="pr-8 pl-5 py-8 col-span-2">
    <CvPreviewAbout />

    <hr class="cv__bar">

    <CvPreviewExperience />

    <hr
      v-if="formSettings.displayEducation"
      class="cv__bar"
    >

    <CvPreviewEducation />

    <hr
      v-if="formSettings.displayProjects"
      class="cv__bar"
    >

    <CvPreviewProjects />
  </div>
</template>

<style lang="postcss" scoped>
.cv {
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-image: linear-gradient(to right,
      #f8fafc 33%,
      rgba(255, 255, 255, 0) 0%);

  :deep(&__tags) {
    @apply flex flex-wrap gap-2;
  }

  :deep(&__tag) {
    @apply px-2 py-1 rounded text-white text-xs/normal;
    background-color: var(--primary);
  }

  &__bar {
    @apply my-3 border-slate-100 border bg-slate-100;
    list-style: none;
    padding: 0;

    li {
      @apply flex justify-between;
    }

    li+li {
      @apply mt-3;
    }
  }

}
</style>

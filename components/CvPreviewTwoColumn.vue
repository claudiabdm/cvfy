<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<{ formSettings: Cv, isLoading: boolean }>()
</script>

<template>
  <div
    class="flex flex-col gap-4 p-6 py-7 col-span-1 bg-slate-50"
    :class="formSettings.profileImageDataUri ? 'py-7' : 'py-8'"
  >
    <CvProfileImageViewer
      v-if="formSettings.profileImageDataUri"
      class="border-white border-8"
      :profile-image-data-uri="formSettings.profileImageDataUri"
    />

    <div>
      <CvPreviewName
        :name="formSettings.name"
        :last-name="formSettings.lastName"
      />
      <CvPreviewTitle :job-title="formSettings.jobTitle" />
    </div>

    <CvPreviewContact
      :layout="formSettings.layout"
      :email="formSettings.email"
      :phone-number="formSettings.phoneNumber"
      :location="formSettings.location"
    />

    <CvPreviewSkills
      class="flex flex-col gap-6"
      :layout="formSettings.layout"
      :job-skills="formSettings.jobSkills"
      :display-job-skills="formSettings.displayJobSkills"
      :soft-skills="formSettings.softSkills"
      :display-soft-skills="formSettings.displaySoftSkills"
      :languages="formSettings.languages"
      :display-languages="formSettings.displayLanguages"
    />

    <CvPreviewSocial
      :layout="formSettings.layout"
      :linkedin="formSettings.linkedin"
      :twitter="formSettings.twitter"
      :website="formSettings.website"
      :github="formSettings.github"
      :display-social="formSettings.displaySocial"
    />
  </div>
  <div class="pr-8 pl-5 py-8 col-span-2">
    <CvPreviewAbout
      :layout="formSettings.layout"
      :aboutme="formSettings.aboutme"
    />

    <hr class="cv__bar">

    <CvPreviewExperience
      :layout="formSettings.layout"
      :work="formSettings.work"
    />

    <hr
      v-if="formSettings.displayEducation"
      class="cv__bar"
    >

    <CvPreviewEducation
      v-if="formSettings.displayEducation"
      :layout="formSettings.layout"
      :education="formSettings.education"
    />

    <hr
      v-if="formSettings.displayProjects"
      class="cv__bar"
    >

    <CvPreviewProjects
      v-if="formSettings.displayProjects"
      :projects="formSettings.projects"
    />
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

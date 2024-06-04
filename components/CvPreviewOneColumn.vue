<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

defineProps<{ formSettings: Cv, isLoading: boolean }>()
</script>

<template>
  <div class="flex justify-between gap-1">
    <div class="flex flex-col gap-1 justify-between">
      <div class="flex flex-col justify-center">
        <CvPreviewName
          :name="formSettings.name"
          :last-name="formSettings.lastName"
        />
        <CvPreviewTitle :job-title="formSettings.jobTitle" />
        <CvPreviewAbout
          class="mt-0"
          :layout="formSettings.layout"
          :aboutme="formSettings.aboutme"
        />
      </div>
      <div class="flex gap-2">
        <CvPreviewContact
          :layout="formSettings.layout"
          :email="formSettings.email"
          :phone-number="formSettings.phoneNumber"
          :location="formSettings.location"
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
    </div>
    <CvProfileImageViewer
      v-if="formSettings.profileImageDataUri"
      class="rounded ml-2"
      :profile-image-data-uri="formSettings.profileImageDataUri"
    />
  </div>

  <CvPreviewSkills
    :layout="formSettings.layout"
    :job-skills="formSettings.jobSkills"
    :display-job-skills="formSettings.displayJobSkills"
    :soft-skills="formSettings.softSkills"
    :display-soft-skills="formSettings.displaySoftSkills"
    :languages="formSettings.languages"
    :display-languages="formSettings.displayLanguages"
    :interests="formSettings.interests"
    :display-interests="formSettings.displayInterests"
  />

  <CvPreviewExperience
    :layout="formSettings.layout"
    :work="formSettings.work"
  />

  <CvPreviewEducation
    v-if="formSettings.displayEducation"
    :layout="formSettings.layout"
    :education="formSettings.education"
  />

  <CvPreviewProjects
    v-if="formSettings.displayProjects"
    :projects="formSettings.projects"
  />
</template>

<style lang="postcss" scoped>
:deep(h4.cv__section-title) {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  word-break: keep-all;
}

:deep(h4.cv__section-title::after) {
  content: '';
  width: 100%;
  height: 2px;
  margin-left: 10px;
  background-color: var(--primary);
  border-radius: 10px;
}
</style>

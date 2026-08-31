<script lang="ts" setup>
import type { LayoutSectionId } from '~/types/cvfy'
import { useCvState } from '~/data/useCvState'

defineProps<{
  sectionId: LayoutSectionId
}>()

const { formSettings } = useCvState()
</script>

<template>
  <CvPreviewAbout v-if="sectionId === 'about'" />
  <CvPreviewExperience v-else-if="sectionId === 'work'" />
  <CvPreviewEducation v-else-if="sectionId === 'education'" />
  <CvPreviewProjects v-else-if="sectionId === 'projects'" />
  <CvPreviewSkill
    v-else-if="sectionId === 'jobSkills'"
    :skill-name="$t('technical-skills')"
    :display="formSettings.displayJobSkills"
    :skills="formSettings.jobSkills"
    :with-tags="true"
  />
  <CvPreviewSkill
    v-else-if="sectionId === 'softSkills'"
    :skill-name="$t('soft-skills')"
    :display="formSettings.displaySoftSkills"
    :skills="formSettings.softSkills"
  />
  <CvPreviewSkill
    v-else-if="sectionId === 'languages'"
    :skill-name="$t('languages')"
    :display="formSettings.displayLanguages"
    :skills="formSettings.languages"
    :is-language="true"
  />
  <CvPreviewSkill
    v-else-if="sectionId === 'interests'"
    :skill-name="$t('interests')"
    :display="formSettings.displayInterests"
    :skills="formSettings.interests"
  />
  <CvPreviewSocial v-else-if="sectionId === 'social'" />
</template>

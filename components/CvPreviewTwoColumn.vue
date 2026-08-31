<script lang="ts" setup>
import type { LayoutSectionId } from '~/types/cvfy'
import { useCvState } from '~/data/useCvState'

defineProps<{
  sections: LayoutSectionId[]
  sidebarSections: LayoutSectionId[]
  showIdentity: boolean
  showSidebar: boolean
}>()

const { formSettings } = useCvState()
</script>

<template>
  <div
    v-if="showSidebar"
    class="cv__sidebar flex flex-col gap-4 p-6 py-7 bg-slate-50 h-full"
    :class="formSettings.profileImageDataUri && showIdentity ? 'py-7' : 'py-8'"
  >
    <template v-if="showIdentity">
      <CvProfileImageViewer class="border-white border-8" />

      <div>
        <CvPreviewName />
        <CvPreviewTitle />
      </div>

      <CvPreviewContact />
    </template>

    <CvPreviewSection
      v-for="sectionId in sidebarSections"
      :key="sectionId"
      :section-id="sectionId"
    />
  </div>
  <div
    class="cv__main py-8"
    :class="showSidebar ? 'pr-8 pl-5' : 'px-8'"
  >
    <template
      v-for="(sectionId, index) in sections"
      :key="sectionId"
    >
      <hr
        v-if="index > 0"
        class="cv__bar"
      >
      <CvPreviewSection :section-id="sectionId" />
    </template>
  </div>
</template>

<style lang="postcss" scoped>
.cv {
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

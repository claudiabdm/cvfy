<script lang="ts" setup>
import type { LayoutSectionId } from '~/types/cvfy'

defineProps<{
  sections: LayoutSectionId[]
  isFirstPage: boolean
}>()
</script>

<template>
  <div
    v-if="isFirstPage"
    class="flex justify-between gap-1"
  >
    <div class="flex flex-col gap-1 justify-between">
      <div class="flex flex-col justify-center">
        <CvPreviewName />
        <CvPreviewTitle />
      </div>
      <div class="flex gap-2">
        <CvPreviewContact />
      </div>
    </div>
    <CvProfileImageViewer class="rounded ml-2" />
  </div>

  <CvPreviewSection
    v-for="sectionId in sections"
    :key="sectionId"
    :section-id="sectionId"
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

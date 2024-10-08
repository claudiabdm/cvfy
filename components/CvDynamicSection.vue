<script setup lang="ts">
import type { CvEvent, SectionName } from '~/types/cvfy'
import { useCvState } from '~/data/useCvState'

const { sectionName, entries = [] } = defineProps<{
  sectionName: SectionName
  entries: CvEvent[]
}>()
const { addEntry, removeEntry } = useCvState()
function focusEditor(id: string) {
  const editorElem = document.getElementById(`${id}-editor`)
  if (editorElem)
    editorElem.focus()
}
</script>

<template>
  <div
    v-if="sectionName"
    class="dynamic-section"
  >
    <button
      class="form__btn col-span-full"
      type="button"
      @click="addEntry({ sectionName })"
    >
      {{ $t("add") }} {{ $t(sectionName) }}
    </button>
    <ul class="col-span-full">
      <li
        v-for="entry in entries"
        :key="entry.id"
      >
        <expansion-panel
          :panel-name="`${entry.title}`"
          class="mb-3"
        >
          <template #title>
            <h3 class="form__legend form__legend--small dynamic-section__title">
              <span>
                {{ entry.title }}
              </span>
            </h3>
          </template>
          <template #action-button>
            <button
              :aria-label="`Remove ${entry.title} ${$t(sectionName)} from CV`"
              type="button"
              class="form__btn form__btn--delete mr-3"
              @click.stop="removeEntry({ sectionName, entry })"
            >
              <svg class="form__icon">
                <use href="@/assets/sprite.svg#trash" />
              </svg>
            </button>
          </template>
          <template #content>
            <div class="dynamic-section">
              <div class="form__group col-span-full">
                <label
                  class="form__label"
                  :for="`entryTitle--${entry.id}`"
                >
                  <template v-if="sectionName === 'education'">🎓</template>
                  <template v-else-if="sectionName === 'projects'">✨</template>
                  <template v-else>💼</template>
                  {{ $t("title") }}
                </label>
                <input
                  :id="`entryTitle--${entry.id}`"
                  v-model="entry.title"
                  class="form__control"
                  type="text"
                >
              </div>
              <div class="form__group col-span-full">
                <label
                  class="form__label"
                  :for="`entryLocation-${entry.id}`"
                >
                  <template v-if="sectionName === 'projects'">
                    🔗 Link
                  </template>
                  <template v-else>
                    📍 {{ $t("location") }}
                  </template>
                </label>
                <input
                  :id="`entryLocation-${entry.id}`"
                  v-model="entry.location"
                  class="form__control"
                  type="text"
                >
              </div>
              <div class="form__group col-span-full">
                <div class="form__label flex justify-between">
                  <label :for="`entryFrom-${entry.id}`">
                    📆 {{ $t("from") }}
                  </label>
                  <label v-if="sectionName !== 'work'" class="form__label flex items-center">
                    <input
                      v-model="entry.displayDate"
                      class="form__control form__control--checkbox"
                      type="checkbox"
                    >
                    {{ $t("show-date") }}
                  </label>
                </div>
                <input
                  :id="`entryFrom-${entry.id}`"
                  v-model="entry.from"
                  class="form__control"
                  type="date"
                >
              </div>
              <div class="form__group col-span-full">
                <label
                  class="form__label flex justify-between"
                  :for="`entryTo-${entry.id}`"
                >
                  📆 {{ $t("to") }}
                  <label class="form__label flex items-center">
                    <input
                      v-model="entry.current"
                      class="form__control form__control--checkbox"
                      type="checkbox"
                    >
                    {{ $t("current") }}
                  </label>
                </label>
                <input
                  v-if="!entry.current"
                  :id="`entryTo-${entry.id}`"
                  v-model="entry.to"
                  class="form__control"
                  type="date"
                >
              </div>
              <div class="form__group col-span-full">
                <label
                  class="form__label"
                  :for="`entrySummary-${entry.id}`"
                  @click="focusEditor(`entrySummary-${entry.id}`)"
                >📝 {{ $t("summary")
                }}</label>
                <CvTextEditor
                  :id="`entrySummary-${entry.id}`"
                  v-model="entry.summary"
                  class="form__control"
                  :read-only="false"
                />
              </div>
            </div>
          </template>
        </expansion-panel>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.dynamic-section {
  @apply grid grid-cols-2 gap-x-3 gap-y-4;

  &__title {
    @apply flex items-center flex-row-reverse;
  }
}
</style>

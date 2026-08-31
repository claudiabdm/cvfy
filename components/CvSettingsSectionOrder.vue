<script setup lang="ts">
import {
  LAYOUT_SECTION_I18N_KEYS,
  type LayoutSectionId,
} from '~/types/cvfy'
import { useCvState } from '~/data/useCvState'
import {
  canMoveSectionInColumn,
  getHiddenLayoutSections,
  getTwoColumnPageChrome,
  groupSectionsIntoPages,
  moveSectionInColumn,
  normalizeSectionLayout,
} from '~/utils/sectionLayout'

const { formSettings, overflowingPages } = useCvState()

const sectionLayout = computed(() =>
  normalizeSectionLayout(formSettings.value.sectionLayout),
)

const isTwoColumn = computed(() => formSettings.value.layout === 'two-column')

const visiblePages = computed(() =>
  groupSectionsIntoPages(sectionLayout.value, formSettings.value),
)

const hiddenSections = computed(() =>
  getHiddenLayoutSections(sectionLayout.value, formSettings.value),
)

const hasOverflow = computed(() => overflowingPages.value.some(Boolean))

const firstOverflowPage = computed(() =>
  overflowingPages.value.findIndex(Boolean),
)

const mapForcedOpen = computed(() =>
  visiblePages.value.length > 1 || hasOverflow.value,
)

const userOpen = ref(false)

const mapOpen = computed(() => mapForcedOpen.value || userOpen.value)

const settingsPages = computed(() => {
  return visiblePages.value.map((page, pageIndex) => {
    const chrome = isTwoColumn.value
      ? getTwoColumnPageChrome(pageIndex, visiblePages.value)
      : null
    const sidebar = page.filter(id => chrome && chrome.sidebarSections.includes(id))
    const main = chrome
      ? page.filter(id => chrome.sections.includes(id))
      : page
    return {
      pageIndex,
      sidebar,
      main,
      showHeader: pageIndex === 0,
    }
  })
})

function commitMove(id: LayoutSectionId, direction: -1 | 1) {
  formSettings.value.sectionLayout = moveSectionInColumn(
    sectionLayout.value,
    id,
    direction,
    formSettings.value,
    isTwoColumn.value,
  )
}

function canMove(id: LayoutSectionId, direction: -1 | 1) {
  return canMoveSectionInColumn(
    sectionLayout.value,
    id,
    direction,
    formSettings.value,
    isTwoColumn.value,
  )
}

watch(mapForcedOpen, (open) => {
  if (open)
    userOpen.value = false
})
</script>

<template>
  <fieldset class="form__section px-6 py-3">
    <legend class="form__legend">
      {{ $t("pages") }}
    </legend>

    <div class="page-map__status">
      <p class="page-map__count">
        {{ $t("page-count", visiblePages.length) }}
        <span
          v-if="firstOverflowPage >= 0"
          class="page-map__overflow"
        >
          {{ $t("page-doesnt-fit", { n: firstOverflowPage + 1 }) }}
        </span>
      </p>
      <button
        v-if="!mapForcedOpen"
        type="button"
        class="form__btn form__btn--ghost page-map__toggle"
        :aria-expanded="mapOpen"
        @click="userOpen = !userOpen"
      >
        {{ $t("arrange-pages") }}
      </button>
    </div>

    <div
      v-if="mapOpen"
      class="page-map"
    >
      <p
        v-if="isTwoColumn"
        class="page-map__hint"
      >
        {{ $t("pages-two-column-hint") }}
      </p>

      <section
        v-for="page in settingsPages"
        :key="page.pageIndex"
        class="page-map__sheet"
      >
        <h3 class="page-map__heading">
          {{ $t("page-n", { n: page.pageIndex + 1 }) }}
        </h3>

        <div
          class="page-map__body"
          :class="{ 'page-map__body--two': isTwoColumn }"
        >
          <div
            v-if="isTwoColumn"
            class="page-map__column"
          >
            <h4 class="page-map__column-heading">
              {{ $t("sidebar") }}
            </h4>
            <ol class="page-map__list">
              <li
                v-if="page.showHeader"
                class="page-map__item page-map__item--locked"
              >
                <span class="page-map__label capitalize">
                  {{ $t("page-header") }}
                </span>
              </li>
              <li
                v-for="id in page.sidebar"
                :key="id"
                class="page-map__item"
              >
                <div class="page-map__controls">
                  <button
                    type="button"
                    class="form__btn form__btn--ghost page-map__icon-btn"
                    :disabled="!canMove(id, -1)"
                    :aria-label="$t('move-up')"
                    @click="commitMove(id, -1)"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    class="form__btn form__btn--ghost page-map__icon-btn"
                    :disabled="!canMove(id, 1)"
                    :aria-label="$t('move-down')"
                    @click="commitMove(id, 1)"
                  >
                    ↓
                  </button>
                </div>
                <span class="page-map__label capitalize">
                  {{ $t(LAYOUT_SECTION_I18N_KEYS[id]) }}
                </span>
              </li>
            </ol>
          </div>

          <div class="page-map__column">
            <h4
              v-if="isTwoColumn"
              class="page-map__column-heading"
            >
              {{ $t("main") }}
            </h4>
            <ol class="page-map__list">
              <template v-if="!isTwoColumn">
                <li
                  v-if="page.showHeader"
                  class="page-map__item page-map__item--locked"
                >
                  <span class="page-map__label capitalize">
                    {{ $t("page-header") }}
                  </span>
                </li>
              </template>
              <li
                v-for="id in page.main"
                :key="id"
                class="page-map__item"
              >
                <div class="page-map__controls">
                  <button
                    type="button"
                    class="form__btn form__btn--ghost page-map__icon-btn"
                    :disabled="!canMove(id, -1)"
                    :aria-label="$t('move-up')"
                    @click="commitMove(id, -1)"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    class="form__btn form__btn--ghost page-map__icon-btn"
                    :disabled="!canMove(id, 1)"
                    :aria-label="$t('move-down')"
                    @click="commitMove(id, 1)"
                  >
                    ↓
                  </button>
                </div>
                <span class="page-map__label capitalize">
                  {{ $t(LAYOUT_SECTION_I18N_KEYS[id]) }}
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section
        v-if="hiddenSections.length"
        class="page-map__hidden"
      >
        <h3 class="page-map__heading">
          {{ $t("hidden-sections") }}
        </h3>
        <p class="page-map__hint">
          {{ $t("hidden-sections-hint") }}
        </p>
        <ul class="page-map__hidden-list">
          <li
            v-for="id in hiddenSections"
            :key="id"
            class="page-map__hidden-item"
          >
            {{ $t(LAYOUT_SECTION_I18N_KEYS[id]) }}
          </li>
        </ul>
      </section>
    </div>
  </fieldset>
</template>

<style lang="postcss" scoped>
.page-map {
  @apply flex flex-col gap-4 mt-3;
}

.page-map__status {
  @apply flex items-center justify-between gap-2 flex-wrap;
}

.page-map__count {
  @apply font-normal text-slate-600 text-sm/normal m-0;
}

.page-map__overflow {
  @apply text-amber-700;
}

.page-map__toggle {
  @apply py-1 px-2 text-sm/normal m-0;
}

.page-map__hint {
  @apply font-normal text-slate-500 text-sm/normal mb-0;
}

.page-map__sheet {
  @apply bg-slate-100 rounded p-3;
}

.page-map__heading {
  @apply text-sm font-bold tracking-wide uppercase text-slate-600 mb-2;
}

.page-map__body--two {
  @apply grid grid-cols-2 gap-2;
}

.page-map__column-heading {
  @apply text-xs font-bold tracking-wide uppercase text-slate-500 mb-1;
}

.page-map__list {
  @apply flex flex-col gap-2 p-0 m-0;
  list-style: none;
  min-height: 1.75rem;
}

.page-map__item {
  @apply flex items-center gap-1 bg-white rounded shadow px-2 py-1;
}

.page-map__item--locked {
  @apply bg-slate-50 shadow-none text-slate-500;
}

.page-map__controls {
  @apply flex gap-0.5 flex-shrink-0;
}

.page-map__icon-btn {
  @apply min-w-7 w-7 h-7 p-0 m-0 text-sm/normal flex items-center justify-center;
}

.page-map__icon-btn:disabled {
  @apply opacity-40 cursor-not-allowed;
}

.page-map__label {
  @apply font-normal text-slate-700 flex-1 min-w-0 truncate;
}

.page-map__item--locked .page-map__label {
  @apply text-slate-500;
}

.page-map__hidden-list {
  @apply flex flex-col gap-1 p-0 m-0;
  list-style: none;
}

.page-map__hidden-item {
  @apply font-normal text-slate-500 text-sm/normal capitalize;
}
</style>

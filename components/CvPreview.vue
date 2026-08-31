<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'
import {
  canMoveLastSectionToNextPage,
  getTwoColumnPageChrome,
  groupSectionsIntoPages,
  moveLastSectionToNextPage,
  normalizeSectionLayout,
} from '~/utils/sectionLayout'

const { formSettings, isLoading, overflowingPages } = useCvState()

const pages = computed(() => {
  const layout = normalizeSectionLayout(formSettings.value.sectionLayout)
  return groupSectionsIntoPages(layout, formSettings.value)
})

const isTwoColumn = computed(() => formSettings.value.layout === 'two-column')

const pageEls = ref<(HTMLElement | null)[]>([])
const pageHeights = ref<number[]>([])
const viewportWidth = ref(0)
const observers: ResizeObserver[] = []
const stackEl = ref<HTMLElement | null>(null)

function setPageRef(index: number, el: unknown) {
  pageEls.value[index] = el instanceof HTMLElement ? el : null
}

function cssLengthToPx(value: string): number {
  const amount = Number.parseFloat(value)
  if (Number.isNaN(amount))
    return 0
  if (value.endsWith('cm'))
    return amount * (96 / 2.54)
  return amount
}

function currentScale(): number {
  if (!stackEl.value)
    return 0.7
  const raw = getComputedStyle(stackEl.value).getPropertyValue('--cv-scale')
  const value = Number.parseFloat(raw)
  return Number.isNaN(value) ? 0.7 : value
}

function updateOverflow(index: number, el: HTMLElement) {
  const minHeight = cssLengthToPx(getComputedStyle(el).minHeight)
  const overflowing = el.offsetHeight > minHeight + 1
  const height = el.offsetHeight

  if (pageHeights.value[index] !== height) {
    const heights = [...pageHeights.value]
    heights[index] = height
    pageHeights.value = heights
  }

  if (overflowingPages.value[index] === overflowing)
    return
  const next = [...overflowingPages.value]
  next[index] = overflowing
  overflowingPages.value = next
}

function observePages() {
  while (observers.length)
    observers.pop()?.disconnect()

  overflowingPages.value = pages.value.map(() => false)
  pageHeights.value = pages.value.map(() => 0)

  pageEls.value.forEach((el, index) => {
    if (!el)
      return
    updateOverflow(index, el)
    const observer = new ResizeObserver(() => {
      if (el)
        updateOverflow(index, el)
    })
    observer.observe(el)
    observers.push(observer)
  })
}

function frameStyle(index: number) {
  void viewportWidth.value
  const height = pageHeights.value[index]
  if (!height)
    return undefined
  return { height: `${height * currentScale()}px` }
}

function pageChrome(pageIndex: number) {
  return getTwoColumnPageChrome(pageIndex, pages.value)
}

function canMoveOverflow(pageIndex: number) {
  return canMoveLastSectionToNextPage(pages.value, pageIndex, isTwoColumn.value)
}

function moveOverflow(pageIndex: number) {
  formSettings.value.sectionLayout = moveLastSectionToNextPage(
    formSettings.value.sectionLayout,
    pageIndex,
    formSettings.value,
    isTwoColumn.value,
  )
}

function onResize() {
  viewportWidth.value = window.innerWidth
  pageEls.value.forEach((el, index) => {
    if (el)
      updateOverflow(index, el)
  })
}

watch(
  () => pages.value.map(page => page.join(',')).join('|'),
  async () => {
    await nextTick()
    observePages()
  },
)

watch(
  () => formSettings.value.layout,
  async () => {
    await nextTick()
    observePages()
  },
)

onMounted(() => {
  viewportWidth.value = window.innerWidth
  observePages()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  while (observers.length)
    observers.pop()?.disconnect()
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div
    class="
    cvWrapper
    font-normal
    text-slate-800 text-sm/normal
    bg-white
    relative
    w-full
    overflow-y-auto
    overflow-x-hidden
    p-6
    flex
    flex-col
    items-center
    "
  >
    <div
      ref="stackEl"
      class="cvStack"
    >
      <div
        v-for="(pageSections, pageIndex) in pages"
        :key="pageIndex"
        class="cvSheet"
      >
        <div
          class="cvSheet__frame"
          :style="frameStyle(pageIndex)"
        >
          <div
            :ref="(el) => setPageRef(pageIndex, el)"
            tabindex="0"
            :aria-label="$t('page-n-of-m', { n: pageIndex + 1, m: pages.length })"
            class="cv shadow-lg bg-white relative"
            :class="[
              { blur: isLoading },
              { 'cv--page-break': pageIndex < pages.length - 1 },
              formSettings.layout === 'one-column' && 'p-10 flex flex-col gap-3',
              formSettings.layout === 'two-column' && 'cv--two-column',
              formSettings.layout === 'two-column' && !pageChrome(pageIndex).showSidebar && 'cv--two-column--main-only',
            ]"
          >
            <template v-if="formSettings.layout === 'one-column'">
              <CvPreviewOneColumn
                :sections="pageSections"
                :is-first-page="pageIndex === 0"
              />
            </template>

            <template v-if="formSettings.layout === 'two-column'">
              <CvPreviewTwoColumn v-bind="pageChrome(pageIndex)" />
            </template>

            <div
              v-if="overflowingPages[pageIndex]"
              class="cv__pages"
            />
          </div>
        </div>
        <div class="cvSheet__meta">
          <p class="cvSheet__caption">
            {{ $t("page-n-of-m", { n: pageIndex + 1, m: pages.length }) }}
          </p>
          <p
            v-if="overflowingPages[pageIndex]"
            class="cvSheet__hint"
          >
            {{ $t("page-overflow-hint") }}
          </p>
          <button
            v-if="overflowingPages[pageIndex] && canMoveOverflow(pageIndex)"
            type="button"
            class="cvSheet__action"
            @click="moveOverflow(pageIndex)"
          >
            {{ $t("move-to-next-page") }}
          </button>
        </div>
      </div>
    </div>

    <div class="credit">
      Made with ♥️ by
      <a
        class="underline"
        :style="{ color: 'var(--primary)' }"
        href="https://github.com/claudiabdm"
        rel="noopener"
        target="_blank"
      >claudiabdm</a>
      using <b>Nuxt.js</b> + <b>TailwindCSS</b>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
p {
  @apply leading-normal;
}

.credit {
  @apply p-3 text-slate-700 text-center w-full text-xs/normal;
}

.cvWrapper {
  --height: 29.69cm;

  @media print {
    position: unset;
    margin: 0;
    padding: 0;

    & .cvStack {
      --cv-scale: 1;
      gap: 0;
      margin: 0;
    }

    & .cvSheet__frame {
      width: auto;
      height: auto !important;
      overflow: visible;
    }

    & .cvSheet__meta {
      display: none;
    }

    & .cv {
      width: auto;
      height: auto;
      min-width: auto;
      min-height: var(--height);
      margin: 0;
      border: none;
      padding: 0;
      transform: none;
      box-shadow: none;
    }

    & .cv--page-break {
      break-after: page;
      page-break-after: always;
    }

    & .credit {
      display: none;
    }
  }
}

.cvStack {
  --cv-scale: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media screen and (min-width: 425px) {
    --cv-scale: 0.45;
  }

  @media screen and (min-width: 768px) {
    --cv-scale: 0.8;
  }

  @media screen and (min-width: 1024px) {
    --cv-scale: 0.7;
  }
}

.cvSheet {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cvSheet__frame {
  width: calc(21cm * var(--cv-scale));
  min-height: calc(var(--height) * var(--cv-scale));
  overflow: hidden;
}

.cvSheet__meta {
  @apply mt-3 flex flex-col items-center gap-1;
}

.cvSheet__caption {
  @apply font-bold text-slate-600 text-sm tracking-wide uppercase m-0;
}

.cvSheet__hint {
  @apply max-w-[21cm] text-center font-normal text-slate-500 text-sm/normal m-0;
}

.cvSheet__action {
  @apply mt-1 px-3 py-1 rounded border border-slate-300 bg-white text-slate-700 text-sm/normal font-normal cursor-pointer;
}

.cvSheet__action:hover {
  @apply bg-slate-50;
}

.cv--two-column {
  display: grid;
  grid-template-columns: 1fr 2fr;

  :deep(.cv__main) {
    min-width: 0;
  }
}

.cv--two-column--main-only {
  grid-template-columns: minmax(0, 1fr);
}

.cv {
  width: 21cm;
  min-width: 21cm;
  max-width: 21cm;
  min-height: var(--height);
  word-break: break-word;
  transform: scale(var(--cv-scale));
  transform-origin: top left;

  &__pages {
    position: absolute;
    top: var(--height);
    height: 1px;
    right: -5%;
    left: -5%;
    background-image: linear-gradient(to right,
        grey 50%,
        rgba(255, 255, 255, 0) 0%);
    background-size: 20px 1px;
    background-repeat: repeat-x;
    pointer-events: none;

    @media print {
      display: none;
    }
  }

  :deep(&__section-title) {
    @apply text-base uppercase mb-1 font-bold tracking-wide;

    &--sm {
      @apply text-sm/normal mb-0;
      text-transform: none;

    }

    &--main {
      color: var(--primary);
    }
  }

  :deep(&__icon-wrapper) {
    @apply flex font-light gap-1 items-center;

    a,
    span {
      margin-top: 2px;
    }
  }

  :deep(&__icon) {
    @apply fill-current rounded;
    width: 16px;
    height: 16px;
    min-width: 16px;
  }

  :deep(&__list) {
    font-weight: 300;
    list-style: inside;

    ::marker {
      color: var(--primary);
    }
  }

  :deep(&__event) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  :deep(&__event > li) {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

.blur {
  filter: blur(5px);
  min-height: var(--height);
}
</style>

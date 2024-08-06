<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'
import { useDarkMode } from '~/composables/useDarkMode';

const { formSettings, isLoading } = useCvState()
const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <div
    class="
    cvWrapper
    font-normal
    text-slate-800 text-sm/normal
    bg-white dark:bg-slate-900 print:bg-white
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
  <div class="fixed top-0 right-0 mr-8 mt-4">
    <button @click="toggleDarkMode">
      <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"/></svg>
      <svg v-else class="text-slate-50" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15m0 2q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17m-7-4H1v-2h4zm18 0h-4v-2h4zM11 5V1h2v4zm0 18v-4h2v4zM6.4 7.75L3.875 5.325L5.3 3.85l2.4 2.5zm12.3 12.4l-2.425-2.525L17.6 16.25l2.525 2.425zM16.25 6.4l2.425-2.525L20.15 5.3l-2.5 2.4zM3.85 18.7l2.525-2.425L7.75 17.6l-2.425 2.525zM12 12"/></svg>
    </button>
  </div>
    <div style="min-height: var(--height);">
      <div
        tabindex="0"
        aria-label="CV preview"
        class="cv shadow-lg mt-6 bg-white dark:bg-slate-600 print:bg-white dark:text-slate-300 print:text-black relative"
        :class="[
          { blur: isLoading },
          formSettings.layout === 'one-column' && 'p-10 flex flex-col gap-4',
          formSettings.layout === 'two-column' && 'grid grid-cols-3',
        ]"
      >
        <template v-if="formSettings.layout === 'one-column'">
          <CvPreviewOneColumn />
        </template>

        <template v-if="formSettings.layout === 'two-column'">
          <CvPreviewTwoColumn />
        </template>
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
  @apply p-3 text-slate-700 dark:text-slate-400 print:text-slate-700 text-center w-full text-xs/normal;
}

.cvWrapper {
  @media print {
    position: unset;
    margin: 0;
    padding: 0;

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

    & .credit {
      display: none;
    }
  }
}

.cv {
  --height: 29.69cm;
  width: 21cm;
  min-width: 21cm;
  max-width: 21cm;
  min-height: var(--height);
  word-break: break-word;
  transform: scale(0.4);
  transform-origin: center top;

  @media screen and (min-width: 425px) {
    transform: scale(0.45);
  }

  @media screen and (min-width: 768px) {
    transform: scale(0.8);
  }

  @media screen and (min-width: 1024px) {
    transform: scale(0.7);
    transform-origin: top;
  }

  &__pages {
    position: absolute;
    right: -5%;
    left: -5%;
    background-image: linear-gradient(to right,
        grey 50%,
        rgba(255, 255, 255, 0) 0%);
    background-size: 20px 1px;
    background-repeat: repeat-x;

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
      @apply text-[var(--primary)] dark:text-[var(--primary-lighter)] print:text-[var(--primary)];
      
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
      @apply text-[var(--primary)] dark:text-[var(--primary-lighter)] print:text-[var(--primary)]
    }
  }

  :deep(&__event) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.blur {
  filter: blur(5px);
  min-height: var(--height);
}
</style>

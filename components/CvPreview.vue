<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'

const { formSettings, isLoading } = useCvState()
</script>

<template>
  <div class="cvWrapper">
    <div
      tabindex="0"
      aria-label="CV preview"
      class="cv shadow-lg mt-6 bg-white relative"
      :class="[
        { blur: isLoading },
        formSettings.layout === 'one-column' && 'p-10 flex flex-col gap-4',
        formSettings.layout === 'two-column' && 'grid grid-cols-3',
      ]"
    >
      <template v-if="formSettings.layout === 'one-column'">
        <CvPreviewOneColumn
          :form-settings="formSettings"
          :is-loading="isLoading"
        />
      </template>

      <template v-if="formSettings.layout === 'two-column'">
        <CvPreviewTwoColumn
          :form-settings="formSettings"
          :is-loading="isLoading"
        />
      </template>
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

<style lang="postcss">
p {
  @apply leading-normal;
}

.credit {
  @apply p-3 text-slate-700 text-center w-full text-xs/normal;
}

.cvWrapper {
  @apply font-normal text-slate-800 text-sm/normal relative w-full bg-white overflow-y-auto overflow-x-hidden p-6;

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
  margin: auto;
  word-break: break-word;
  transform: scale(0.4);
  transform-origin: top;

  @media screen and (min-width: 425px) {
    transform: scale(0.65);
  }

  @media screen and (min-width: 768px) {
    transform: scale(0.9);
  }

  @media screen and (min-width: 1024px) {
    transform: scale(0.7);
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

  &__section-title {
    @apply text-base uppercase mb-1 font-bold tracking-wide;

    &--sm {
      @apply text-sm/normal mb-0;
      text-transform: none;

    }

    &--main {
      color: var(--primary);
    }
  }

  &__icon-wrapper {
    @apply flex font-light gap-1 items-center;

    a,
    span {
      margin-top: 2px;
    }
  }

  &__icon {
    @apply fill-current rounded;
    width: 16px;
    height: 16px;
    min-width: 16px;
  }

  &__list {
    font-weight: 300;
    list-style: inside;

    ::marker {
      color: var(--primary);
    }
  }

  &__event {
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

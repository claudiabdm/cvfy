<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'

const { formSettings } = useCvState()
</script>

<template>
  <section
    v-if="formSettings.displayLanguages"
    data-cv-elem="languagesContainer"
    class="cv__section"
    :class="formSettings.layout === 'one-column' && 'flex gap-1 mb-1'"
  >
    <h3
      data-cv-elem="languagesTitle"
      class="capitalize"
      :class="formSettings.layout === 'one-column' ? 'two-dots inline flex-shrink-0' : 'cv__section-title'"
    >
      {{ $t("languages") }}
    </h3>

    <ul
      :class="formSettings.layout === 'one-column' && 'flex flex-wrap break-words'"
    >
      <li
        v-for="lang in formSettings.languages"
        :key="`preview${lang.lang}`"
        :class="formSettings.layout === 'one-column' ? 'comma' : 'flex justify-between'"
      >
        <span
          :data-cv-elem="`${lang.lang}Lang`"
          :class="formSettings.layout === 'one-column' && 'font-light'"
        >
          {{ lang.lang }}
        </span>
        <span
          class="font-light"
          :data-cv-elem="`${lang.lang}Level`"
        >
          <template v-if="formSettings.layout === 'one-column'">
            (</template>{{
            $t(lang.level)
          }}<template v-if="formSettings.layout === 'one-column'">)</template>
        </span>
      </li>
    </ul>
  </section>
</template>

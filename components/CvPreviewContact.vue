<script lang="ts" setup>
import type { Cv } from '~/types/cvfy'

const props = defineProps<Pick<Cv, 'email' | 'phoneNumber' | 'location' | 'layout'>>()

const emailHref = computed(() => {
  return `mailto:${props.email}`
})
const phoneNumberHref = computed(() => {
  return `tel:${props.phoneNumber}`
})
</script>

<template>
  <section
    class="cv__section"
    :class="layout === 'one-column' && 'mt-0'"
  >
    <h4
      class="cv__section-title"
      :class="[{ 'sr-only': layout === 'one-column' }]"
    >
      {{ $t("contact") }}
    </h4>
    <div
      class="flex"
      :class="layout === 'one-column' ? 'flex-wrap gap-2' : 'flex-col'"
    >
      <div
        v-if="email"
        class="cv__icon-wrapper"
      >
        <svg class="cv__icon">
          <use href="@/assets/sprite.svg#email" />
        </svg>
        <a
          :href="emailHref"
          rel="noopener"
        >{{ email }}</a>
      </div>
      <div
        v-if="phoneNumber"
        class="cv__icon-wrapper"
      >
        <svg class="cv__icon">
          <use href="@/assets/sprite.svg#phone" />
        </svg>
        <a
          :href="phoneNumberHref"
          rel="noopener"
        >{{
          phoneNumber
        }}</a>
      </div>
      <div
        v-if="location"
        class="cv__icon-wrapper"
      >
        <svg class="cv__icon">
          <use href="@/assets/sprite.svg#location" />
        </svg>
        <span tabindex="0">{{ location }}</span>
      </div>
    </div>
  </section>
</template>

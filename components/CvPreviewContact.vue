<script lang="ts" setup>
import { useCvState } from '~/data/useCvState'
import EmailSvg from '~/assets/icons/PDF/email.svg'
import PhoneSvg from '~/assets/icons/PDF/phone.svg'
import LocationSvg from '~/assets/icons/PDF/location.svg'

const { formSettings } = useCvState()

const emailHref = computed(() => {
  return `mailto:${formSettings.value.email}`
})
const phoneNumberHref = computed(() => {
  return `tel:${formSettings.value.phoneNumber}`
})
</script>

<template>
  <section
    class="cv__section"
    :class="formSettings.layout === 'one-column' && 'mt-0'"
  >
    <h4
      data-cv-elem="contact"
      class="cv__section-title"
      :class="[{ 'sr-only': formSettings.layout === 'one-column' }]"
    >
      {{ $t("contact") }}
    </h4>
    <div
      class="flex"
      :class="formSettings.layout === 'one-column' ? 'flex-wrap gap-2' : 'flex-col'"
    >
      <div
        v-if="formSettings.email"
        data-cv-elem="email"
        class="cv__icon-wrapper"
      >
        <EmailSvg class="cv__icon" />
        <a
          :href="emailHref"
          rel="noopener"
        >{{ formSettings.email }}</a>
      </div>
      <div
        v-if="formSettings.phoneNumber"
        data-cv-elem="phoneNumber"
        class="cv__icon-wrapper"
      >
        <PhoneSvg class="cv__icon" />
        <a
          :href="phoneNumberHref"
          rel="noopener"
        >{{
          formSettings.phoneNumber
        }}</a>
      </div>
      <div
        v-if="formSettings.location"
        data-cv-elem="location"
        class="cv__icon-wrapper"
      >
        <LocationSvg class="cv__icon" />
        <span tabindex="0">{{ formSettings.location }}</span>
      </div>
    </div>
  </section>
</template>

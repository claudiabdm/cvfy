<template>
  <div class="py-4 px-6 font-normal">
    <div class="portfolio">
      <div class="portfolio__side">
        <h2>{{ formSettings.name }}{{ formSettings.lastName }}</h2>
        <h3>{{ formSettings.jobTitle }}</h3>
        <section class="porfolio__contact">
          <h4>Contact</h4>
          <div class="flex flex-col">
            <div class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#phone"></use>
              </svg>
              <span>{{ formSettings.phoneNumber }}</span>
            </div>
            <div class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#email"></use>
              </svg>
              <span>{{ formSettings.email }}</span>
            </div>
            <div class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#location"></use>
              </svg>
              <span>{{ formSettings.location }}</span>
            </div>
          </div>
        </section>
        <section class="porfolio__contact">
          <h4>Professional Skills</h4>
          <div class="flex flex-col">
            <ul></ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PortfolioPreview',
  props: {
    formSettings: {
      type: Object as () => {
        jobTtitle: string
        name: string
        lastName: string
        email: string
        location: string
        phoneNumber: string
        aboutme: string
      },
      default: {
        jobTtitle: '',
        name: '',
        lastName: '',
        email: '',
        location: '',
        phoneNumber: '',
        aboutme: '',
      },
    },
  },
})
</script>
<style lang="postcss" scoped>
.portfolio {
  @apply grid grid-cols-3;
  height: 100%;
  &__side {
    @apply col-span-1;
    background-color: #666;
  }
  &__icon-wrapper {
    @apply flex flex-row;
    align-items: center;
  }
  &__icon {
    @apply flex;
    width: 1.25rem;
    height: 1.25rem;
    align-items: center;
  }
}
</style>

<template>
  <div class="p-10 font-normal w-full overflow-auto">
    <div class="portfolio bg-white">
      <div class="portfolio__side">
        <h2 class="portfolio__name">
          {{ formSettings.name }} {{ formSettings.lastName }}
        </h2>
        <h3 class="portfolio__job-title">{{ formSettings.jobTitle }}</h3>
        <!-- CONTACT -->
        <section class="portfolio__section">
          <h4 class="portfolio__section-title">Contact</h4>
          <div class="flex flex-col">
            <div class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#phone"></use>
              </svg>
              <a :href="phoneNumberHref">{{ formSettings.phoneNumber }}</a>
            </div>
            <div class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#email"></use>
              </svg>
              <a :href="emailHref">{{ formSettings.email }}</a>
            </div>
            <div class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#location"></use>
              </svg>
              <span>{{ formSettings.location }}</span>
            </div>
          </div>
        </section>
        <!-- //CONTACT -->
        <!-- PROFESIONAL SKILLS -->
        <section class="portfolio__section">
          <h4 class="portfolio__section-title">Professional Skills</h4>
          <ul class="portfolio__tags">
            <li
              v-for="skill in formSettings.jobSkills"
              :key="`preview${skill}`"
              class="portfolio__tag"
            >
              {{ skill }}
            </li>
          </ul>
        </section>
        <!-- //PROFESIONAL SKILLS -->
        <!-- SOFT SKILLS -->
        <section class="portfolio__section">
          <h4 class="portfolio__section-title">Soft Skills</h4>
          <ul class="portfolio__list">
            <li
              v-for="skill in formSettings.softSkills"
              :key="`preview${skill}`"
            >
              {{ skill }}
            </li>
          </ul>
        </section>
        <!-- // SOFT SKILLS -->
        <!-- LANGUAGES -->
        <section class="portfolio__section">
          <h4 class="portfolio__section-title">Languages</h4>
          <ul class="portfolio__bar">
            <li
              v-for="lang in formSettings.languages"
              :key="`preview${lang.lang}`"
            >
              {{ lang.lang }}
              <div
                class="portfolio__bar-level"
                :style="{ width: lang.level }"
              ></div>
            </li>
          </ul>
        </section>
        <!-- // LANGUAGES -->
      </div>
      <div class="portfolio__main"></div>
    </div>
    <button @click="changeColor">Change color</button>
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
        jobSkills: string[]
        softSkills: string[]
        languages: { lang: string; level: string }[]
      },
      default: {
        jobTtitle: '',
        name: '',
        lastName: '',
        email: '',
        location: '',
        phoneNumber: '',
        aboutme: '',
        jobSkills: [''],
        softSkills: [''],
        languages: [{ lang: '', level: '' }],
      },
    },
  },
  computed: {
    phoneNumberHref(): string {
      return `tel:${this.formSettings.phoneNumber}`
    },
    emailHref(): string {
      return `mailto:${this.formSettings.email}`
    },
  },
  methods: {
    changeColor() {
      if (
        document.documentElement.style.getPropertyValue('--bg-color') === '#fff'
      ) {
        document.documentElement.style.setProperty('--bg-color', '#f3f4f6')
      } else {
        document.documentElement.style.setProperty('--bg-color', '#fff')
      }
    },
  },
})
</script>
<style lang="postcss" scoped>
:root {
  --bg-color: #f3f4f6;
}
.portfolio {
  @apply grid grid-cols-3 text-gray-700 shadow;
  width: 21cm;
  height: 29.7cm;
  overflow-y: auto;

  &__side {
    @apply col-span-1 p-6 bg-gray-100 bg-opacity-100;
  }

  &__name {
    @apply text-3xl uppercase font-bold leading-8 mb-3 tracking-wide;
    color: #4c1d95;
  }

  &__job-title {
    @apply text-xl uppercase;
  }

  &__section {
    @apply mt-10;
  }

  &__section-title {
    @apply text-lg uppercase mb-2 font-bold tracking-wide;
  }

  &__icon-wrapper {
    @apply flex flex-row font-light;
    align-items: center;
  }
  &__icon {
    @apply flex mr-1 fill-current;
    width: 1.25rem;
    height: 1.25rem;
    align-items: center;
  }

  &__tags {
    @apply flex flex-wrap gap-3 mt-3;
  }

  &__tag {
    @apply px-2 py-1 rounded text-sm text-white;
    background-color: #4c1d95;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      @apply flex items-center text-base;
    }
    li::before {
      content: '';
      @apply w-2 h-2 rounded-full mr-2;
      background-color: #4c1d95;
    }
  }

  &__bar {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      @apply flex flex-col text-base;
    }
    li + li {
      @apply mt-3;
    }
  }
  &__bar-level {
    @apply rounded-full mr-2;
    background-color: #4c1d95;
    height: 0.5rem;
  }
}
</style>

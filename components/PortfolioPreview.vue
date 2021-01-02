<template>
  <div id="portfolio" class="font-normal w-full overflow-auto">
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
              class="font-light"
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
                class="portfolio__bar-level bg-gray-300"
                :style="{ width: '100%' }"
              >
                <span
                  class="portfolio__bar-level portfolio__bar-level--in"
                  :style="{ width: lang.level }"
                ></span>
              </div>
            </li>
          </ul>
        </section>
        <!-- // LANGUAGES -->
        <!-- SOCIAL -->
        <section class="portfolio__section">
          <h4 class="portfolio__section-title">SOCIAL</h4>
          <div class="flex flex-col">
            <div v-if="formSettings.linkedin" class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#linkedin-color"></use>
              </svg>
              <a
                target="_blank"
                :href="`https://linkedin.com/in/${formSettings.github}`"
                >{{ formSettings.linkedin }}</a
              >
            </div>
            <div v-if="formSettings.twitter" class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#twitter-color"></use>
              </svg>
              <a
                target="_blank"
                :href="`https://twitter.com/${formSettings.twitter}`"
                >{{ formSettings.twitter }}</a
              >
            </div>
            <div v-if="formSettings.github" class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#github-color"></use>
              </svg>
              <a
                target="_blank"
                :href="`https://github.com/${formSettings.github}`"
                >{{ formSettings.github }}</a
              >
            </div>
            <div v-if="formSettings.website" class="portfolio__icon-wrapper">
              <svg class="portfolio__icon">
                <use href="@/assets/sprite.svg#website"></use>
              </svg>
              <a target="_blank" :href="formSettings.website">{{
                formSettings.website
              }}</a>
            </div>
          </div>
        </section>
        <!-- // SOCIAL -->
      </div>
      <div class="portfolio__main">
        <!-- ABOUT ME -->
        <section class="portfolio__section portfolio__section--main w-full">
          <h4 class="portfolio__section-title portfolio__section-title--main">
            About me
          </h4>
          <p class="font-light">{{ formSettings.aboutme }}</p>
        </section>
        <!-- // ABOUT ME -->
        <hr class="my-5 border-gray-100 border-2" />
        <!-- EXPERIENCE -->
        <section class="portfolio__section portfolio__section--main w-full">
          <h4 class="portfolio__section-title portfolio__section-title--main">
            Experience
          </h4>
          <ul class="mt-3">
            <li v-for="job in formSettings.work" :key="job.title">
              <h5 class="portfolio__section-title portfolio__section-title--sm">
                {{ job.title }}
              </h5>
              <div class="font-normal">
                <span>{{ job.location }} | </span>
                <span>
                  {{ formatDate(job.from) }} -
                  <template v-if="job.current">Current</template>
                  <template v-else>{{ formatDate(job.to) }}</template>
                </span>
              </div>
              <p class="font-light">{{ job.summary }}</p>
            </li>
          </ul>
        </section>
        <!-- // EXPERIENCE -->
        <hr class="my-5 border-gray-100 border-2" />
        <!-- EDUCATION -->
        <section class="portfolio__section portfolio__section--main w-full">
          <h4 class="portfolio__section-title portfolio__section-title--main">
            Education
          </h4>
          <ul class="mt-3">
            <li v-for="edu in formSettings.education" :key="edu.title">
              <h5 class="portfolio__section-title portfolio__section-title--sm">
                {{ edu.title }}
              </h5>
              <div class="font-normal">
                <span>{{ edu.location }} | </span>
                <span>
                  {{ formatDate(edu.from) }} -
                  <template v-if="edu.current">Current</template>
                  <template v-else>{{ formatDate(edu.to) }}</template>
                </span>
              </div>
              <p class="font-light">{{ edu.summary }}</p>
            </li>
          </ul>
        </section>
        <!-- // EDUCATION -->
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
        jobSkills: string[]
        softSkills: string[]
        languages: { lang: string; level: string }[]
        linkedin: string
        twitter: string
        github: string
        website: string
        education: {
          title: string
          location: string
          from: Date
          to: Date
          current: boolean
          summary: string
        }[]
        work: {
          title: string
          location: string
          from: Date
          to: Date
          current: boolean
          summary: string
        }[]
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
        linkedin: '',
        twitter: '',
        github: '',
        website: '',
        education: [
          {
            title: '',
            location: '',
            from: new Date(),
            to: new Date(),
            current: false,
            summary: '',
          },
        ],
        work: [
          {
            title: '',
            location: '',
            from: new Date(),
            to: new Date(),
            current: false,
            summary: '',
          },
        ],
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
    formatDate(date: Date): string {
      const locale = process.browser ? navigator.language : 'en-GB'
      const options = { year: 'numeric', month: 'long' }
      const dateObj = new Date(date)
      return dateObj.toLocaleDateString(locale, options)
    },
  },
})
</script>
<style lang="postcss" scoped>
.portfolio {
  @apply flex m-10 text-gray-700 shadow;
  width: 21cm;
  height: 29.7cm;
  overflow-y: auto;

  &__side {
    @apply p-6 bg-gray-100 bg-opacity-100;
    max-width: 32.5%;
  }

  &__name {
    @apply text-3xl uppercase font-bold leading-8 mb-3 tracking-wide;
    color: var(--primary);
  }

  &__job-title {
    @apply text-xl uppercase;
  }

  &__section {
    @apply mt-10;
    &--main {
      margin-top: 0;
    }
  }

  &__section-title {
    @apply text-lg uppercase mb-2 font-bold tracking-wide;
    &--sm {
      @apply text-base;
    }
    &--main {
      color: var(--primary);
    }
  }

  &__icon-wrapper {
    @apply flex flex-row font-light;
    align-items: center;

    & + & {
      margin-top: 5px;
    }
  }

  &__icon {
    @apply flex mr-1 fill-current rounded;
    width: 1.25rem;
    height: 1.25rem;
    align-items: center;
  }

  &__tags {
    @apply flex flex-wrap gap-3 mt-3;
  }

  &__tag {
    @apply px-2 py-1 rounded text-sm text-white;
    background-color: var(--primary);
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
      background-color: var(--primary);
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
    position: relative;
    height: 0.5rem;

    &--in {
      position: absolute;
      display: inline-block;
      background-color: var(--primary);
    }
  }

  &__main {
    @apply p-6;
  }
}
</style>

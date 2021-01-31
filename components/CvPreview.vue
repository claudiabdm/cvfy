<template>
  <div id="cv" class="font-normal flex justify-center w-full bg-white">
    <div class="cv bg-white">
      <div class="cv__side">
        <h2 class="cv__name">
          {{ formSettings.name }} {{ formSettings.lastName }}
        </h2>
        <h3 class="cv__job-title">{{ formSettings.jobTitle }}</h3>
        <!-- CONTACT -->
        <section class="cv__section">
          <h4 class="cv__section-title">{{ $t('contact') }}</h4>
          <div class="flex flex-col">
            <div class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#phone"></use>
              </svg>
              <a :href="phoneNumberHref">{{ formSettings.phoneNumber }}</a>
            </div>
            <div class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#email"></use>
              </svg>
              <a :href="emailHref">{{ formSettings.email }}</a>
            </div>
            <div class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#location"></use>
              </svg>
              <span>{{ formSettings.location }}</span>
            </div>
          </div>
        </section>
        <!-- //CONTACT -->
        <!-- PROFESIONAL SKILLS -->
        <section class="cv__section">
          <h4 class="cv__section-title">{{ $t('professional-skills') }}</h4>
          <ul class="cv__tags">
            <li
              v-for="skill in formSettings.jobSkills"
              :key="`preview${skill}`"
              class="cv__tag"
            >
              {{ skill }}
            </li>
          </ul>
        </section>
        <!-- //PROFESIONAL SKILLS -->
        <!-- SOFT SKILLS -->
        <section class="cv__section">
          <h4 class="cv__section-title">{{ $t('soft-skills') }}</h4>
          <ul class="cv__list">
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
        <section class="cv__section">
          <h4 class="cv__section-title">{{ $t('languages') }}</h4>
          <ul class="cv__bar">
            <li
              v-for="lang in formSettings.languages"
              :key="`preview${lang.lang}`"
            >
              {{ lang.lang }}
              <div class="cv__bar-level bg-gray-300" :style="{ width: '100%' }">
                <span
                  class="cv__bar-level cv__bar-level--in"
                  :style="{ width: lang.level }"
                ></span>
              </div>
            </li>
          </ul>
        </section>
        <!-- // LANGUAGES -->
        <!-- SOCIAL -->
        <section class="cv__section">
          <h4 class="cv__section-title">SOCIAL</h4>
          <div class="flex flex-col">
            <div v-if="formSettings.linkedin" class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#linkedin-color"></use>
              </svg>
              <a
                target="_blank"
                :href="`https://linkedin.com/in/${formSettings.github}`"
                >{{ formSettings.linkedin }}</a
              >
            </div>
            <div v-if="formSettings.twitter" class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#twitter-color"></use>
              </svg>
              <a
                target="_blank"
                :href="`https://twitter.com/${formSettings.twitter}`"
                >{{ formSettings.twitter }}</a
              >
            </div>
            <div v-if="formSettings.github" class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#github-color"></use>
              </svg>
              <a
                target="_blank"
                :href="`https://github.com/${formSettings.github}`"
                >{{ formSettings.github }}</a
              >
            </div>
            <div v-if="formSettings.website" class="cv__icon-wrapper">
              <svg class="cv__icon">
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
      <div class="cv__main">
        <!-- ABOUT ME -->
        <section class="cv__section cv__section--main w-full">
          <h4 class="cv__section-title cv__section-title--main">
            {{ $t('about-me') }}
          </h4>
          <p class="font-light">{{ formSettings.aboutme }}</p>
        </section>
        <!-- // ABOUT ME -->
        <hr class="my-5 border-gray-100 border-2" />
        <!-- EXPERIENCE -->
        <section class="cv__section cv__section--main w-full">
          <h4 class="cv__section-title cv__section-title--main">
            {{ $t('experience') }}
          </h4>
          <ul class="mt-3">
            <li
              v-for="job in workSortedByDate"
              :key="job.title"
              class="cv__list-elem"
            >
              <h5 class="cv__section-title cv__section-title--sm">
                {{ job.title }}
              </h5>
              <div class="font-normal">
                <span>{{ job.location }} | </span>
                <span>
                  {{ formatDate(job.from) }} -
                  <template v-if="job.current">{{ $t('current') }}</template>
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
        <section class="cv__section cv__section--main w-full">
          <h4 class="cv__section-title cv__section-title--main">
            {{ $t('education') }}
          </h4>
          <ul class="mt-3">
            <li
              v-for="edu in educationSortedByDate"
              :key="edu.title"
              class="cv__list-elem"
            >
              <h5 class="cv__section-title cv__section-title--sm">
                {{ edu.title }}
              </h5>
              <div class="font-normal">
                <span>{{ edu.location }} | </span>
                <span>
                  {{ formatDate(edu.from) }} -
                  <template v-if="edu.current">{{ $t('current') }}</template>
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
  name: 'CvPreview',
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
    workSortedByDate() {
      return [...this.formSettings.work].sort(
        (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()
      )
    },
    educationSortedByDate() {
      return [...this.formSettings.education].sort(
        (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()
      )
    },
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
      // const locale = process.browser ? navigator.language : 'en-GB'
      const options = { year: 'numeric', month: 'short' }
      const dateObj = new Date(date)
      return dateObj.toLocaleDateString(this.$i18n.locale, options)
    },
  },
})
</script>
<style lang="postcss" scoped>
p {
  @apply leading-relaxed;
}
.cv {
  @apply flex text-gray-700 shadow-lg;
  width: 21cm;
  height: 29.69cm;
  min-width: 21cm;
  min-height: 29.69cm;
  max-width: 21cm;
  max-height: 29.69cm;
  margin: 0;
  align-self: center;
  transform: scale(0.4);
  overflow-y: hidden;

  @media screen and (min-width: 425px) {
    transform: scale(0.5);
  }
  @media screen and (min-width: 768px) {
    transform: scale(0.9);
  }
  @media screen and (min-width: 1024px) {
    transform: scale(0.59);
  }
  &__side {
    @apply px-6 py-10 bg-gray-100 bg-opacity-100;
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
    min-width: 1.25rem;
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
    @apply px-10 py-10;
  }

  &__list-elem {
    & + & {
      @apply mt-3;
    }
  }
}
</style>

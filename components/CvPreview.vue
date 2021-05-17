<template>
  <div id="cv" class="font-normal relative flex justify-center w-full bg-white">
    <div
      id="credit"
      class="p-3 text-gray-700 absolute bottom-0 text-center w-full text-xs"
    >
      Made with ♥️ by
      <a
        class="underline"
        :style="{ color: 'var(--primary)' }"
        href="https://github.com/claudiabdm"
        rel="noopener"
        target="_blank"
        >claudiabdm</a
      >
      using <b>Nuxt.js</b> + <b>TailwindCSS</b>
    </div>
    <div class="cv bg-white">
      <div class="cv__side w-1/3">
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
              <a :href="phoneNumberHref" rel="noopener">{{
                formSettings.phoneNumber
              }}</a>
            </div>
            <div class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#email"></use>
              </svg>
              <a :href="emailHref" rel="noopener">{{ formSettings.email }}</a>
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
                rel="noopener"
                :href="`https://linkedin.com/in/${formSettings.linkedin}`"
                >{{ `linkedin.com/in/${formSettings.linkedin}` }}</a
              >
            </div>
            <div v-if="formSettings.twitter" class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#twitter-color"></use>
              </svg>
              <a
                target="_blank"
                rel="noopener"
                :href="`https://twitter.com/${formSettings.twitter}`"
                >{{ `twitter.com/${formSettings.twitter}` }}</a
              >
            </div>
            <div v-if="formSettings.github" class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#github-color"></use>
              </svg>
              <a
                target="_blank"
                rel="noopener"
                :href="`https://github.com/${formSettings.github}`"
                >{{ `github.com/${formSettings.github}` }}</a
              >
            </div>
            <div v-if="formSettings.website" class="cv__icon-wrapper">
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#website"></use>
              </svg>
              <a target="_blank" rel="noopener" :href="formSettings.website">{{
                formSettings.website
              }}</a>
            </div>
          </div>
        </section>
        <!-- // SOCIAL -->
      </div>
      <div class="cv__main w-2/3">
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
          <ul class="cv__event mt-3">
            <li v-for="job in work" :key="job.title" class="cv__event-elem">
              <h5 class="cv__section-title cv__section-title--sm">
                {{ job.title }}
              </h5>
              <div>
                <span>{{ job.location }} | </span>
                <span>
                  {{ formatDate(job.from) }} -
                  <template v-if="job.current">{{ $t('current') }}</template>
                  <template v-else>{{ formatDate(job.to) }}</template>
                </span>
              </div>
              <ul v-if="job.summaryArr.length > 1" class="cv__list">
                <li v-for="line in job.summaryArr" :key="line">{{ line }}</li>
              </ul>
              <p v-else class="font-light">
                {{ job.summaryArr[0] }}
              </p>
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
          <ul class="cv__event mt-3">
            <li
              v-for="edu in education"
              :key="edu.title"
              class="cv__event-elem"
            >
              <h5 class="cv__section-title cv__section-title--sm">
                {{ edu.title }}
              </h5>
              <div>
                <span>{{ edu.location }} | </span>
                <span>
                  {{ formatDate(edu.from) }} -
                  <template v-if="edu.current">{{ $t('current') }}</template>
                  <template v-else>{{ formatDate(edu.to) }}</template>
                </span>
              </div>
              <ul v-if="edu.summaryArr.length > 1" class="cv__list">
                <li v-for="line in edu.summaryArr" :key="line">{{ line }}</li>
              </ul>
              <p v-else class="font-light">
                {{ edu.summaryArr[0] }}
              </p>
            </li>
          </ul>
        </section>
        <!-- // EDUCATION -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CvEvent } from '~/models/cvEvent';

export default Vue.extend({
  name: 'CvPreview',
  props: {
    formSettings: {
      type: Object as () => {
        jobTtitle: string;
        name: string;
        lastName: string;
        email: string;
        location: string;
        phoneNumber: string;
        aboutme: string;
        jobSkills: string[];
        softSkills: string[];
        languages: { lang: string; level: string }[];
        linkedin: string;
        twitter: string;
        github: string;
        website: string;
        education: CvEvent[];
        work: CvEvent[];
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
            summaryArr: [''],
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
            summaryArr: [''],
          },
        ],
      },
    },
  },
  computed: {
    phoneNumberHref(): string {
      return `tel:${this.formSettings.phoneNumber}`;
    },
    emailHref(): string {
      return `mailto:${this.formSettings.email}`;
    },
    work(): CvEvent[] {
      return this.formSettings.work
        .map((event) => {
          event.summaryArr = this.getSummaryLines(event.summary);
          return event;
        })
        .sort(
          (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()
        );
    },
    education(): CvEvent[] {
      return this.formSettings.education
        .map((event) => {
          event.summaryArr = this.getSummaryLines(event.summary);
          return event;
        })
        .sort(
          (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()
        );
    },
  },
  methods: {
    changeColor() {
      if (
        document.documentElement.style.getPropertyValue('--bg-color') === '#fff'
      ) {
        document.documentElement.style.setProperty('--bg-color', '#f3f4f6');
      } else {
        document.documentElement.style.setProperty('--bg-color', '#fff');
      }
    },
    formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
      };
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString(this.$i18n.locale, options);
    },
    getSummaryLines(summary: string): string[] {
      const lines = summary.split('\n').map((line) => {
        if (line[0] === '-') {
          line = line.slice(1).trim();
        }
        return line;
      });
      return lines;
    },
  },
});
</script>
<style lang="postcss" scoped>
p {
  @apply leading-relaxed;
}
.cv {
  @apply flex text-gray-800 shadow-lg text-sm font-normal;
  width: 21cm;
  height: 29.69cm;
  min-width: 21cm;
  min-height: 29.69cm;
  max-width: 21cm;
  max-height: 29.69cm;
  margin: 0;
  align-self: center;
  word-break: break-word;
  transform: scale(0.4);
  overflow-y: hidden;

  @media screen and (min-width: 425px) {
    transform: scale(0.5);
  }
  @media screen and (min-width: 768px) {
    transform: scale(0.9);
  }
  @media screen and (min-width: 1024px) {
    transform: scale(0.52);
  }

  @media screen and (min-width: 1400px) {
    transform: scale(0.75);
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
    @apply mt-6;
    &--main {
      @apply mt-0 text-sm;
    }
  }

  &__section-title {
    @apply text-lg uppercase mb-2 font-bold tracking-wide;
    &--sm {
      @apply text-sm;
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
    @apply flex flex-wrap;
  }

  &__tag {
    @apply px-2 py-1 rounded text-white text-xs;
    margin: 0.5rem 0.2rem 0.25rem;
    background-color: var(--primary);
  }

  &__list {
    @apply font-light mt-1;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding-left: 1em;
      text-indent: -1em;
    }
    li:first-child {
      @apply mt-1;
    }
    li::before {
      content: '\2022';
      padding-right: 0.5em;
      color: var(--primary);
    }
  }

  &__bar {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      @apply flex flex-col;
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
    @apply px-8 py-10;
  }

  &__event {
    &-elem + &-elem {
      @apply mt-6;
    }
  }
}
</style>

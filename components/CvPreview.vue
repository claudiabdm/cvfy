<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import type { CvEvent } from '~/types/cvfy'
import { useCvState } from '~/data/useCvState'

export default defineComponent({
  name: 'CvPreview',
  setup() {
    const { formSettings, isLoading } = useCvState()
    const i18n = useI18n()

    const phoneNumberHref = computed(() => {
      return `tel:${formSettings.value.phoneNumber}`
    })
    const emailHref = computed(() => {
      return `mailto:${formSettings.value.email}`
    })
    const work = computed(() => {
      return orderEvents(formSettings.value.work)
    })
    const education = computed(() => {
      return orderEvents(formSettings.value.education)
    })
    const projects = computed(() => {
      return orderEvents(formSettings.value.projects)
    })

    function orderEvents(arr: CvEvent[]): CvEvent[] {
      return [...arr].sort(
        (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime(),
      )
    }

    function formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
      }
      const dateObj = new Date(date)
      return dateObj.toLocaleDateString(i18n.locale.value, options)
    }

    const cv = ref<HTMLElement | null>(null)
    const cvMain = ref<HTMLElement | null>(null)
    const cvSide = ref<HTMLElement | null>(null)
    const PX_TO_CM = 0.026458
    const PAGE_HEIGHT_CM = 29.69
    const pages = ref<Array<number>>([])
    let resizeObserverMain: ResizeObserver | null = null
    let resizeObserverSide: ResizeObserver | null = null

    onMounted(() => {
      if (cv.value && cvMain.value && cvSide.value) {
        resizeObserverMain = createResizeObserver()
        resizeObserverSide = createResizeObserver()
        resizeObserverMain.observe(cvMain.value)
        resizeObserverSide.observe(cvSide.value)
      }
    })

    onUnmounted(() => {
      if (resizeObserverMain)
        resizeObserverMain.disconnect()

      if (resizeObserverSide)
        resizeObserverSide.disconnect()
    })

    function createResizeObserver() {
      return new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cm = PX_TO_CM * entry.contentRect.height
          const newPages = Math.ceil(cm / PAGE_HEIGHT_CM)
          if (newPages !== pages.value.length) {
            pages.value = [...Array(newPages).keys()]
            const newHeightCm = Math.max(
              PAGE_HEIGHT_CM,
              newPages * PAGE_HEIGHT_CM,
            )
            if (cv.value)
              cv.value.style.setProperty('--height', `${newHeightCm}cm`)
          }
        }
      })
    }

    return {
      formSettings,
      isLoading,
      phoneNumberHref,
      emailHref,
      work,
      education,
      projects,
      formatDate,
      cv,
      cvMain,
      cvSide,
      pages,
    }
  },
})
</script>

<template>
  <div class="cvWrapper">
    <div
      ref="cv"
      tabindex="0"
      aria-label="CV preview"
      class="cv bg-white relative"
      :class="[{ blur: isLoading }]"
    >
      <div
        v-for="page in pages"
        :key="page"
        :style="{ top: `${page * 29.69}cm` }"
        class="cv__pages"
      >
        <div
          :style="{
            transform: 'translate3d(102%, -50%, 0)',
          }"
        >
          {{ page + 1 }}
        </div>
      </div>
      <div
        ref="cvSide"
        class="cv__side"
      >
        <CvProfileImageViewer
          v-if="formSettings.profileImageDataUri"
          :profile-image-data-uri="formSettings.profileImageDataUri"
        />
        <h2 class="cv__name">
          {{ formSettings.name }} {{ formSettings.lastName }}
        </h2>
        <h3 class="cv__job-title">
          {{ formSettings.jobTitle }}
        </h3>
        <!-- CONTACT -->
        <section class="cv__section">
          <h4 class="cv__section-title">
            {{ $t("contact") }}
          </h4>
          <div class="flex flex-col">
            <div
              v-if="formSettings.phoneNumber"
              class="cv__icon-wrapper"
            >
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#phone" />
              </svg>
              <a
                :href="phoneNumberHref"
                rel="noopener"
              >{{
                formSettings.phoneNumber
              }}</a>
            </div>
            <div
              v-if="formSettings.email"
              class="cv__icon-wrapper"
            >
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#email" />
              </svg>
              <a
                :href="emailHref"
                rel="noopener"
              >{{ formSettings.email }}</a>
            </div>
            <div
              v-if="formSettings.location"
              class="cv__icon-wrapper"
            >
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#location" />
              </svg>
              <span tabindex="0">{{ formSettings.location }}</span>
            </div>
          </div>
        </section>
        <!-- //CONTACT -->
        <!-- PROFESIONAL SKILLS -->
        <section class="cv__section">
          <h4 class="cv__section-title">
            {{ $t("professional-skills") }}
          </h4>
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
          <h4 class="cv__section-title">
            {{ $t("soft-skills") }}
          </h4>
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
          <h4 class="cv__section-title">
            {{ $t("languages") }}
          </h4>
          <ul>
            <li
              v-for="lang in formSettings.languages"
              :key="`preview${lang.lang}`"
              class="flex justify-between pr-4"
            >
              <span>{{ lang.lang }}</span>
              <span class="font-light">{{ $t(lang.level) }}</span>
            </li>
          </ul>
        </section>
        <!-- // LANGUAGES -->
        <!-- SOCIAL -->
        <section
          v-if="formSettings.displaySocial"
          class="cv__section"
        >
          <h4 class="cv__section-title">
            {{ $t("social") }}
          </h4>
          <div class="flex flex-col">
            <div
              v-if="formSettings.linkedin"
              class="cv__icon-wrapper"
            >
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#linkedin-color" />
              </svg>
              <a
                target="_blank"
                rel="noopener"
                :href="`https://linkedin.com/in/${formSettings.linkedin}`"
              >{{ `linkedin.com/in/${formSettings.linkedin}` }}</a>
            </div>
            <div
              v-if="formSettings.twitter"
              class="cv__icon-wrapper"
            >
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#twitter-color" />
              </svg>
              <a
                target="_blank"
                rel="noopener"
                :href="`https://twitter.com/${formSettings.twitter}`"
              >{{ `twitter.com/${formSettings.twitter}` }}</a>
            </div>
            <div
              v-if="formSettings.github"
              class="cv__icon-wrapper"
            >
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#github-color" />
              </svg>
              <a
                target="_blank"
                rel="noopener"
                :href="`https://github.com/${formSettings.github}`"
              >{{ `github.com/${formSettings.github}` }}</a>
            </div>
            <div
              v-if="formSettings.website"
              class="cv__icon-wrapper"
            >
              <svg class="cv__icon">
                <use href="@/assets/sprite.svg#website" />
              </svg>
              <a
                target="_blank"
                rel="noopener"
                :href="formSettings.website"
              >{{
                formSettings.website
              }}</a>
            </div>
          </div>
        </section>
        <!-- // SOCIAL -->
      </div>
      <div
        ref="cvMain"
        class="cv__main"
      >
        <!-- ABOUT ME -->
        <section class="cv__section cv__section--main w-full">
          <h4 class="cv__section-title cv__section-title--main">
            {{ $t("about-me") }}
          </h4>
          <p class="font-light">
            <!-- Avoids unnecessary spaces at the begging while still allowing break lines -->
            <span class="whitespace-pre-wrap">{{ formSettings.aboutme }}</span>
          </p>
        </section>
        <!-- // ABOUT ME -->

        <hr class="cv__bar">

        <!-- EXPERIENCE -->
        <section class="cv__section cv__section--main w-full">
          <h4 class="cv__section-title cv__section-title--main">
            {{ $t("experience") }}
          </h4>
          <ul class="cv__event mt-3">
            <li
              v-for="job in work"
              :key="job.id"
              class="cv__event-elem"
            >
              <h5 class="cv__section-title cv__section-title--sm">
                {{ job.title }}
              </h5>
              <div>
                <span>{{ job.location }} | </span>
                <span>
                  {{ formatDate(job.from) }} -
                  <template v-if="job.current">{{ $t("current") }}</template>
                  <template v-else>{{ formatDate(job.to) }}</template>
                </span>
              </div>
              <CvTextEditor
                v-model="job.summary"
                :read-only="true"
                class="cv__desc"
              />
            </li>
          </ul>
        </section>
        <!-- // EXPERIENCE -->

        <hr
          v-if="formSettings.displayEducation"
          class="cv__bar"
        >

        <!-- EDUCATION -->
        <section
          v-if="formSettings.displayEducation"
          class="cv__section cv__section--main w-full"
        >
          <h4 class="cv__section-title cv__section-title--main">
            {{ $t("education") }}
          </h4>
          <ul class="cv__event mt-3">
            <li
              v-for="edu in education"
              :key="edu.id"
              class="cv__event-elem"
            >
              <h5 class="cv__section-title cv__section-title--sm">
                {{ edu.title }}
              </h5>
              <div>
                <span>{{ edu.location }} | </span>
                <span>
                  {{ formatDate(edu.from) }} -
                  <template v-if="edu.current">{{ $t("current") }}</template>
                  <template v-else>{{ formatDate(edu.to) }}</template>
                </span>
              </div>
              <CvTextEditor
                v-model="edu.summary"
                :read-only="true"
                class="cv__desc"
              />
            </li>
          </ul>
        </section>
        <!-- // EDUCATION -->

        <hr
          v-if="formSettings.displayProjects"
          class="cv__bar"
        >

        <!-- PROJECTS -->
        <section
          v-if="formSettings.displayProjects"
          class="cv__section cv__section--main w-full"
        >
          <h4 class="cv__section-title cv__section-title--main">
            {{ $t("projects") }}
          </h4>
          <ul class="cv__event mt-3">
            <li
              v-for="project in projects"
              :key="project.id"
              class="cv__event-elem"
            >
              <h5 class="cv__section-title cv__section-title--sm">
                {{ project.title }}
              </h5>
              <div>
                <span>{{ project.location }} | </span>
                <span>
                  {{ formatDate(project.from) }} -
                  <template v-if="project.current">{{
                    $t("current")
                  }}</template>
                  <template v-else>{{ formatDate(project.to) }}</template>
                </span>
              </div>
              <CvTextEditor
                v-model="project.summary"
                :read-only="true"
                class="cv__desc"
              />
            </li>
          </ul>
        </section>
        <!-- // PROJECTS -->
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

<style lang="postcss">
p {
  @apply leading-relaxed;
}

.credit {
  @apply p-3 text-slate-700 text-center w-full text-xs/normal;
}

.cvWrapper {
  @apply font-normal relative flex flex-col items-center w-full bg-white overflow-y-auto overflow-x-hidden;

  @media print {
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;

    & .cv {
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
  @apply grid text-slate-800 shadow-lg text-sm/normal font-normal mt-6;
  --height: 29.69cm;
  grid-template-columns: 1fr 2fr;
  width: 21cm;
  height: var(--height);
  min-height: var(--height);
  min-width: 21cm;
  max-width: 21cm;
  max-height: var(--height);
  word-break: break-word;
  transform: scale(0.4);
  transform-origin: top;
  background-image: linear-gradient(to right,
      #f8fafc 33%,
      rgba(255, 255, 255, 0) 0%);

  @media screen and (min-width: 425px) {
    transform: scale(0.65);
  }

  @media screen and (min-width: 768px) {
    transform: scale(0.9);
  }

  @media screen and (min-width: 1024px) {
    transform: scale(0.7);
  }

  &__main {
    height: min-content;
  }

  &__side {
    @apply flex flex-col px-6 pt-8 pb-10;
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

  &__name {
    @apply text-3xl/normal uppercase font-bold leading-8 mb-3 tracking-wide;
    color: var(--primary);
  }

  &__job-title {
    @apply text-xl/normal uppercase;
  }

  &__section {
    @apply mt-6;

    &--main {
      @apply mt-0 text-sm/normal;
    }
  }

  &__section-title {
    @apply text-lg uppercase mb-2 font-bold tracking-wide;

    &--sm {
      @apply text-sm/normal;
    }

    &--main {
      color: var(--primary);
    }
  }

  &__icon-wrapper {
    @apply flex flex-row font-light;
    align-items: center;

    &+& {
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
    @apply flex flex-wrap gap-2;
  }

  &__tag {
    @apply px-2 py-1 rounded text-white text-xs/normal;
    background-color: var(--primary);
  }

  &__list {
    font-weight: 300;
    list-style: inside;

    ::marker {
      color: var(--primary);
    }
  }

  &__desc {
    @apply font-light mt-1;
  }

  &__bar {
    @apply my-5 border-slate-50 border-2;
    list-style: none;
    padding: 0;

    li {
      @apply flex justify-between;
    }

    li+li {
      @apply mt-3;
    }
  }

  &__main {
    @apply px-8 py-10;
  }

  &__event {
    &-elem+&-elem {
      @apply mt-6;
    }
  }
}

.blur {
  filter: blur(5px);
}
</style>

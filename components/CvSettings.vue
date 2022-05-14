<template>
  <div class="bg-gray-100 bg-opacity-100 shadow-lg font-bold z-10">
    <h2 class="title">
      <span class="title__text">
        {{ $t('cv-settings') }}
      </span>
      <a
        class="buy-me-a-coffee"
        href="https://www.buymeacoffee.com/claudiabdm"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy me a coffee"
      >
        <img
          :src="`https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=WkEJXNYmy&button_colour=${formSettings.activeColor.replace(
            '#',
            ''
          )}&font_colour=fff&outline_colour=fff&coffee_colour=fff`"
          alt="Buy me a coffee button"
        />
      </a>
    </h2>
    <form class="form mb-10" autocomplete="on">
      <div class="form__section px-6 py-3">
        <button
          class="form__btn form__btn--ghost"
          type="button"
          @click="resetForm"
        >
          {{ $t('clear-settings') }}
        </button>
      </div>

      <!-- LANGUAGE-->
      <fieldset class="form__section px-6 py-3">
        <legend class="form__legend">{{ $t('cv-language') }}</legend>
        <div class="flex flex-wrap gap-2 justify-start w-full">
          <nuxt-link
            v-for="locale in availableLocales"
            :key="locale"
            class="form__btn form__btn--ghost"
            :to="switchLocalePath(locale)"
          >
            {{ $t(`${locale}-name`) }}
          </nuxt-link>
        </div>
      </fieldset>
      <!-- LANGUAGE-->

      <!-- COLOR THEME -->
      <fieldset class="form__section px-6 py-3">
        <legend class="form__legend">{{ $t('color-theme') }}</legend>
        <div class="flex flex-wrap gap-2 justify-start">
          <label
            v-for="color in colors"
            :key="color.color"
            tabindex="0"
            :class="[
              'form__btn',
              'form__btn--color-theme',
              `form__btn--${color.name}`,
              'capitalize',
              {
                'form__btn--color-selected':
                  color.color === formSettings.activeColor,
              },
            ]"
            @keydown.enter="changeColor(color.color, color.darker)"
          >
            {{ $t(color.name) }}
            <input
              v-model="formSettings.activeColor"
              type="radio"
              class="sr-only"
              :value="color.color"
              @change="changeColor(color.color, color.darker)"
            />
          </label>
        </div>
      </fieldset>
      <!-- COLOR THEME -->

      <!-- PERSONAL DETAILS -->
      <fieldset class="form__section">
        <expansion-panel :panel-name="$t('personal-details')">
          <template v-slot:title>
            <legend class="form__legend">{{ $t('personal-details') }}</legend>
          </template>
          <template v-slot:content>
            <div class="grid grid-cols-2 gap-x-3 gap-y-10">
              <div class="form__group col-span-full">
                <label class="form__label" for="job-pos"
                  >💼 {{ $t('job-title') }}</label
                >
                <input
                  id="job-pos"
                  v-model="formSettings.jobTitle"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group">
                <label class="form__label" for="first-name"
                  >👤 {{ $t('first-name') }}</label
                >
                <input
                  id="first-name"
                  v-model="formSettings.name"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group">
                <label class="form__label" for="last-name"
                  >👤 {{ $t('last-name') }}</label
                >
                <input
                  id="last-name"
                  v-model="formSettings.lastName"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label" for="email"
                  >✉️ {{ $t('email') }}</label
                >
                <input
                  id="email"
                  v-model="formSettings.email"
                  class="form__control"
                  type="email"
                />
              </div>
              <div class="form__group">
                <label class="form__label" for="location"
                  >📍 {{ $t('location') }}</label
                >
                <input
                  id="location"
                  v-model="formSettings.location"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group">
                <label class="form__label" for="phone"
                  >📱 {{ $t('phone-number') }}</label
                >
                <input
                  id="phone"
                  v-model="formSettings.phoneNumber"
                  class="form__control"
                  type="tel"
                />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label" for="aboutme"
                  >🌟 {{ $t('about-me') }}</label
                >
                <textarea
                  id="aboutme"
                  v-model="formSettings.aboutme"
                  class="form__control"
                  name="aboutme"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
          </template>
        </expansion-panel>
      </fieldset>
      <!-- PERSONAL DETAILS -->

      <!-- SKILLS -->
      <fieldset class="form__section grid gap-3">
        <expansion-panel :panel-name="$t('skills')">
          <template v-slot:title>
            <legend class="form__legend">{{ $t('skills') }}</legend>
          </template>
          <template v-slot:content>
            <div>
              <cv-input-tags
                tag-list-name="jobSkills"
                :tag-list-label="`🛠 ${$t('technical-skills')}`"
                :tag-list="formSettings.jobSkills"
                @addTag="addSkill($event)"
                @removeTag="removeSkill($event)"
              ></cv-input-tags>
              <cv-input-tags
                tag-list-name="softSkills"
                :tag-list-label="`🧸 ${$t('soft-skills')}`"
                :tag-list="formSettings.softSkills"
                @addTag="addSkill($event)"
                @removeTag="removeSkill($event)"
              ></cv-input-tags>
              <cv-input-tags
                tag-list-name="languages"
                :tag-list-label="`🌎 ${$t('languages')}`"
                :tag-list-lang="formSettings.languages"
                @addTag="addSkill($event)"
                @removeTag="removeSkill($event)"
              ></cv-input-tags>
            </div>
          </template>
        </expansion-panel>
      </fieldset>
      <!-- SKILLS -->

      <!-- SOCIAL -->
      <fieldset class="form__section grid gap-3">
        <expansion-panel :panel-name="'Social'">
          <template v-slot:title>
            <legend class="form__legend">Social</legend>
          </template>
          <template v-slot:content>
            <div class="grid grid-cols-2 gap-x-3 gap-y-10">
              <div class="form__group col-span-full">
                <label class="form__label flex" for="linkedin">
                  <svg class="form__icon rounded mr-1">
                    <use href="@/assets/sprite.svg#linkedin"></use>
                  </svg>
                  Linkedin
                </label>
                <input
                  id="linkedin"
                  v-model="formSettings.linkedin"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label flex" for="twitter">
                  <svg class="form__icon rounded mr-1">
                    <use href="@/assets/sprite.svg#twitter"></use>
                  </svg>
                  Twitter
                </label>
                <input
                  id="twitter"
                  v-model="formSettings.twitter"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label flex" for="github">
                  <svg class="form__icon mr-1">
                    <use href="@/assets/sprite.svg#github"></use>
                  </svg>
                  GitHub
                </label>
                <input
                  id="github"
                  v-model="formSettings.github"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label flex" for="website">
                  <svg class="form__icon mr-1">
                    <use href="@/assets/sprite.svg#website"></use>
                  </svg>
                  Website
                </label>
                <input
                  id="website"
                  v-model="formSettings.website"
                  class="form__control"
                  type="text"
                />
              </div>
            </div>
          </template>
        </expansion-panel>
      </fieldset>
      <!-- SOCIAL -->

      <!-- WORK EXPERIENCE -->
      <fieldset class="form__section grid gap-3">
        <expansion-panel :panel-name="$t('experience')">
          <template v-slot:title>
            <legend class="form__legend">{{ $t('experience') }}</legend>
          </template>
          <template v-slot:content>
            <cv-dynamic-section
              section-name="work"
              :entries="formSettings.work"
            ></cv-dynamic-section>
            {{ formSettings.work }}
          </template>
        </expansion-panel>
      </fieldset>
      <!-- WORK EXPERIENCE -->

      <!-- EDUCATION -->
      <fieldset class="form__section grid gap-3">
        <expansion-panel :panel-name="$t('education')">
          <template v-slot:title>
            <legend class="form__legend">{{ $t('education') }}</legend>
          </template>
          <template v-slot:content>
            <div>
              <cv-display-checkbox
                class="form__display-checkbox"
                :display-section="formSettings.displayEducation"
                section-name="education"
              ></cv-display-checkbox>
              <cv-dynamic-section
                section-name="education"
                :entries="formSettings.education"
              ></cv-dynamic-section>
            </div>
          </template>
        </expansion-panel>
      </fieldset>
      <!-- EDUCATION -->

      <!-- PROJECTS -->
      <fieldset class="form__section grid gap-3">
        <expansion-panel :panel-name="$t('projects')">
          <template v-slot:title>
            <legend class="form__legend">{{ $t('projects') }}</legend>
          </template>
          <template v-slot:content>
            <div>
              <cv-display-checkbox
                class="form__display-checkbox"
                :display-section="formSettings.displayProjects"
                section-name="projects"
              ></cv-display-checkbox>
              <cv-dynamic-section
                section-name="projects"
                :entries="formSettings.projects"
              ></cv-dynamic-section>
            </div>
          </template>
        </expansion-panel>
      </fieldset>
      <!-- PROJECTS -->

      <!-- CTA -->
      <div class="form__section flex flex-col p-6 gap-3">
        <label tabindex="0" class="form__btn flex justify-center">
          {{ $t('upload-cv') }} (JSON)
          <input
            type="file"
            accept=".json"
            name="uploadCV"
            class="hidden"
            @change="uploadCV"
          />
        </label>
        <a
          :href="formSettingsHref"
          rel="noopener"
          :download="`CV_${formSettings.name}_${formSettings.lastName}_${$i18n.locale}.json`"
          class="form__btn flex justify-center"
          >{{ $t('download-cv-settings') }} (JSON)</a
        >
        <button
          type="button"
          class="form__btn flex flex-col justify-center"
          @click="downloadPdf"
        >
          <span>{{ $t('download-cv-pdf') }}</span>
          <span>({{ $t('chrome-recommended') }})</span>
        </button>
      </div>
      <!-- CTA -->
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {
  computed,
  onMounted,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import CvDynamicSection from '~/components/CvDynamicSection.vue';
import CvDisplayCheckbox from '~/components/CvDisplayCheckbox.vue';
import CvInputTags from '~/components/CvInputTags.vue';
import ExpansionPanel from '~/components/ExpansionPanel.vue';
import { useCvState } from '~/data/useCvState';

export default Vue.extend({
  name: 'CvSettings',
  components: {
    CvDynamicSection,
    CvDisplayCheckbox,
    CvInputTags,
    ExpansionPanel,
  },
  setup() {
    const config = {
      colors: [
        { name: 'pink', color: '#9D174D', darker: '#831843' },
        { name: 'purple', color: '#5B21B6', darker: '#4C1D95' },
        { name: 'blue', color: '#1E40AF', darker: '#1E3A8A' },
        { name: 'green', color: '#065F46', darker: '#064E3B' },
        { name: 'black', color: '#1F2937', darker: '#111827' },
      ],
      languages: [
        { name: 'es-name', code: 'es' },
        { name: 'en-name', code: 'en' },
      ],
    };

    const { formSettings, uploadCV, resetForm, setUpCvSettings } = useCvState();
    const context = useContext();

    onMounted(setUpCvSettings);

    watch(
      () => formSettings.value,
      (newValue, oldValue) => {
        localStorage.setItem(
          `cvSettings-${context.i18n.locale}`,
          JSON.stringify(newValue)
        );
        if (newValue.activeColor !== oldValue.activeColor) {
          const newColor = getCurrentColor(newValue.activeColor);
          changeColor(newColor.color, newColor.darker);
        }
      },
      { deep: true }
    );

    const formSettingsHref = computed(function getFormSettingsHref() {
      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify({ formSettings: formSettings.value })
      )}`;
    });

    const availableLocales = computed(function getAvailableLocales() {
      return context.i18n.localeCodes.filter(
        (locale: any) => !locale.includes('-')
      );
    });

    function downloadPdf(): void {
      const oldTitle = document.title;
      document.title = `CV_${formSettings.value.name}_${formSettings.value.lastName}_${context.app.i18n.locale}`;
      window.print();
      document.title = oldTitle;
    }

    function changeColor(color: string, darker: string): void {
      formSettings.value.activeColor = color;
      document.documentElement.style.setProperty('--primary', color);
      document.documentElement.style.setProperty('--primary-darker', darker);
    }

    function getCurrentColor(colorValue: string): {
      color: string;
      darker: string;
    } {
      return (
        config.colors.find((color) => color.color === colorValue) ||
        config.colors[1]
      );
    }

    return {
      ...config,
      downloadPdf,
      changeColor,
      formSettings,
      formSettingsHref,
      availableLocales,
      uploadCV,
      resetForm,
    };
  },
});
</script>
<style lang="postcss">
.title {
  @apply flex flex-wrap text-xl pt-8 px-6 pb-6 tracking-wide uppercase;
  align-items: center;
  justify-content: space-between;
  .title__text {
    flex-shrink: 0;
  }
  .buy-me-a-coffee {
    display: flex;
    justify-content: flex-end;
    flex-basis: 50%;
    height: 30px;
    flex-shrink: 1;
  }
}
.form {
  @apply font-light;

  &__section {
    @apply mb-3;
  }

  &__legend {
    @apply text-lg font-bold tracking-wide;

    &--small {
      @apply text-sm;
    }
  }

  &__group {
    @apply flex flex-col px-1;
  }

  &__label {
    @apply mb-1 font-normal text-gray-600 text-sm;
    &:focus {
      @apply text-purple-700;
    }
  }

  &__control {
    @apply shadow rounded px-2 py-1 border border-transparent font-light w-full bg-white;
    transition: all 0.1s linear;
    outline: none;
    &:focus {
      @apply border;
      border-color: var(--primary);
    }

    &--checkbox {
      @apply mr-1;
      width: 1.25rem;
      height: 1.25rem;
      background: none;
      box-shadow: none;
    }
  }

  &__btn {
    margin: 0.5rem 0.2rem 0.25rem;
    color: #fff;
    background-color: var(--primary);
    @apply text-white p-2 rounded shadow font-light justify-center items-center text-center;
    transition: background-color 0.1s linear, color 0.1s linear;
    & + & {
      margin-top: 0.5rem;
    }

    &:hover {
      background-color: var(--primary-darker);
      cursor: pointer;
    }
    &--color-theme {
      background-color: #fff;
      &:hover {
        color: #fff;
      }
    }
    &--pink {
      color: var(--pink);
      &:hover {
        background-color: var(--pink);
      }
    }
    &--purple {
      color: var(--purple);
      &:hover {
        background-color: var(--purple);
      }
    }
    &--indigo {
      color: var(--indigo);
      &:hover {
        background-color: var(--indigo-darker);
      }
    }
    &--blue {
      color: var(--blue);
      &:hover {
        background-color: var(--blue-darker);
      }
    }
    &--green {
      color: var(--green);
      &:hover {
        background-color: var(--green-darker);
      }
    }
    &--black {
      color: var(--black);
      &:hover {
        background-color: var(--black-darker);
      }
    }

    &--tag {
      @apply flex gap-2 py-1;
      align-items: center;

      &:hover {
        @appy bg-purple-700;
      }
    }
    &--delete {
      @apply bg-red-400;
      &:hover {
        @apply bg-red-500;
      }
    }

    &--ghost {
      @apply bg-white text-gray-700;
      &:hover {
        @apply bg-gray-700 text-white;
      }
    }

    &--color-selected {
      background-color: var(--primary);
      color: #fff;
    }

    &--active {
      @apply bg-gray-700 text-white;
      box-shadow: none;
    }
  }

  &__icon {
    fill: #fff;
    width: 1.25rem;
    height: 1.25rem;
    &:hover {
      opacity: 0.6;
    }
  }

  &__display-checkbox {
    @apply mb-6;
  }
}
</style>

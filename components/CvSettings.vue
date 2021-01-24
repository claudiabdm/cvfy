<template>
  <div class="bg-gray-100 bg-opacity-100 shadow font-bold">
    <h2 class="text-2xl my-3 mx-6 tracking-wide">CV Settings</h2>
    <form class="form mb-10">
      <!-- COLOR THEME -->
      <fieldset class="form__section px-6 py-3">
        <legend class="form__legend">Color theme</legend>
        <div class="flex flex-wrap gap-2 justify-start">
          <button
            v-for="color in colors"
            :key="color"
            class="form__btn"
            :style="{ 'background-color': color.color }"
            type="button"
            @click="changeColor(color.color)"
          >
            {{ color.name }}
          </button>
        </div>
      </fieldset>
      <!-- COLOR THEME -->

      <!-- PERSONAL DETAILS -->
      <fieldset class="form__section">
        <expansion-panel>
          <template v-slot:title>
            <legend class="form__legend">Personal Details</legend>
          </template>
          <template v-slot:content>
            <div class="grid grid-cols-2 gap-x-3 gap-y-4">
              <div class="form__group col-span-full">
                <label class="form__label" for="job-pos"
                  >💼 Job Title / Current Position</label
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
                  >👤 First Name</label
                >
                <input
                  id="first-name"
                  v-model="formSettings.name"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group">
                <label class="form__label" for="last-name">👤 Last Name</label>
                <input
                  id="last-name"
                  v-model="formSettings.lastName"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label" for="email">✉️ Email</label>
                <input
                  id="email"
                  v-model="formSettings.email"
                  class="form__control"
                  type="email"
                />
              </div>
              <div class="form__group">
                <label class="form__label" for="location">📍 Location</label>
                <input
                  id="location"
                  v-model="formSettings.location"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group">
                <label class="form__label" for="phone">📱 Phone Number</label>
                <input
                  id="phone"
                  v-model="formSettings.phoneNumber"
                  class="form__control"
                  type="tel"
                />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label" for="aboutme">🌟 About Me</label>
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
        <expansion-panel>
          <template v-slot:title>
            <legend class="form__legend">Skills</legend>
          </template>
          <template v-slot:content>
            <div>
              <cv-input-tags
                tag-list-name="jobSkills"
                tag-list-label="🛠 Technical Skills"
                :tag-list="formSettings.jobSkills"
                @addTag="addSkill($event)"
                @removeTag="removeSkill($event)"
              ></cv-input-tags>
              <cv-input-tags
                tag-list-name="softSkills"
                tag-list-label="🧸 Soft Skills"
                :tag-list="formSettings.softSkills"
                @addTag="addSkill($event)"
                @removeTag="removeSkill($event)"
              ></cv-input-tags>
              <cv-input-tags
                tag-list-name="languages"
                tag-list-label="🌎 Languages"
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
        <expansion-panel>
          <template v-slot:title>
            <legend class="form__legend">Social</legend>
          </template>
          <template v-slot:content>
            <div class="grid grid-cols-2 gap-x-3 gap-y-4">
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

      <!-- EDUCATION -->
      <fieldset class="form__section grid gap-3">
        <expansion-panel>
          <template v-slot:title>
            <legend class="form__legend">Education</legend>
          </template>
          <template v-slot:content>
            <cv-dynamic-section
              section-name="education"
              :entries="formSettings.education"
              @addEntry="onUpdateSection"
              @removeEntry="onUpdateSection"
            ></cv-dynamic-section>
          </template>
        </expansion-panel>
      </fieldset>
      <!-- EDUCATION -->

      <!-- WORK EXPERIENCE -->
      <fieldset class="form__section grid gap-3">
        <expansion-panel>
          <template v-slot:title>
            <legend class="form__legend">Work Experience</legend>
          </template>
          <template v-slot:content>
            <cv-dynamic-section
              section-name="work"
              :entries="formSettings.work"
              @addEntry="onUpdateSection"
              @removeEntry="onUpdateSection"
            ></cv-dynamic-section>
          </template>
        </expansion-panel>
      </fieldset>
      <!-- WORK EXPERIENCE -->

      <!-- CAB -->
      <div class="form__section flex flex-col p-6 gap-3">
        <label class="form__btn flex justify-center">
          Upload CV Settings (JSON)
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
          download="cv.json"
          class="form__btn flex justify-center"
          >Download CV Settings (JSON)</a
        >
        <button
          type="button"
          class="form__btn flex flex-col justify-center"
          @click="downloadPdf"
        >
          <span>Download your CV as PDF</span>
          <span>(Chrome recommended)</span>
        </button>
      </div>
      <!-- CAB -->
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CvSettings',
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
  data() {
    return {
      jobSkill: '',
      colors: [
        { name: 'Pink', color: '#9D174D' },
        { name: 'Purple', color: '#5B21B6' },
        { name: 'Indigo', color: '#3730A3' },
        { name: 'Blue', color: '#1E40AF' },
        { name: 'Green', color: '#065F46' },
        { name: 'Yellow', color: '#F59E0B' },
        { name: 'Red', color: '#DC2626' },
        { name: 'Black', color: '#1F2937' },
      ],
    }
  },
  computed: {
    formSettingsHref() {
      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(this.formSettings)
      )}`
    },
  },
  methods: {
    addSkill(e: { tag: string; tagType: string }): void {
      this.$emit('addSkill', { skill: e.tag, skillType: e.tagType })
      this.jobSkill = ''
    },
    removeSkill(e: { tag: string; tagType: string }): void {
      this.$emit('removeSkill', { skill: e.tag, skillType: e.tagType })
    },
    onUpdateSection(e: {
      eventType: string
      sectionName: string
      entry: {
        title: string
        location: string
        from: Date
        to: Date
        current: boolean
        summary: string
      }
    }): void {
      this.$emit('updateSection', e)
    },
    uploadCV(e: any): void {
      const fr = new FileReader()
      fr.onload = (e: any) => {
        const data = JSON.parse(e.target.result)
        this.$emit('uploadCv', data)
      }
      fr.readAsText(e.target.files[0])
    },
    downloadPdf() {
      window.print()
    },
    changeColor(color: string): void {
      document.documentElement.style.setProperty('--primary', color)
    },
  },
})
</script>
<style lang="postcss">
.form {
  @apply font-light;

  &__section {
    @apply mb-3;
  }

  &__legend {
    @apply text-lg font-normal font-bold tracking-wide;

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
    @apply shadow rounded px-2 py-1 border border-transparent font-light w-full;
    transition: all 0.1s linear;
    outline: none;
    &:focus {
      @apply border border-purple-700;
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
    color: #fff;
    background-color: var(--primary);
    @apply text-white p-2 rounded shadow font-light justify-center items-center text-center;
    transition: all 0.1s linear;
    &:hover {
      background-color: darken(#{var(--primary)}, 10%);
      cursor: pointer;
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
  }

  &__icon {
    fill: #fff;
    width: 1.25rem;
    height: 1.25rem;
    &:hover {
      opacity: 0.6;
    }
  }
}
</style>

<template>
  <div class="bg-gray-100 shadow font-bold">
    <h2 class="text-2xl my-3 mx-6 tracking-wide">Portfolio Settings</h2>
    <form class="form mb-10">
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
              <portfolio-input-tags
                tag-list-name="jobSkills"
                tag-list-label="🛠 Technical Skills"
                :tag-list="formSettings.jobSkills"
                @addTag="addSkill($event)"
                @removeTag="removeSkill($event)"
              ></portfolio-input-tags>
              <portfolio-input-tags
                tag-list-name="softSkills"
                tag-list-label="🧸 Soft Skills"
                :tag-list="formSettings.softSkills"
                @addTag="addSkill($event)"
                @removeTag="removeSkill($event)"
              ></portfolio-input-tags>
              <portfolio-input-tags
                tag-list-name="languages"
                tag-list-label="🌎 Languages"
                :tag-list-lang="formSettings.languages"
                @addTag="addSkill($event)"
                @removeTag="removeSkill($event)"
              ></portfolio-input-tags>
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
            <portfolio-dynamic-section
              section-name="education"
              :entries="formSettings.education"
              @addEntry="onUpdateSection"
              @removeEntry="onUpdateSection"
            ></portfolio-dynamic-section>
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
            <portfolio-dynamic-section
              section-name="work"
              :entries="formSettings.work"
              @addEntry="onUpdateSection"
              @removeEntry="onUpdateSection"
            ></portfolio-dynamic-section>
          </template>
        </expansion-panel>
      </fieldset>
      <!-- WORK EXPERIENCE -->
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PortfolioSettings',
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
        education: {
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
    }
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
    @apply shadow rounded px-2 py-1 border border-transparent font-light w-full mb-1;
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
    @apply bg-purple-700 text-white p-2 rounded shadow font-light;
    transition: all 0.1s linear;
    &:hover {
      @apply bg-purple-800;
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

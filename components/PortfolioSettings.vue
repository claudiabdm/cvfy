<template>
  <div class="bg-gray-100 shadow py-4 px-6 font-bold">
    <h2 class="text-2xl mb-3 tracking-wide">Portfolio Settings</h2>
    <form class="form">
      <!-- PERSONAL DETAILS -->
      <fieldset class="form__section">
        <legend class="form__legend">Personal Details</legend>
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
            <label class="form__label" for="first-name">👤 First Name</label>
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
      </fieldset>
      <!-- PERSONAL DETAILS -->

      <!-- Skills -->
      <fieldset class="form__section">
        <legend class="form__legend">Skills</legend>
        <div class="form__group">
          <label class="form__label" for="jobSkills">🛠 Technical Skills</label>
          <div class="flex gap-3">
            <input
              id="jobSkills"
              v-model="jobSkill"
              class="form__control"
              type="text"
              @keyup.enter="addSkill(jobSkill, 'jobSkills')"
            />
            <button
              class="form__btn"
              type="button"
              @click="addSkill(jobSkill, 'jobSkills')"
            >
              Add
            </button>
          </div>
          <ul class="form__skills">
            <li
              v-for="skill in formSettings.jobSkills"
              :key="skill"
              class="form__btn form__btn--tag"
            >
              {{ skill }}
              <button type="button" @click="removeSkill(skill, 'jobSkills')">
                <svg class="form__icon">
                  <use href="@/assets/sprite.svg#close"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </fieldset>
      <!-- Skills -->
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
      },
      default: {
        jobTtitle: '',
        name: '',
        lastName: '',
        email: '',
        location: '',
        phoneNumber: '',
        aboutme: '',
        jobSkills: [],
      },
    },
  },
  data() {
    return {
      jobSkill: '',
    }
  },
  methods: {
    addSkill(skill: string, skillType: string): void {
      this.$emit('addSkill', { skill, skillType })
      this.jobSkill = ''
    },
    removeSkill(skill: string, skillType: string): void {
      this.$emit('removeSkill', { skill, skillType })
    },
  },
})
</script>
<style lang="postcss" scoped>
.form {
  @apply font-light;

  &__section {
    @apply mb-3;
  }

  &__legend {
    @apply text-lg font-normal mb-3 font-bold tracking-wide;
  }
  &__group {
    @apply flex flex-col;
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
      @apply flex gap-2;
      align-items: center;
      &:hover {
        @appy bg-purple-700;
      }
    }
  }

  &__skills {
    @apply flex flex-wrap gap-3 mt-3;
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

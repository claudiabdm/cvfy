<template>
  <div class="grid grid-cols-3 h-full">
    <portfolio-settings
      id="settings"
      :form-settings="formSettings"
      class="col-span-1"
      @addSkill="onAddSkill($event)"
      @removeSkill="onRemoveSkill($event)"
    ></portfolio-settings>
    <portfolio-preview
      id="portfolio"
      :form-settings="formSettings"
      class="col-span-2"
    ></portfolio-preview>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      formSettings: {
        jobTitle: 'Front End Developer',
        name: 'Claudia',
        lastName: 'Benito',
        email: 'claudiabdm@hotmail.es',
        location: 'Madrid, Spain',
        phoneNumber: '+34 692662091',
        aboutme: 'Soy clauduuauu',
        jobSkills: ['Nuxt.js'],
        softSkills: ['Teamwork'],
      },
    }
  },
  methods: {
    onAddSkill(e: {
      skill: string
      skillType: 'jobSkills' | 'softSkills'
    }): void {
      this.formSettings[e.skillType] = [
        ...new Set([...this.formSettings[e.skillType], e.skill]),
      ]
    },
    onRemoveSkill(e: {
      skill: string
      skillType: 'jobSkills' | 'softSkills'
    }): void {
      this.formSettings[e.skillType] = [
        ...this.formSettings[e.skillType].filter((skill) => skill !== e.skill),
      ]
    },
  },
})
</script>

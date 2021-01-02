<template>
  <div class="flex bg-gray-50 h-full">
    <portfolio-settings
      id="settings"
      :form-settings="formSettings"
      class="overflow-y-auto w-4/12"
      @addSkill="onAddSkill"
      @removeSkill="onRemoveSkill"
      @updateSection="onUpdateSection"
      @uploadCv="onUploadCv"
    ></portfolio-settings>
    <portfolio-preview :form-settings="formSettings"></portfolio-preview>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      formSettings: {
        jobTitle: 'Junio Front-End Developer',
        name: 'Claudia',
        lastName: 'Benito',
        email: 'claudiabdm@hotmail.es',
        location: 'Madrid, Spain',
        phoneNumber: '+34 692662091',
        aboutme: 'Soy clauduuauu',
        jobSkills: ['Nuxt.js'],
        softSkills: ['Teamwork'],
        languages: [
          { lang: 'Spanish', level: '100%' },
          { lang: 'English', level: '80%' },
          { lang: 'Japanese', level: '20%' },
        ],
        linkedin: 'claudiabdm',
        twitter: 'claudiabdm',
        github: 'claudiabdm',
        website: '',
        education: [
          {
            title: "Bachelor's Degree in Biology",
            location: 'Madrid, Spain',
            from: new Date(),
            to: new Date(),
            current: false,
            summary:
              'Erasmus internship at University of Birmingham for 9 months in my final year.',
          },
        ],
        work: [
          {
            title: 'Junior Front-end Developer',
            location: 'Madrid, Spain',
            from: new Date(),
            to: new Date(),
            current: false,
            summary:
              'Erasmus internship at University of Birmingham for 9 months in my final year.',
          },
        ],
      },
    }
  },
  methods: {
    onAddSkill(e: {
      skill: string | { lang: string; level: string }
      skillType: 'jobSkills' | 'softSkills' | 'languages'
    }): void {
      if (e.skillType === 'languages') {
        const newLang = e.skill as { lang: string; level: string }
        const newLangIdx = this.formSettings.languages.findIndex(
          (lang) => lang.lang === newLang.lang
        )
        if (newLangIdx < 0) {
          this.formSettings.languages = [
            ...new Set([...this.formSettings[e.skillType], e.skill]),
          ] as { lang: string; level: string }[]
        }
      } else {
        this.formSettings[e.skillType] = [
          ...new Set([...this.formSettings[e.skillType], e.skill]),
        ] as string[]
      }
    },
    onRemoveSkill(e: {
      skill: string
      skillType: 'jobSkills' | 'softSkills'
    }): void {
      this.formSettings[e.skillType] = [
        ...this.formSettings[e.skillType].filter((skill) => skill !== e.skill),
      ]
    },
    onUpdateSection(e: {
      eventType: 'addEntry' | 'removeEntry'
      sectionName: 'education' | 'work'
      entry: {
        title: string
        location: string
        from: Date
        to: Date
        current: boolean
        summary: string
      }
    }): void {
      if (e.eventType === 'addEntry') {
        this.formSettings[e.sectionName].push(e.entry)
      } else {
        this.formSettings[e.sectionName] = this.formSettings[
          e.sectionName
        ].filter((entry) => entry.title !== e.entry.title)
      }
    },
    onUploadCv(e: any) {
      this.formSettings = { ...e.formSettings }
    },
  },
})
</script>

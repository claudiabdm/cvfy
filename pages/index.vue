<template>
  <div class="portfolio grid grid-cols-3 h-full">
    <portfolio-settings
      id="settings"
      :form-settings="formSettings"
      class="portfolio__settings col-span-1 overflow-y-auto"
      @addSkill="onAddSkill"
      @removeSkill="onRemoveSkill"
      @updateSection="onUpdateSection"
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
        languages: [
          { lang: 'Spanish', level: 'Native' },
          { lang: 'English', level: 'C1' },
          { lang: 'Japanese', level: 'A2' },
        ],
        linkedin: 'https://www.linkedin.com/in/claudiabdm/',
        twitter: 'https://twitter.com/claudiabdm',
        github: 'https://github.com/claudiabdm',
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
  },
})
</script>
<style lang="postcss" scoped>
.portfolio {
  grid-template-columns: 20rem 1fr 1fr;
}
</style>

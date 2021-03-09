<template>
  <div class="main">
    <cv-settings
      id="settings"
      :form-settings="formSettings"
      class="settings"
      @add-skill="onAddSkill"
      @remove-skill="onRemoveSkill"
      @update-section="onUpdateSection"
      @upload-cv="onUploadCv"
      @reset-form="onResetForm"
    ></cv-settings>
    <cv-preview
      :form-settings="formSettings"
      :class="[{ blur: isLoading }]"
    ></cv-preview>
  </div>
</template>

<script lang="ts">
import { NuxtOptionsHead } from '@nuxt/types/config/head';
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      isLoading: true,
      formSettings: {
        jobTitle: 'Deputy Director Parks Department',
        name: 'Leslie',
        lastName: 'Knope',
        email: 'lknope@parksdept.com',
        location: 'Pawnee, Indiana',
        phoneNumber: '317-660-2160',
        aboutme:
          "My name is Leslie Knope. I am a passionate, over-achieving government employee who believes the government's #1 job is serving the people. By pairing the right people with the right messaging at the right time, the parks department and your local government can make the world a better place for everyone! I have met Joe Biden, and one day I will become the first female President of the United States.",
        jobSkills: ['Microsoft', 'Word', 'Excel', 'PerfectMind'],
        softSkills: ['Positivity', 'Leadership', 'Public Speaking'],
        languages: [{ lang: 'English', level: '100%' }],
        linkedin: '',
        twitter: '',
        github: '',
        website: 'www.MsKnope.com',
        education: [
          {
            title: 'A Environmental and Public Affairs',
            location: 'Indiana University, Bloomington, Indiana',
            from: new Date('1993-09-01'),
            to: new Date('1993-04-01'),
            current: false,
            summary: 'Summa cum Laude',
          },
        ],
        work: [
          {
            title: 'Deputy Director Parks Department',
            location: 'City of Pawnee, Indiana',
            from: new Date('2009-01-01'),
            to: new Date('2012-01-01'),
            current: true,
            summary: `- Sed ut lorem viverra urna malesuada interdum in ut risus.
- Duis at sem non justo aliquam iaculis.
- Quisque lobortis nibh non turpis interdum ornare.
- Sed et diam nec arcu tempor suscipit sit amet at tellus.
- Duis quis diam imperdiet, pharetra lacus eget, fringilla odio.`,
          },
          {
            title: 'City Councilor',
            location: 'City of Pawnee, Indiana',
            from: new Date('2012-01-01'),
            to: new Date(),
            current: true,
            summary: `- In placerat nisi pellentesque felis blandit, vel varius justo eleifend.
- Etiam porttitor tortor vel lobortis ultricies.
- Nam non libero accumsan, sagittis nibh vitae, auctor ligula.
- Sed hendrerit dui a ante porttitor, vitae tristique ipsum laoreet.
- Suspendisse interdum mauris a lectus dignissim, vitae aliquet ante tempor.`,
          },
        ],
      },
    };
  },
  watch: {
    formSettings: {
      // eslint-disable-next-line object-shorthand
      handler: function (updated, _) {
        localStorage.setItem(
          `cvSettings-${this.$i18n.locale}`,
          JSON.stringify(updated)
        );
      },
      deep: true,
    },
  },
  mounted() {
    if (process.browser) {
      const cvEs = localStorage.getItem('cvSettings-es') || '{}';
      const cvEn = localStorage.getItem('cvSettings-en') || '{}';
      const isCvEsEmpty = this.isCvSettingsFromLocalStorageEmpty(
        JSON.parse(cvEs)
      );
      const isCvEnEmpty = this.isCvSettingsFromLocalStorageEmpty(
        JSON.parse(cvEn)
      );
      if (this.$i18n.locale.includes('es') && !isCvEsEmpty) {
        this.formSettings = JSON.parse(cvEs);
      }
      if (this.$i18n.locale.includes('en') && !isCvEnEmpty) {
        this.formSettings = JSON.parse(cvEn);
      }
      if (this.$i18n.locale.includes('es') && isCvEsEmpty && !isCvEnEmpty) {
        this.formSettings = JSON.parse(cvEn);
        localStorage.setItem('cvSettings-es', cvEn);
      }
      if (this.$i18n.locale.includes('en') && isCvEnEmpty && !isCvEsEmpty) {
        this.formSettings = JSON.parse(cvEs);
        localStorage.setItem('cvSettings-en', cvEs);
      }
      this.isLoading = false;
    }
  },
  methods: {
    onAddSkill(e: {
      skill: string | { lang: string; level: string };
      skillType: 'jobSkills' | 'softSkills' | 'languages';
    }): void {
      if (e.skillType === 'languages') {
        const newLang = e.skill as { lang: string; level: string };
        const newLangIdx = this.formSettings.languages.findIndex(
          (lang) => lang.lang === newLang.lang
        );
        if (newLangIdx < 0) {
          this.formSettings.languages = [
            ...new Set([...this.formSettings[e.skillType], e.skill]),
          ] as { lang: string; level: string }[];
        }
      } else {
        this.formSettings[e.skillType] = [
          ...new Set([...this.formSettings[e.skillType], e.skill]),
        ] as string[];
      }
    },
    onRemoveSkill(e: {
      skill: string;
      skillType: 'jobSkills' | 'softSkills';
    }): void {
      this.formSettings[e.skillType] = [
        ...this.formSettings[e.skillType].filter((skill) => skill !== e.skill),
      ];
    },
    onUpdateSection(e: {
      eventType: 'addEntry' | 'removeEntry';
      sectionName: 'education' | 'work';
      entry: {
        title: string;
        location: string;
        from: Date;
        to: Date;
        current: boolean;
        summary: string;
      };
    }): void {
      if (e.eventType === 'addEntry') {
        this.formSettings[e.sectionName].push(e.entry);
      } else {
        this.formSettings[e.sectionName] = this.formSettings[
          e.sectionName
        ].filter((entry) => entry.title !== e.entry.title);
      }
    },
    onUploadCv(e: any) {
      this.formSettings = { ...e.formSettings };
    },
    onResetForm(): void {
      this.formSettings = {
        jobTitle: '',
        name: '',
        lastName: '',
        email: '',
        location: '',
        phoneNumber: '',
        aboutme: '',
        jobSkills: [],
        softSkills: [],
        languages: [],
        linkedin: '',
        twitter: '',
        github: '',
        website: '',
        education: [],
        work: [],
      };
      localStorage.removeItem('cvSettings-es');
      localStorage.removeItem('cvSettings-en');
    },
    isCvSettingsFromLocalStorageEmpty(item: any): boolean {
      if (!item || Object.keys(item).length < 1) return true;
      return Object.keys(item).every(
        (key) => item[key] === '' || item[key].length < 1
      );
    },
  },
  head(): NuxtOptionsHead {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      title: this.$t('title-tag') as string,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('description') as string,
        },
        {
          name: 'description',
          content: this.$t('description') as string,
        },
        {
          name: 'author',
          content: 'claudiabdm',
        },
        {
          name: 'keywords',
          content:
            'cv, curriculum, resume, curriculum vitae, cv maker, cv generator, nuxt, vue, tailwindcss',
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@claudiabdm',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.$t('title-tag') as string,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.$t('description') as string,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content:
            'https://repository-images.githubusercontent.com/315020727/e23c6200-8110-11eb-87b8-e9e5757bd827',
        },
      ],
    };
  },
});
</script>
<style lang="postcss" scoped>
@media screen and (min-width: 1024px) {
  .main {
    @apply flex h-full;
  }
  .settings {
    @apply overflow-y-auto w-5/12;
  }
  .blur {
    filter: blur(5px);
  }
}
</style>

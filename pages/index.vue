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
      @display-section-changed="onDisplayChanged"
    ></cv-settings>
    <cv-preview
      :form-settings="formSettings"
      :is-loading="isLoading"
    ></cv-preview>
  </div>
</template>

<script lang="ts">
import { NuxtOptionsHead } from '@nuxt/types/config/head';
import Vue from 'vue';
import {
  cvSettingTemplate,
  cvSettingsEmptyTemplate,
} from '@/data/example-cv-settings';
import CvSettings from '@/components/CvSettings.vue';
import CvPreview from '@/components/CvPreview.vue';

export default Vue.extend({
  name: 'Index',
  components: { CvSettings, CvPreview },
  data() {
    return {
      isLoading: true,
      formSettings: cvSettingTemplate,
    };
  },
  watch: {
    formSettings: {
      handler(updated, _) {
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
      this.setUpCvSettings();
    }
  },
  methods: {
    setUpCvSettings(): void {
      const cvEs = localStorage.getItem('cvSettings-es') || '{}';
      const cvEn = localStorage.getItem('cvSettings-en') || '{}';
      const isCvEsEmpty = this.isCvSettingsFromLocalStorageEmpty(
        JSON.parse(cvEs)
      );
      const isCvEnEmpty = this.isCvSettingsFromLocalStorageEmpty(
        JSON.parse(cvEn)
      );
      if (isCvEsEmpty && isCvEnEmpty) {
        this.formSettings = { ...cvSettingTemplate };
      }
      if (this.$i18n.locale.includes('es') && !isCvEsEmpty) {
        this.formSettings = {
          ...cvSettingsEmptyTemplate,
          ...JSON.parse(cvEs),
        };
      }
      if (this.$i18n.locale.includes('en') && !isCvEnEmpty) {
        this.formSettings = {
          ...cvSettingsEmptyTemplate,
          ...JSON.parse(cvEn),
        };
      }
      if (this.$i18n.locale.includes('es') && isCvEsEmpty && !isCvEnEmpty) {
        this.formSettings = {
          ...cvSettingsEmptyTemplate,
          ...JSON.parse(cvEn),
        };
        localStorage.setItem(
          'cvSettings-es',
          JSON.stringify(this.formSettings)
        );
      }
      if (this.$i18n.locale.includes('en') && isCvEnEmpty && !isCvEsEmpty) {
        this.formSettings = {
          ...cvSettingsEmptyTemplate,
          ...JSON.parse(cvEs),
        };
        localStorage.setItem(
          'cvSettings-en',
          JSON.stringify(this.formSettings)
        );
      }
      this.isLoading = false;
    },
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
      this.formSettings = { ...cvSettingsEmptyTemplate, ...e.formSettings };
    },
    onResetForm(): void {
      this.formSettings = cvSettingsEmptyTemplate;
      localStorage.removeItem('cvSettings-es');
      localStorage.removeItem('cvSettings-en');
    },
    onDisplayChanged(e: { sectionName: string; status: boolean }): void {
      const propName = `display${e.sectionName
        .slice(0, 1)
        .toUpperCase()}${e.sectionName.slice(1)}` as
        | 'displayEducation'
        | 'displayProjects';
      this.formSettings[propName] = e.status;
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
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://repository-images.githubusercontent.com/315020727/e23c6200-8110-11eb-87b8-e9e5757bd827',
        },
        {
          hid: 'og:author',
          property: 'og:author',
          content: 'Claudia Benito',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('title-tag') as string,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('description') as string,
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
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.$t('description') as string,
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
}
</style>

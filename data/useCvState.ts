import { useContext } from '@nuxtjs/composition-api';
import { reactive, toRefs } from '@vue/composition-api';
import {
  cvSettingsEmptyTemplate,
  cvSettingTemplate,
} from './example-cv-settings';
import { Cv, CvEvent, defaultSkill, languagesSkill } from '~/types/cvfy';

const state = reactive({
  formSettings: { ...cvSettingTemplate } as Cv,
  isLoading: true,
});

function isCvSettingsFromLocalStorageEmpty(item: any): boolean {
  if (!item || Object.keys(item).length < 1) return true;
  return Object.keys(item).every(
    (key) => item[key] === '' || item[key].length < 1
  );
}

export function useCvState() {
  const context = useContext();

  function setUpCvSettings(): void {
    const cvEs = localStorage.getItem('cvSettings-es') || '{}';
    const cvEn = localStorage.getItem('cvSettings-en') || '{}';
    const isCvEsEmpty = isCvSettingsFromLocalStorageEmpty(JSON.parse(cvEs));
    const isCvEnEmpty = isCvSettingsFromLocalStorageEmpty(JSON.parse(cvEn));
    if (isCvEsEmpty && isCvEnEmpty) {
      state.formSettings = { ...cvSettingTemplate };
    }
    if (context.app.i18n.locale.includes('es') && !isCvEsEmpty) {
      state.formSettings = {
        ...cvSettingsEmptyTemplate,
        ...JSON.parse(cvEs),
      };
    }
    if (context.app.i18n.locale.includes('en') && !isCvEnEmpty) {
      state.formSettings = {
        ...cvSettingsEmptyTemplate,
        ...JSON.parse(cvEn),
      };
    }
    if (context.app.i18n.locale.includes('es') && isCvEsEmpty && !isCvEnEmpty) {
      state.formSettings = {
        ...cvSettingsEmptyTemplate,
        ...JSON.parse(cvEn),
      };
      localStorage.setItem('cvSettings-es', JSON.stringify(state.formSettings));
    }
    if (context.app.i18n.locale.includes('en') && isCvEnEmpty && !isCvEsEmpty) {
      state.formSettings = {
        ...cvSettingsEmptyTemplate,
        ...JSON.parse(cvEs),
      };
      localStorage.setItem('cvSettings-en', JSON.stringify(state.formSettings));
    }
    state.isLoading = false;
  }

  function addSkill(e: languagesSkill | defaultSkill): void {
    if (e.skillType === 'languages') {
      if (e.skill.lang.trim() === '') return;
      const newLang = e.skill;
      const newLangIdx = state.formSettings.languages.findIndex(
        (lang) => lang.lang === newLang.lang
      );
      if (newLangIdx < 0) {
        state.formSettings.languages = [
          ...new Set([
            ...state.formSettings.languages,
            { lang: e.skill.lang, level: `${e.skill.level}%` },
          ]),
        ];
      }
    } else {
      if (e.skill.trim() === '') return;
      state.formSettings[e.skillType] = [
        ...new Set([...state.formSettings[e.skillType], e.skill]),
      ];
    }
  }

  function removeSkill(e: languagesSkill | defaultSkill): void {
    if (e.skillType === 'languages') {
      state.formSettings[e.skillType] = [
        ...state.formSettings[e.skillType].filter(
          (skill) => skill.lang !== e.skill.lang
        ),
      ];
    } else {
      state.formSettings[e.skillType] = [
        ...state.formSettings[e.skillType].filter((skill) => skill !== e.skill),
      ];
    }
  }

  function addEntry(e: { sectionName: 'education' | 'work' }) {
    state.formSettings[e.sectionName].push({
      title: '',
      location: '',
      from: new Date(),
      to: new Date(),
      current: false,
      summary: '',
    });
  }

  function removeEntry(e: {
    sectionName: 'education' | 'work';
    entry: CvEvent;
  }) {
    state.formSettings[e.sectionName] = state.formSettings[
      e.sectionName
    ].filter((entry) => entry.title !== e.entry.title);
  }

  function uploadCV(e: any): void {
    const fr = new FileReader();
    fr.onload = (e: any) => {
      const data = JSON.parse(e.target.result);
      state.formSettings = {
        ...cvSettingsEmptyTemplate,
        ...data.formSettings,
      };
    };
    fr.readAsText(e.target.files[0]);
  }

  function resetForm(): void {
    state.formSettings = cvSettingsEmptyTemplate;
    localStorage.removeItem('cvSettings-es');
    localStorage.removeItem('cvSettings-en');
  }

  function changeDisplaySection(e: {
    sectionName: string;
    status: boolean;
  }): void {
    const propName = `display${e.sectionName
      .slice(0, 1)
      .toUpperCase()}${e.sectionName.slice(1)}` as
      | 'displayEducation'
      | 'displayProjects';
    state.formSettings[propName] = e.status;
  }

  return {
    ...toRefs(state),
    setUpCvSettings,
    addSkill,
    removeSkill,
    addEntry,
    removeEntry,
    uploadCV,
    resetForm,
    changeDisplaySection,
  };
}

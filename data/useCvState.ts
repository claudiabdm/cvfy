import { useContext, reactive, toRefs } from '@nuxtjs/composition-api';
import {
  cvSettingsEmptyTemplate,
  cvSettingTemplate,
} from './example-cv-settings';
import { Cv, CvEvent, DefaultSkill, LanguagesSkill } from '~/types/cvfy';

const state = reactive({
  formSettings: { ...cvSettingsEmptyTemplate } as Cv,
  isLoading: true,
  profileImageData: null,
});

export function useCvState() {
  const context = useContext();

  function setUpCvSettings(): void {
    const locale = `cvSettings-${context.i18n.locale}`;
    const cvSettings = localStorage.getItem(locale);

    if (cvSettings == null) {
      state.formSettings = {
        ...cvSettingTemplate,
      };
    } else {
      const cvSettingsObj = JSON.parse(cvSettings);
      state.formSettings = { ...cvSettingsEmptyTemplate, ...cvSettingsObj };
    }
    localStorage.setItem(locale, JSON.stringify(state.formSettings));
    state.isLoading = false;
  }

  function addSkill(e: LanguagesSkill | DefaultSkill): void {
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
            { lang: e.skill.lang, level: e.skill.level },
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

  function removeSkill(e: LanguagesSkill | DefaultSkill): void {
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

  function uploadProfileImage(e: any): void {
    const fr = new FileReader();
    fr.onload = (e: any) => {
      state.profileImageData = e.target.result;
    };
    fr.readAsDataURL(e.target.files[0]);
  }

  function clearProfileImage(): void {
    state.profileImageData = null;
  }

  function resetForm(): void {
    state.formSettings = {
      ...cvSettingTemplate,
    };
    localStorage.setItem(
      `cvSettings-${context.i18n.locale}`,
      JSON.stringify(state.formSettings)
    );
  }

  function clearForm(): void {
    state.formSettings = cvSettingsEmptyTemplate;
    localStorage.removeItem(`cvSettings-${context.i18n.locale}`);
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
    uploadProfileImage,
    clearProfileImage,
    resetForm,
    clearForm,
    changeDisplaySection,
  };
}

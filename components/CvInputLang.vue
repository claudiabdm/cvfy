<template>
  <div class="flex w-full gap-3">
    <input id="languages" v-model.trim="tagInputLang.lang" class="form__control mt-2 mb-1" type="text"
      placeholder="Spanish" @keyup.enter="updateSkill" />
    <select id="level" v-model="tagInputLang.level" name="level" class="form__control mt-2 mb-1" type="selet"
      @keyup.enter="updateSkill">
      <option v-for="level in LEVELS" :key="level" :value="level">
        {{ $t(level) }}
      </option>
    </select>
    <button class="form__btn" type="button" :disabled="tagInputLangEmpty" :aria-disabled="tagInputLangEmpty"
      aria-live="assertive" @click="updateSkill">
      {{ $t('add') }}
    </button>
  </div>
</template>
<script lang="ts">
import { reactive, computed, toRefs } from 'vue';
import { defineComponent } from 'vue';
import { useCvState } from '~/data/useCvState';
import { type Level, LEVELS } from '~/types/cvfy';

export default defineComponent({
  name: 'CvInputLang',
  props: {
    tagListName: {
      type: String,
      default: '',
    },
  },
  setup() {
    const state = reactive({
      tagInputLang: { lang: '', level: '' as Level },
    });

    const { addSkill, removeSkill } = useCvState();

    const tagInputLangEmpty = computed(function getTagInputLangEmpty() {
      return (
        state.tagInputLang.lang === '' || state.tagInputLang.level === LEVELS[0]
      );
    });

    function cleanInput(): void {
      state.tagInputLang.lang = '';
    }

    function updateSkill() {
      addSkill({ skill: state.tagInputLang, skillType: 'languages' });
      cleanInput();
    }

    return {
      ...toRefs(state),
      LEVELS,
      tagInputLangEmpty,
      cleanInput,
      updateSkill,
      removeSkill,
    };
  },
});
</script>

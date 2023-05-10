<template>
  <div class="form__group mb-10">
    <label class="form__label" :for="tagListName">{{ tagListLabel }}</label>
    <div class="flex gap-3">
      <template v-if="tagListName === 'languages'">
        <cv-input-lang />
      </template>

      <template v-else>
        <input
          :id="tagListName"
          v-model="tagInput"
          class="form__control mt-2 mb-1"
          type="text"
          @keyup.enter="updateSkill"
        />
        <button
          class="form__btn"
          type="button"
          :disabled="tagInputEmpty"
          :aria-disabled="tagInputEmpty"
          aria-live="assertive"
          @click="updateSkill"
        >
          {{ $t('add') }}
        </button>
      </template>
    </div>
    <ul class="tags">
      <template v-if="tagListName === 'languages'">
        <li
          v-for="tag in tagListLang"
          :key="tag.lang"
          class="form__btn form__btn--tag"
        >
          {{ tag.lang }}: {{ $t(tag.level) }}
          <button
            type="button"
            @click="removeSkill({ skill: tag, skillType: tagListName })"
          >
            <svg class="form__icon">
              <use href="@/assets/sprite.svg#close"></use>
            </svg>
          </button>
        </li>
      </template>
      <template v-else>
        <li v-for="tag in tagList" :key="tag" class="form__btn form__btn--tag">
          {{ tag }}
          <button
            type="button"
            @click="removeSkill({ skill: tag, skillType: tagListName })"
          >
            <svg class="form__icon">
              <use href="@/assets/sprite.svg#close"></use>
            </svg>
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, PropType, reactive, toRefs } from '@nuxtjs/composition-api';
import Vue from 'vue';
import CvInputLang from './CvInputLang.vue';
import { useCvState } from '~/data/useCvState';
import { DefaultSkill } from '~/types/cvfy';
export default Vue.extend({
  name: 'CvInputTags',
  components: { CvInputLang },
  props: {
    tagListName: {
      type: String as PropType<DefaultSkill['skillType']>,
      default: '',
    },
    tagList: {
      type: Array as () => string[],
      default: () => [''],
    },
    tagListLang: {
      type: Array as () => { lang: string; level: string }[],
      default: () => [{ lang: '', level: '' }],
    },
    tagListLabel: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const state = reactive({
      tagInput: '',
    });

    const { addSkill, removeSkill } = useCvState();

    const tagInputEmpty = computed(function getTagInputEmpty() {
      return state.tagInput === '';
    });

    function cleanInput(): void {
      state.tagInput = '';
    }

    function updateSkill() {
      addSkill({
        skill: state.tagInput,
        skillType: props.tagListName as DefaultSkill['skillType'],
      });
      cleanInput();
    }

    return {
      ...toRefs(state),
      tagInputEmpty,
      updateSkill,
      removeSkill,
    };
  },
});
</script>
<style lang="postcss" scoped>
.tags {
  @apply flex flex-wrap gap-3 mt-3 text-xs justify-start w-full;
}

.percentage {
  position: absolute;
  top: 0.5rem;
  right: 25%;
}
</style>

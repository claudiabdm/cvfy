<template>
  <div class="form__group mb-10">
    <label class="form__label" :for="tagListName">{{ tagListLabel }}</label>
    <div class="flex gap-3">
      <template v-if="tagListName === 'languages'">
        <div class="grid grid-cols-2 gap-3">
          <input
            id="languages"
            v-model="tagInputLang.lang"
            class="form__control mt-2 mb-1"
            type="text"
            placeholder="Spanish"
            @keyup.enter="addTag(tagInputLang, tagListName)"
          />
          <div class="flex relative">
            <input
              id="level"
              v-model="tagInputLang.level"
              class="form__control mt-2 mb-1"
              type="number"
              min="0"
              max="100"
              step="10"
              placeholder="80"
              @keyup.enter="addTag(tagInputLang, tagListName)"
            />
            <span class="percentage top-1 mt-2 mb-1">%</span>
          </div>
        </div>
        <button
          class="form__btn"
          type="button"
          :disabled="tagInputLangEmpty"
          :aria-disabled="tagInputLangEmpty"
          aria-live="assertive"
          @click="addTag(tagInputLang, tagListName)"
        >
          {{ $t('add') }}
        </button>
      </template>

      <template v-else>
        <input
          :id="tagListName"
          v-model="tagInput"
          class="form__control mt-2 mb-1"
          type="text"
          @keyup.enter="addTag(tagInput, tagListName)"
        />
        <button
          class="form__btn"
          type="button"
          :disabled="tagInputEmpty"
          :aria-disabled="tagInputEmpty"
          aria-live="assertive"
          @click="addTag(tagInput, tagListName)"
        >
          {{ $t('add') }}
        </button>
      </template>
    </div>
    <ul class="tags">
      <template v-if="tagListName !== 'languages'">
        <li v-for="tag in tagList" :key="tag" class="form__btn form__btn--tag">
          {{ tag }}
          <button type="button" @click="removeTag(tag, tagListName)">
            <svg class="form__icon">
              <use href="@/assets/sprite.svg#close"></use>
            </svg>
          </button>
        </li>
      </template>
      <template v-else>
        <li
          v-for="tag in tagListLang"
          :key="tag.lang"
          class="form__btn form__btn--tag"
        >
          {{ tag.lang }}: {{ tag.level }}
          <button type="button" @click="removeTag(tag, tagListName)">
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
import Vue from 'vue';
export default Vue.extend({
  name: 'CvInputTags',
  props: {
    tagListName: {
      type: String,
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
  data() {
    return {
      tagInput: '',
      tagInputLang: { lang: '', level: '' },
    };
  },
  computed: {
    tagInputLangEmpty(): boolean {
      return this.tagInputLang.lang === '' || this.tagInputLang.level === '';
    },
    tagInputEmpty(): boolean {
      return this.tagInput === '';
    },
  },
  methods: {
    addTag(
      tag: string | { lang: string; level: string },
      tagType: string
    ): void {
      if (typeof tag !== 'string') {
        tag.level = `${tag.level}%`;
      }
      this.$emit('addTag', { tag, tagType });
      this.tagInput = '';
      this.tagInputLang = { lang: '', level: '' };
    },
    removeTag(
      tag: string | { lang: string; level: string },
      tagType: string
    ): void {
      this.$emit('removeTag', { tag, tagType });
    },
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

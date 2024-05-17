<script lang="ts" setup>
import { computed } from 'vue'
import { useCvState } from '~/data/useCvState'
import { LEVELS, type Level } from '~/types/cvfy'

const tagInputLang = ref({ lang: '', level: '' as Level })

const { addSkill } = useCvState()

const tagInputLangEmpty = computed(() => {
  return tagInputLang.value.lang === ''
})

function cleanInput(): void {
  tagInputLang.value.lang = ''
}

function updateSkill() {
  addSkill({ skill: tagInputLang.value, skillType: 'languages' })
  cleanInput()
}
</script>

<template>
  <div class="flex w-full gap-3">
    <input
      id="languages"
      v-model.trim="tagInputLang.lang"
      class="form__control mt-2 mb-1"
      type="text"
      placeholder="Spanish"
      @keyup.enter="updateSkill"
    >
    <select
      id="level"
      v-model="tagInputLang.level"
      name="level"
      class="form__control mt-2 mb-1"
      aria-label="Language level"
    >
      <option
        v-for="level in LEVELS"
        :key="level"
        :value="level"
      >
        {{ $t(level) }}
      </option>
    </select>
    <button
      class="form__btn"
      type="button"
      :disabled="tagInputLangEmpty"
      :aria-disabled="tagInputLangEmpty"
      aria-live="assertive"
      @click="updateSkill"
    >
      {{ $t("add") }}
    </button>
  </div>
</template>

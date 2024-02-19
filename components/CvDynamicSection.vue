<template>
  <div class="dynamic-section">
    <button class="form__btn col-span-full" type="button" @click="addEntry({ sectionName })">
      {{ $t('add') }} {{ $t(sectionName) }}
    </button>
    <ul class="col-span-full">
      <li v-for="(entry, index) in entries" :key="index">
        <expansion-panel :panel-name="`${entry.title}`" class="mb-3">
          <template v-slot:title>
            <h3 class="form__legend form__legend--small dynamic-section__title">
              <span>
                {{ entry.title }}
              </span>
            </h3>
          </template>
          <template v-slot:action-button>
            <button :aria-label="`Remove ${entry.title} ${$t(sectionName)} from CV`" type="button"
              class="form__btn form__btn--delete mr-3" @click.stop="removeEntry({ sectionName, entry })">
              <svg class="form__icon">
                <use href="@/assets/sprite.svg#trash"></use>
              </svg>
            </button>
          </template>
          <template v-slot:content>
            <div class="dynamic-section">
              <div class="form__group col-span-full">
                <label class="form__label" :for="`entryTitle--${entry.title}`">
                  <template v-if="sectionName === 'education'">🎓</template>
                  <template v-else-if="sectionName === 'projects'">✨</template>
                  <template v-else>💼</template>
                  {{ $t('title') }}
                </label>
                <input :id="`entryTitle--${entry.title}`" v-model="entry.title" class="form__control" type="text" />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label" :for="`entryLocation-${entry.title}`">📍 {{ $t('location') }}</label>
                <input :id="`entryLocation-${entry.title}`" v-model="entry.location" class="form__control" type="text" />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label" :for="`entryFrom-${entry.title}`">📆 {{ $t('from') }}</label>
                <input :id="`entryFrom-${entry.title}`" v-model="entry.from" class="form__control" type="date" />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label flex justify-between" :for="`entryTo-${entry.title}`">
                  📆 {{ $t('to') }}
                  <label class="form__label flex items-center">
                    <input v-model="entry.current" class="form__control form__control--checkbox" type="checkbox" />
                    {{ $t('current') }}
                  </label>
                </label>
                <input v-if="!entry.current" :id="`entryTo-${entry.title}`" v-model="entry.to" class="form__control"
                  type="date" />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label" :for="`entrySummary-${entry.title}`">📝 {{ $t('summary') }}</label>
                <textarea :id="`entrySummary-${entry.title}`" v-model="entry.summary" class="form__control"
                  name="entrySummary" cols="30" rows="10"></textarea>
              </div>
            </div>
          </template>
        </expansion-panel>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { CvEvent, SectionName } from '~/types/cvfy';
import ExpansionPanel from '~/components/ExpansionPanel.vue';
import { useCvState } from '~/data/useCvState';
export default defineComponent({
  name: 'CvDynamicEntry',
  components: { ExpansionPanel },
  props: {
    sectionName: {
      type: String as () => SectionName,
      default: 'Section name',
    },
    entries: {
      type: Array as () => CvEvent[],
      default: () => {
        return [];
      },
    },
  },
  setup() {
    const { addEntry, removeEntry } = useCvState();

    return {
      addEntry,
      removeEntry,
    };
  },
});
</script>
<style lang="postcss" scoped>
.dynamic-section {
  @apply grid grid-cols-2 gap-x-3 gap-y-4;

  &__title {
    @apply flex items-center flex-row-reverse;
  }
}
</style>

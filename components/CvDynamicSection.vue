<template>
  <div class="grid grid-cols-2 gap-x-3 gap-y-4">
    <button class="form__btn col-span-full" type="button" @click="addEntry">
      {{ $t('add') }} {{ $t(sectionName) }}
    </button>
    <ul class="col-span-full">
      <li v-for="(entryItem, index) in entries" :key="index">
        <expansion-panel class="mb-3">
          <template v-slot:title>
            <h3 class="form__legend form__legend--small flex items-center">
              <button
                type="button"
                class="form__btn form__btn--delete mr-3"
                @click.stop="removeEntry(entryItem)"
              >
                <svg class="form__icon">
                  <use href="@/assets/sprite.svg#trash"></use>
                </svg>
              </button>
              <span>
                {{ entryItem.title }}
              </span>
            </h3>
          </template>
          <template v-slot:content>
            <div class="grid grid-cols-2 gap-x-3 gap-y-4">
              <div class="form__group col-span-full">
                <label
                  class="form__label"
                  :for="`entryTitle--${entryItem.title}`"
                >
                  <template v-if="sectionName === 'education'">🎓</template>
                  <template v-else>💼</template>
                  {{ $t('title') }}
                </label>
                <input
                  :id="`entryTitle--${entryItem.title}`"
                  v-model="entryItem.title"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group col-span-full">
                <label
                  class="form__label"
                  :for="`entryLocation-${entryItem.title}`"
                  >📍 {{ $t('location') }}</label
                >
                <input
                  :id="`entryLocation-${entryItem.title}`"
                  v-model="entryItem.location"
                  class="form__control"
                  type="text"
                />
              </div>
              <div class="form__group col-span-full">
                <label class="form__label" :for="`entryFrom-${entryItem.title}`"
                  >📆 {{ $t('from') }}</label
                >
                <input
                  :id="`entryFrom-${entryItem.title}`"
                  v-model="entryItem.from"
                  class="form__control"
                  type="date"
                />
              </div>
              <div class="form__group col-span-full">
                <label
                  class="form__label flex justify-between"
                  :for="`entryTo-${entryItem.title}`"
                >
                  📆 {{ $t('to') }}
                  <label class="form__label flex items-center">
                    <input
                      v-model="entryItem.current"
                      class="form__control form__control--checkbox"
                      type="checkbox"
                    />
                    {{ $t('current') }}
                  </label>
                </label>
                <input
                  v-if="!entryItem.current"
                  :id="`entryTo-${entryItem.title}`"
                  v-model="entryItem.to"
                  class="form__control"
                  type="date"
                />
              </div>
              <div class="form__group col-span-full">
                <label
                  class="form__label"
                  :for="`entrySummary-${entryItem.title}`"
                  >📝 {{ $t('summary') }}</label
                >
                <textarea
                  :id="`entrySummary-${entryItem.title}`"
                  v-model="entryItem.summary"
                  class="form__control"
                  name="entrySummary"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
          </template>
        </expansion-panel>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CvDynamicEntry',
  props: {
    sectionName: {
      type: String,
      default: 'Section name',
    },
    entries: {
      type: Array as () => {
        title: string
        location: string
        from: Date
        to: Date
        current: boolean
        summary: string
      }[],
      default: [
        {
          title: '',
          location: '',
          from: new Date(),
          to: new Date(),
          current: false,
          summary: '',
        },
      ],
    },
  },
  methods: {
    addEntry(): void {
      const entry = {
        title: '',
        location: '',
        from: new Date(),
        to: new Date(),
        current: false,
        summary: '',
      }
      this.$emit('add-entry', {
        eventType: 'addEntry',
        entry,
        sectionName: this.sectionName,
      })
    },
    removeEntry(entry: {
      title: string
      location: string
      from: Date
      to: Date
      current: boolean
      summary: string
    }): void {
      this.$emit('remove-entry', {
        eventType: 'removeEntry',
        entry,
        sectionName: this.sectionName,
      })
    },
  },
})
</script>

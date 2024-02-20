<template>
  <div class="form__display-checkbox checkbox">
    <label class="checkbox__label">
      <input class="checkbox__input mr-2" type="checkbox" :checked="displaySection" @change="
        changeDisplaySection({ sectionName, status: ($event.target as HTMLInputElement).checked })
        " />
      <span class="checkbox__text"> {{ $t('display-section') }} </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCvState } from '~/data/useCvState';

export default defineComponent({
  props: {
    sectionName: {
      type: String,
      default: '',
    },
    displaySection: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { changeDisplaySection } = useCvState();
    return {
      changeDisplaySection,
    };
  },
});
</script>

<style scoped></style>

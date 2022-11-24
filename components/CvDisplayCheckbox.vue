<template>
  <div class="form__display-checkbox checkbox">
    <label class="checkbox__label">
      <input
        class="checkbox__input"
        type="checkbox"
        :checked="displaySection"
        @change="
          changeDisplaySection({ sectionName, status: $event.target.checked })
        "
      />
      <span class="checkbox__text"> {{ $t('display-section') }} </span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useCvState } from '~/data/useCvState';

export default Vue.extend({
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

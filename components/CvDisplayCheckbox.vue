<template>
  <div class="form__display-checkbox checkbox">
    <label class="checkbox__label">
      <input
        class="checkbox__input"
        type="checkbox"
        :checked="displaySection"
        @change="onChangeDisplay"
      />
      <span class="checkbox__text"> Display section on CV </span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    displaySection: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onChangeDisplay(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit('display-checkbox-changed', target.checked);
    },
  },
});
</script>

<style scoped></style>

<template>
  <div class="expansion-panel">
    <div class="expansion-panel__title" @click="togglePanel">
      <slot name="title">Título</slot>
      <svg
        :class="[
          'expansion-panel__arrow',
          { 'expansion-panel__arrow--open': isOpen },
        ]"
      >
        <use href="@/assets/sprite.svg#panel-arrow"></use>
      </svg>
    </div>
    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <slot v-if="isOpen" class="expansion-panel__panel" name="content"
        >Contenido</slot
      >
    </transition>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ExpansionPanel',
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    togglePanel() {
      this.isOpen = !this.isOpen
    },
    enter(element: HTMLElement) {
      element.style.height = 'auto'
      const height = getComputedStyle(element).height
      element.style.height = '0'
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height
      requestAnimationFrame(() => {
        element.style.height = height
      })
    },
    afterEnter(element: HTMLElement) {
      element.style.height = 'auto'
    },
    leave(element: HTMLElement) {
      const height = getComputedStyle(element).height
      element.style.height = height
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height
      requestAnimationFrame(() => {
        element.style.height = '0'
      })
    },
  },
})
</script>
<style lang="postcss" scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.expansion-panel {
  overflow: hidden;
  @apply bg-gray-100 bg-opacity-100 relative px-6 py-3;

  & & {
    @apply p-1;
  }
  &__title {
    @apply flex items-center justify-between w-full bg-gray-100 bg-opacity-100  relative z-10 mb-10;
    &:hover {
      cursor: pointer;
    }
  }

  &__panel {
    @apply z-0;
  }

  &__arrow {
    width: 1.25rem;
    height: 1.25rem;
    transform: rotate(0);
    transition: all 0.25s ease-in-out;
    &--open {
      transform: rotate(180deg);
    }
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.35s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
  opacity: 0;
}
</style>

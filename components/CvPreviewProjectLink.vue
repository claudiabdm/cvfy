<script lang="ts" setup>
interface Props {
  title: string
  href: string
}

defineProps<Props>()
</script>

<template>
  <a
    v-if="href"
    class="w-fit flex items-center font-medium italic text-underline before:bg-slate-700"
    target="_blank"
    rel="noopener"
    :href="href"
    :aria-label="`Open ${title} project in new tab`"
  >
    {{ href.replace(/https?:\/\//, "") }}
    <svg class="ml-1 size-4">
      <use href="@/assets/sprite.svg#open-in-new-tab" />
    </svg>
  </a>
</template>

<style lang="postcss" scoped>
.text-underline {
    position: relative;

    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: -2px;
        right: -2px;
        width: 100%;
        height: 1px;
    }
}
</style>

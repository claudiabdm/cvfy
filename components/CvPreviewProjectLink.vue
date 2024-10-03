<script lang="ts" setup>
interface Props {
    href: string
}

defineProps<Props>()
</script>

<template>
    <a
        class="flex items-center font-thin italic underline-offset-2 underline"
        target="_blank"
        rel="noopener"
        :href="href"
    >
        <svg class="cv__icon">
            <use href="@/assets/sprite.svg#link" />
        </svg>
        {{ href }}
    </a>
</template>
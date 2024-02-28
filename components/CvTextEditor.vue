<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = withDefaults(
  defineProps<{
    id?: string
    modelValue?: string | null
    readOnly: boolean
    class: string
  }>(),
  {
    id: undefined,
    modelValue: '',
    readOnly: false,
    class: '',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null | undefined): void
}>()

const editor = useEditor({
  content: '<p><i>Write something here...</i></p>',
  extensions: [StarterKit],
  editorProps: {
    editable: () => {
      return !props.readOnly
    },
    attributes: {
      ...(props.id && { id: `${String(props.id)}-editor` }),
      class: props.class,
    },
  },
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML())
  },
})

onMounted(() => {
  editor.value?.commands.setContent(props.modelValue, false, {
    preserveWhitespace: 'full',
  })
})

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value?.getHTML() === value

    if (isSame)
      return

    editor.value?.commands.setContent(value, false)
  },
)
</script>

<template>
  <EditorContent :editor="editor" />
</template>

<style lang="postcss">
.tiptap {

  ul,
  ol {
    @apply pl-4;
    list-style: initial;
  }

  li::marker {
    color: var(--primary);
  }
}
</style>

<script
  setup
  lang="ts"
>
import { useCvState } from '~/data/useCvState'
import type { DefaultSkill, LanguagesSkill, Level, Skill, SkillType } from '~/types/cvfy'

const props = defineProps<{
  tagListName: SkillType
  modelValue: Skill[]
  tagListLabel: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: Skill[]): void
}>()

const { t } = useI18n()

const state = reactive({
  tagInput: null as any,
})

const tagListCopy = ref<string[]>(formatList(props.modelValue))

watch(
  () => props.modelValue,
  value => tagListCopy.value = formatList(value),
)

function formatList(value: typeof props.modelValue) {
  const list = [] as string[]
  if (value) {
    for (const tag of value) {
      typeof tag === 'string'
        ? list.push(tag)
        : list.push(`${tag.lang}: ${t(tag.level)}`)
    }
  }
  return list
}

// Update skill list
const { addSkill, removeSkill } = useCvState()

const tagInputEmpty = computed(() => {
  return state.tagInput === ''
})

function cleanInput(): void {
  state.tagInput = ''
}

function handleUpdateSkill() {
  addSkill({
    skill: state.tagInput,
    skillType: props.tagListName,
  })
  cleanInput()
}

function handleRemoveSkill(tag: string) {
  if (props.tagListName === 'languages') {
    const langTag = (props.modelValue as LanguagesSkill['skill'][]).find(l => l.lang === tag.split(':')[0])
    if (langTag) {
      removeSkill<LanguagesSkill>(({
        skill: langTag,
        skillType: props.tagListName,
      }))
    }
  }
  else {
    removeSkill<DefaultSkill>(({
      skill: tag,
      skillType: props.tagListName,
    }))
  }
}

// Drag and Drop
const parentEl = ref<HTMLElement>()

useDrag(parentEl, tagListCopy, { onDrop })

function onDrop() {
  if (props.tagListName === 'languages') {
    const list: LanguagesSkill['skill'][] = tagListCopy.value.map((t) => {
      const split = t.split(': ')
      return { lang: split[0], level: split[1] as Level }
    })
    emit('update:modelValue', list)
  }
  else {
    emit('update:modelValue', [...tagListCopy.value])
  }
}
</script>

<template>
  <div class="form__group mb-10">
    <label
      class="form__label"
      :for="tagListName"
    >{{ tagListLabel }}
    </label>
    <div class="flex gap-3">
      <template v-if="tagListName === 'languages'">
        <CvInputLang />
      </template>

      <template v-else>
        <input
          :id="tagListName"
          v-model="state.tagInput"
          class="form__control mt-2 mb-1"
          type="text"
          @keyup.enter="handleUpdateSkill"
        >
        <button
          class="form__btn"
          type="button"
          :disabled="tagInputEmpty"
          :aria-disabled="tagInputEmpty"
          aria-live="assertive"
          @click="handleUpdateSkill"
        >
          {{ $t("add") }}
        </button>
      </template>
    </div>
    <ul
      ref="parentEl"
      class="tags"
    >
      <li
        v-for="tag in tagListCopy"
        :id="tag"
        :key="tag"
        draggable="true"
        class="tags__tag form__btn"
      >
        <span class="tags__tag-text">
          {{ tag }}
        </span>
        <button
          type="button"
          @click="handleRemoveSkill(tag)"
        >
          <svg class="form__icon">
            <use href="@/assets/sprite.svg#close" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<style
  lang="postcss"
  scoped
>
.tags {
  @apply flex flex-wrap gap-3 mt-3 text-xs/normal items-stretch w-full;

  &__tag {
    @apply flex justify-between items-end gap-3 m-0 px-2 py-1 h-fit;
    &[draggable] {
      @apply cursor-move select-none;
    }
    &:hover {
      @apply bg-purple-700;
    }
  }

}

.percentage {
  position: absolute;
  top: 0.5rem;
  right: 25%;
}
</style>

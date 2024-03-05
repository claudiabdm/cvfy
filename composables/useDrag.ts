export default function useDrag(
  element: Ref<HTMLElement | undefined>,
  idlist: Ref<string[]>,
  events: {
    onDrop: (dropId?: string, dragId?: string) => any
  },
) {
  const containerEl = ref(element)
  const dragId = ref<string>()
  const overId = ref<string>()

  onMounted(() => {
    containerEl.value?.addEventListener('dragstart', handleDragStart)
    containerEl.value?.addEventListener('dragend', handleDragEnd)
    containerEl.value?.addEventListener('dragover', handleDragOver)
    containerEl.value?.addEventListener('dragleave', handleDragLeave)
    containerEl.value?.addEventListener('drop', handleDrop)
  })

  onUnmounted(() => {
    containerEl.value?.removeEventListener('dragstart', handleDragStart)
    containerEl.value?.removeEventListener('dragend', handleDragEnd)
    containerEl.value?.removeEventListener('dragover', handleDragOver)
    containerEl.value?.removeEventListener('dragleave', handleDragLeave)
    containerEl.value?.removeEventListener('drop', handleDrop)
  })

  function handleDragStart(e: DragEvent) {
    const id = (e.target as HTMLElement).id;
    (e.target as HTMLElement).style.opacity = '0.2'

    if (id)
      dragId.value = id

    if (e.dataTransfer)
      e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragEnd(e: DragEvent) {
    (e.target as HTMLElement).style.opacity = '1'
    dragId.value = undefined
    overId.value = undefined
  }

  function handleDragOver(e: DragEvent) {
    if (e.preventDefault)
      e.preventDefault()

    const id = (e.target as HTMLElement)?.id

    if (id && dragId.value && id !== dragId.value) {
      overId.value = id
      if (overId.value !== dragId.value) {
        const overIdIndex = Number(idlist.value.findIndex(t => t === overId.value))
        const dragIdIndex = Number(idlist.value.findIndex(t => t === dragId.value))
        if (overIdIndex > -1) {
          const startIndex = Math.min(overIdIndex, dragIdIndex)
          const endIndex = Math.max(overIdIndex, dragIdIndex)
          const temp = [...idlist.value]
          for (let i = startIndex; i < endIndex; i++) {
            if (dragIdIndex > overIdIndex) {
              if (i === startIndex) {
                idlist.value[i] = dragId.value
                idlist.value[i + 1] = overId.value
              }
              else {
                idlist.value[i + 1] = temp[i]
              }
            }
            else {
              if (i === startIndex)
                idlist.value[overIdIndex] = dragId.value
              idlist.value[i] = temp[i + 1]
            }
          }
        }
      }

      if (e.dataTransfer)
        e.dataTransfer.dropEffect = 'move'
    }

    return false
  }

  function handleDragLeave() {
    overId.value = undefined
  }

  function handleDrop(e: DragEvent) {
    e.stopPropagation()

    events.onDrop(overId.value, dragId.value)

    return false
  }

  return {
    containerEl,
  }
}

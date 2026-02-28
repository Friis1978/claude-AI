<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)
const pickerContainer = ref<HTMLDivElement | null>(null)
const wrapperRef = ref<HTMLDivElement | null>(null)

let pickerInstance: InstanceType<typeof Picker> | null = null

const openPicker = () => {
  open.value = !open.value
}

watch(open, async (val) => {
  if (val) {
    await nextTick()
    if (!pickerContainer.value) return
    pickerContainer.value.innerHTML = ''
    pickerInstance = new Picker({
      data,
      theme: 'light',
      onEmojiSelect: (emoji: { native: string }) => {
        emit('update:modelValue', emoji.native)
        open.value = false
      },
      parent: pickerContainer.value,
    })
  } else {
    pickerInstance = null
  }
})

const onClickOutside = (e: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

watch(open, (val) => {
  if (val) {
    document.addEventListener('mousedown', onClickOutside)
  } else {
    document.removeEventListener('mousedown', onClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside)
})
</script>

<template>
  <div ref="wrapperRef" class="relative shrink-0">
    <button
      type="button"
      class="flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-2xl ring-offset-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      @click="openPicker"
    >
      {{ modelValue || '😀' }}
    </button>
    <div v-if="open" class="absolute bottom-full left-0 z-[200] mb-1">
      <div ref="pickerContainer" />
    </div>
  </div>
</template>

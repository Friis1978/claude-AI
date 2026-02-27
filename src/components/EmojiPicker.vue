<template>
  <div class="relative shrink-0">
    <button
      type="button"
      class="flex h-10 items-center justify-center rounded-md border border-input bg-background px-3 text-2xl ring-offset-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      @click="open = !open"
    >
      {{ modelValue || '😀' }}
    </button>
    <div
      v-if="open"
      class="absolute bottom-full left-0 mb-1 w-72 grid grid-cols-8 gap-1 rounded-md border border-input bg-background p-2 shadow-md z-10"
    >
      <button
        v-for="emoji in emojis"
        :key="emoji"
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded text-lg cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
        @click="selectEmoji(emoji)"
      >
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const open = ref(false)

const emojis = [
  '🦆', '🥛', '🥩', '🍞', '🥤', '🧹', '❄️', '🍪', '📦',
  '🍎', '🥕', '🥬', '🧄', '🧅', '🥔', '🌽', '🥒', '🍅',
  '🧈', '🧀', '🥚', '🥞', '🍖', '🥓', '🍗', '🌭', '🍔',
  '🥐', '🥖', '🥨', '🍰', '🎂', '🧁', '🍩',
  '☕', '🧃', '🧋', '🍷', '🍺', '🥂', '🍾', '💧',
  '🧺', '🧽', '🧴', '🧼', '🧻', '🧸', '💨', '🔥',
]

function selectEmoji(emoji: string) {
  emit('update:modelValue', emoji)
  open.value = false
}
</script>

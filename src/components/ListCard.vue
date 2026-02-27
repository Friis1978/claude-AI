<template>
  <button
    :class="cn(
      'flex w-full flex-col gap-1 rounded-lg px-3 py-2.5 text-left transition-colors',
      active
        ? 'border-l-2 border-indigo-400 bg-indigo-500/20'
        : 'hover:bg-slate-800',
    )"
    @click="$emit('click')"
  >
    <span class="truncate text-sm font-medium text-white">{{ list.name }}</span>
    <div class="flex items-center gap-2">
      <span class="text-xs text-slate-400">
        {{ list._count.items }} items
        <template v-if="list._checkedCount">
          &middot; {{ list._checkedCount }} done
        </template>
      </span>
    </div>
    <div v-if="list.tags.length > 0" class="flex flex-wrap gap-1 pt-0.5">
      <span
        v-for="tag in list.tags"
        :key="tag.id"
        class="rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white"
        :style="{ backgroundColor: tag.color }"
      >
        {{ tag.name }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { ShoppingListSummary } from '@/lib/types'

defineProps<{
  list: ShoppingListSummary
  active: boolean
}>()

defineEmits<{ click: [] }>()
</script>

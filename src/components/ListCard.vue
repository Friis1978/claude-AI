<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { ShoppingListSummary } from '@/lib/types'

defineProps<{
  list: ShoppingListSummary
  active: boolean
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    :class="
      cn(
        'flex w-full flex-col gap-1 rounded-lg border border-border px-3 py-2.5 text-left shadow-sm transition-all',
        active
          ? 'bg-primary/10 border-l-2 border-primary shadow-md'
          : 'hover:border-primary/40 hover:bg-accent/80 hover:shadow-md'
      )
    "
    @click="$emit('click')"
  >
    <span class="truncate text-sm font-medium text-foreground">{{ list.name }}</span>
    <div class="flex items-center gap-2">
      <span class="text-xs text-muted-foreground">
        {{ list._count.items }} items
        <template v-if="list._checkedCount"> &middot; {{ list._checkedCount }} done </template>
      </span>
    </div>
  </button>
</template>

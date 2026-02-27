<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useShoppingLists } from '@/lib/composables/useShoppingLists'
import { useTags } from '@/lib/composables/useTags'

const { activeTagFilter, setTagFilter } = useShoppingLists()
const { tags } = useTags()
</script>

<template>
  <div class="flex flex-wrap gap-1.5 border-b border-slate-700 px-3 py-2">
    <button
      :class="
        cn(
          'rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
          !activeTagFilter
            ? 'bg-indigo-500 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        )
      "
      @click="setTagFilter(null)"
    >
      All
    </button>
    <button
      v-for="tag in tags"
      :key="tag.id"
      :class="
        cn(
          'rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
          activeTagFilter === tag.id ? 'text-white' : 'text-slate-300 hover:opacity-80'
        )
      "
      :style="{
        backgroundColor: activeTagFilter === tag.id ? tag.color : undefined,
        border: activeTagFilter !== tag.id ? `1px solid ${tag.color}` : undefined,
      }"
      @click="setTagFilter(tag.id)"
    >
      {{ tag.name }}
    </button>
  </div>
</template>

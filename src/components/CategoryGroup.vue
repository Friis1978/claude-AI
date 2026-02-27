<template>
  <div class="space-y-2">
    <div class="flex items-center gap-2">
      <span class="text-lg">{{ category.emoji }}</span>
      <h3 class="text-sm font-semibold" :style="{ color: category.color }">
        {{ category.name }}
      </h3>
      <span class="text-xs text-muted-foreground">({{ items.length }})</span>
    </div>
    <div class="space-y-1 pl-1">
      <ItemRow
        v-for="item in items"
        :key="item.id"
        :item="item"
        :list-id="listId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, ShoppingItem } from '@/lib/types'
import ItemRow from './ItemRow.vue'

defineProps<{
  category: Category
  items: ShoppingItem[]
  listId: string
}>()
</script>

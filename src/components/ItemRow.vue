<template>
  <div
    :class="cn(
      'group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted/50',
      item.checked && 'opacity-60',
    )"
  >
    <Checkbox
      :checked="item.checked"
      @update:checked="toggleItem(listId, item.id)"
    />
    <span
      :class="cn(
        'flex-1 text-sm',
        item.checked && 'line-through text-muted-foreground',
      )"
    >
      {{ item.name }}
    </span>

    <div class="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        class="h-7 w-7"
        :disabled="item.quantity <= 1"
        @click="decrementQuantity(listId, item.id)"
      >
        <Minus class="h-3 w-3" />
      </Button>
      <span class="w-6 text-center text-xs font-medium">{{ item.quantity }}</span>
      <Button
        variant="ghost"
        size="icon"
        class="h-7 w-7"
        @click="incrementQuantity(listId, item.id)"
      >
        <Plus class="h-3 w-3" />
      </Button>
    </div>

    <div class="flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
      <Button variant="ghost" size="icon" class="h-7 w-7" @click="showEdit = true">
        <Pencil class="h-3 w-3" />
      </Button>
      <Button variant="ghost" size="icon" class="h-7 w-7" @click="confirmDelete = true">
        <Trash2 class="h-3 w-3 text-destructive" />
      </Button>
    </div>

    <EditItemDialog
      v-model:open="showEdit"
      :item="item"
      :list-id="listId"
    />

    <ConfirmDialog
      v-model:open="confirmDelete"
      title="Delete Item"
      description="Are you sure you want to remove this item from the list?"
      confirm-label="Delete"
      variant="destructive"
      @confirm="deleteItem(listId, item.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Minus, Plus, Pencil, Trash2 } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useItems } from '@/lib/composables/useItems'
import EditItemDialog from './EditItemDialog.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import type { ShoppingItem } from '@/lib/types'

defineProps<{
  item: ShoppingItem
  listId: string
}>()

const { toggleItem, incrementQuantity, decrementQuantity, deleteItem } = useItems()

const showEdit = ref(false)
const confirmDelete = ref(false)
</script>

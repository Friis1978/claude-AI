<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Item</DialogTitle>
      </DialogHeader>
      <form class="space-y-4" @submit.prevent="onSave">
        <div class="space-y-2">
          <label class="text-sm font-medium">Name</label>
          <Input v-model="editName" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Category</label>
          <Select v-model="editCategoryId">
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.emoji }} {{ cat.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Quantity</label>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="icon" type="button" :disabled="editQuantity <= 1" @click="editQuantity--">
              <Minus class="h-4 w-4" />
            </Button>
            <span class="w-8 text-center font-medium">{{ editQuantity }}</span>
            <Button variant="outline" size="icon" type="button" @click="editQuantity++">
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button" @click="$emit('update:open', false)">Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Minus, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCategories } from '@/lib/composables/useCategories'
import { useItems } from '@/lib/composables/useItems'
import type { ShoppingItem } from '@/lib/types'

const props = defineProps<{
  open: boolean
  item: ShoppingItem
  listId: string
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const { categories } = useCategories()
const { updateItem } = useItems()

const editName = ref(props.item.name)
const editCategoryId = ref(props.item.categoryId)
const editQuantity = ref(props.item.quantity)

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    editName.value = props.item.name
    editCategoryId.value = props.item.categoryId
    editQuantity.value = props.item.quantity
  }
})

async function onSave() {
  await updateItem(props.listId, props.item.id, {
    name: editName.value.trim(),
    categoryId: editCategoryId.value,
    quantity: editQuantity.value,
  })
  emit('update:open', false)
}
</script>

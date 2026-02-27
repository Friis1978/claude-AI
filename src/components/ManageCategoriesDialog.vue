<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Manage Categories</DialogTitle>
        <DialogDescription>Add, edit, or remove item categories.</DialogDescription>
      </DialogHeader>

      <div class="space-y-2">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="flex items-center gap-2 rounded-lg border p-2"
        >
          <span class="text-lg">{{ cat.emoji }}</span>
          <span class="flex-1 text-sm font-medium">{{ cat.name }}</span>
          <div
            class="h-4 w-4 rounded-full border"
            :style="{ backgroundColor: cat.color }"
          />
          <Button
            v-if="!cat.isDefault"
            variant="ghost"
            size="icon"
            class="h-7 w-7"
            @click="onEdit(cat)"
          >
            <Pencil class="h-3 w-3" />
          </Button>
          <Button
            v-if="!cat.isDefault"
            variant="ghost"
            size="icon"
            class="h-7 w-7"
            @click="onDelete(cat.id)"
          >
            <Trash2 class="h-3 w-3 text-destructive" />
          </Button>
        </div>
      </div>

      <div class="space-y-2 border-t pt-4">
        <h4 class="text-sm font-medium">{{ editingId ? 'Edit' : 'Add' }} Category</h4>
        <div class="flex flex-wrap gap-2">
          <Input v-model="formName" placeholder="Name" class="flex-1 min-w-[120px]" />
          <Input v-model="formEmoji" placeholder="Emoji" class="w-16" />
          <input
            v-model="formColor"
            type="color"
            class="h-10 w-10 cursor-pointer rounded border"
          />
          <Button @click="onSave" :disabled="!formName.trim()">
            {{ editingId ? 'Update' : 'Add' }}
          </Button>
          <Button v-if="editingId" variant="ghost" @click="resetForm">Cancel</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCategories } from '@/lib/composables/useCategories'
import type { Category } from '@/lib/types'

defineProps<{ open: boolean }>()
defineEmits<{ 'update:open': [value: boolean] }>()

const { categories, createCategory, updateCategory, deleteCategory } = useCategories()

const editingId = ref<string | null>(null)
const formName = ref('')
const formEmoji = ref('')
const formColor = ref('#6b7280')

function resetForm() {
  editingId.value = null
  formName.value = ''
  formEmoji.value = ''
  formColor.value = '#6b7280'
}

function onEdit(cat: Category) {
  editingId.value = cat.id
  formName.value = cat.name
  formEmoji.value = cat.emoji
  formColor.value = cat.color
}

async function onSave() {
  if (!formName.value.trim()) return

  if (editingId.value) {
    await updateCategory(editingId.value, {
      name: formName.value.trim(),
      emoji: formEmoji.value,
      color: formColor.value,
    })
  } else {
    await createCategory({
      name: formName.value.trim(),
      emoji: formEmoji.value || '\u{1F4E6}',
      color: formColor.value,
    })
  }

  resetForm()
}

async function onDelete(id: string) {
  try {
    await deleteCategory(id)
  } catch (e) {
    alert(e instanceof Error ? e.message : 'Failed to delete category')
  }
}
</script>

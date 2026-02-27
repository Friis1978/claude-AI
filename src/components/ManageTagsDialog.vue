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
import { useTags } from '@/lib/composables/useTags'
import type { Tag } from '@/lib/types'

defineProps<{ open: boolean }>()
defineEmits<{ 'update:open': [value: boolean] }>()

const { tags, createTag, updateTag, deleteTag } = useTags()

const editingId = ref<string | null>(null)
const formName = ref('')
const formColor = ref('#6b7280')

const resetForm = () => {
  editingId.value = null
  formName.value = ''
  formColor.value = '#6b7280'
}

const onEdit = (tag: Tag) => {
  editingId.value = tag.id
  formName.value = tag.name
  formColor.value = tag.color
}

const onSave = async () => {
  if (!formName.value.trim()) return

  if (editingId.value) {
    await updateTag(editingId.value, {
      name: formName.value.trim(),
      color: formColor.value,
    })
  } else {
    await createTag({
      name: formName.value.trim(),
      color: formColor.value,
    })
  }

  resetForm()
}

const onDelete = async (id: string) => {
  await deleteTag(id)
}
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Manage Tags</DialogTitle>
        <DialogDescription>Add, edit, or remove list tags.</DialogDescription>
      </DialogHeader>

      <div class="space-y-2">
        <div
          v-for="tag in tags"
          :key="tag.id"
          class="flex items-center gap-2 rounded-lg border p-2"
        >
          <span
            class="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
            :style="{ backgroundColor: tag.color }"
          >
            {{ tag.name }}
          </span>
          <div class="flex-1" />
          <Button
            v-if="!tag.isDefault"
            variant="ghost"
            size="icon"
            class="h-7 w-7"
            @click="onEdit(tag)"
          >
            <Pencil class="h-3 w-3" />
          </Button>
          <Button
            v-if="!tag.isDefault"
            variant="ghost"
            size="icon"
            class="h-7 w-7"
            @click="onDelete(tag.id)"
          >
            <Trash2 class="h-3 w-3 text-destructive" />
          </Button>
        </div>
      </div>

      <div class="space-y-2 border-t pt-4">
        <h4 class="text-sm font-medium">{{ editingId ? 'Edit' : 'Add' }} Tag</h4>
        <div class="flex gap-2">
          <input
            v-model="formName"
            placeholder="Tag name"
            class="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <input v-model="formColor" type="color" class="h-10 w-10 cursor-pointer rounded border" />
          <Button @click="onSave" :disabled="!formName.trim()">
            {{ editingId ? 'Update' : 'Add' }}
          </Button>
          <Button v-if="editingId" variant="ghost" @click="resetForm">Cancel</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Pencil, Copy, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ConfirmDialog from './ConfirmDialog.vue'
import type { ShoppingList } from '@/lib/types'

const props = defineProps<{ list: ShoppingList }>()
const emit = defineEmits<{
  rename: [name: string]
  duplicate: []
  delete: []
}>()

const editing = ref(false)
const editName = ref('')
const confirmDelete = ref(false)

const startRename = () => {
  editName.value = props.list.name
  editing.value = true
}

const saveRename = () => {
  if (editName.value.trim()) {
    emit('rename', editName.value.trim())
  }
  editing.value = false
}

const cancelRename = () => {
  editing.value = false
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div v-if="editing" class="flex items-center gap-2">
      <input
        v-model="editName"
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-xl font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        @keydown.enter="saveRename"
        @keydown.escape="cancelRename"
      />
      <Button size="sm" @click="saveRename">Save</Button>
      <Button variant="ghost" size="sm" @click="cancelRename">Cancel</Button>
    </div>
    <h1 v-else class="text-2xl font-bold">{{ list.name }}</h1>

    <div class="flex items-center gap-1">
      <Button variant="ghost" size="icon" @click="startRename">
        <Pencil class="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" @click="$emit('duplicate')">
        <Copy class="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" @click="confirmDelete = true">
        <Trash2 class="h-4 w-4 text-destructive" />
      </Button>
    </div>

    <ConfirmDialog
      v-model:open="confirmDelete"
      title="Delete List"
      description="Are you sure you want to delete this list? All items will be permanently removed."
      confirm-label="Delete"
      variant="destructive"
      @confirm="$emit('delete')"
    />
  </div>
</template>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Select Tags</DialogTitle>
        <DialogDescription>Choose tags to assign to this list.</DialogDescription>
      </DialogHeader>
      <div class="space-y-2">
        <label
          v-for="tag in tags"
          :key="tag.id"
          class="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50"
        >
          <Checkbox
            :checked="selected.has(tag.id)"
            @update:checked="toggleTag(tag.id)"
          />
          <span
            class="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
            :style="{ backgroundColor: tag.color }"
          >
            {{ tag.name }}
          </span>
        </label>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="$emit('update:open', false)">Cancel</Button>
        <Button @click="onSave">Apply</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useTags } from '@/lib/composables/useTags'

const props = defineProps<{
  open: boolean
  selectedIds: string[]
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  update: [tagIds: string[]]
}>()

const { tags } = useTags()
const selected = ref(new Set<string>())

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    selected.value = new Set(props.selectedIds)
  }
})

function toggleTag(id: string) {
  const next = new Set(selected.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  selected.value = next
}

function onSave() {
  emit('update', Array.from(selected.value))
}
</script>

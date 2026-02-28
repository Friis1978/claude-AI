<script setup lang="ts">
import { ref } from 'vue'
import { X, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import TagPickerDialog from './TagPickerDialog.vue'
import type { Tag } from '@/lib/types'

const props = defineProps<{ tags: Tag[] }>()
const emit = defineEmits<{ 'update-tags': [tagIds: string[]] }>()

const showPicker = ref(false)

const removeTag = (tagId: string) => {
  const newIds = props.tags.filter((t) => t.id !== tagId).map((t) => t.id)
  emit('update-tags', newIds)
}

const onUpdateTags = (tagIds: string[]) => {
  emit('update-tags', tagIds)
  showPicker.value = false
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-1.5">
    <span
      v-for="tag in tags"
      :key="tag.id"
      class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium text-primary-foreground"
      :style="{ backgroundColor: tag.color }"
    >
      {{ tag.name }}
      <button class="ml-0.5 hover:opacity-70" @click="removeTag(tag.id)">
        <X class="h-3 w-3" />
      </button>
    </span>
    <Button variant="outline" size="sm" class="h-6 rounded-full text-xs" @click="showPicker = true">
      <Plus class="mr-1 h-3 w-3" />
      Tag
    </Button>

    <TagPickerDialog
      v-model:open="showPicker"
      :selected-ids="tags.map((t) => t.id)"
      @update="onUpdateTags"
    />
  </div>
</template>

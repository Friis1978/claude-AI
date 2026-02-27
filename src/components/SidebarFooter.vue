<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Grid3x3, Tag as TagIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import ManageCategoriesDialog from './ManageCategoriesDialog.vue'
import ManageTagsDialog from './ManageTagsDialog.vue'

defineEmits<{ createList: [] }>()

const showCategories = ref(false)
const showTags = ref(false)
</script>

<template>
  <div class="space-y-2 border-t border-slate-700 p-3">
    <Button class="w-full" size="sm" @click="$emit('createList')">
      <Plus class="mr-2 h-4 w-4" />
      New List
    </Button>
    <div class="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        class="flex-1 text-slate-300"
        @click="showCategories = true"
      >
        <Grid3x3 class="mr-1 h-3.5 w-3.5" />
        Categories
      </Button>
      <Button variant="ghost" size="sm" class="flex-1 text-slate-300" @click="showTags = true">
        <TagIcon class="mr-1 h-3.5 w-3.5" />
        Tags
      </Button>
    </div>

    <ManageCategoriesDialog v-model:open="showCategories" />
    <ManageTagsDialog v-model:open="showTags" />
  </div>
</template>

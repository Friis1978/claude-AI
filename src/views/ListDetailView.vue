<template>
  <div v-if="activeList" class="mx-auto max-w-3xl space-y-6">
    <ListHeader
      :list="activeList"
      @rename="onRename"
      @duplicate="onDuplicate"
      @delete="onDelete"
    />

    <TagChips
      :tags="activeList.tags"
      @update-tags="onUpdateTags"
    />

    <ProgressBar
      :total="activeList.items.length"
      :checked="checkedCount"
    />

    <AddItemForm :list-id="activeList.id" />

    <div v-if="activeList.items.length === 0" class="py-12 text-center text-muted-foreground">
      No items yet. Add your first item above.
    </div>

    <CategoryGroup
      v-for="group in groupedItems"
      :key="group.category.id"
      :category="group.category"
      :items="group.items"
      :list-id="activeList.id"
    />
  </div>
  <div v-else class="flex h-full items-center justify-center text-muted-foreground">
    Loading...
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShoppingLists } from '@/lib/composables/useShoppingLists'
import type { ShoppingItem, Category } from '@/lib/types'
import ListHeader from '@/components/ListHeader.vue'
import TagChips from '@/components/TagChips.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import AddItemForm from '@/components/AddItemForm.vue'
import CategoryGroup from '@/components/CategoryGroup.vue'

const route = useRoute()
const router = useRouter()
const { activeList, fetchList, updateList, deleteList, duplicateList, fetchLists } = useShoppingLists()

const checkedCount = computed(() =>
  activeList.value?.items.filter((i) => i.checked).length ?? 0
)

interface ItemGroup {
  category: Category
  items: ShoppingItem[]
}

const groupedItems = computed<ItemGroup[]>(() => {
  if (!activeList.value) return []
  const groups = new Map<string, ItemGroup>()

  for (const item of activeList.value.items) {
    const existing = groups.get(item.categoryId)
    if (existing) {
      existing.items.push(item)
    } else {
      groups.set(item.categoryId, {
        category: item.category,
        items: [item],
      })
    }
  }

  return Array.from(groups.values())
})

watch(
  () => route.params.id,
  (id) => {
    if (id && typeof id === 'string') {
      fetchList(id)
    }
  },
  { immediate: true }
)

async function onRename(name: string) {
  if (activeList.value) {
    await updateList(activeList.value.id, { name })
  }
}

async function onDuplicate() {
  if (activeList.value) {
    const dup = await duplicateList(activeList.value.id)
    router.push(`/lists/${dup.id}`)
  }
}

async function onDelete() {
  if (activeList.value) {
    await deleteList(activeList.value.id)
    router.push('/lists')
  }
}

async function onUpdateTags(tagIds: string[]) {
  if (activeList.value) {
    await updateList(activeList.value.id, { tagIds })
    await fetchLists()
  }
}
</script>

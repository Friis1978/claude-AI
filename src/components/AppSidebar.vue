<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { useShoppingLists } from '@/lib/composables/useShoppingLists'
import TagFilterBar from './TagFilterBar.vue'
import ListCard from './ListCard.vue'
import SidebarFooter from './SidebarFooter.vue'

defineProps<{ isOpen: boolean }>()
defineEmits<{ close: [] }>()

const router = useRouter()
const { lists, activeList, createList } = useShoppingLists()

const onSelectList = (id: string) => {
  router.push(`/lists/${id}`)
}

const onCreateList = async () => {
  const list = await createList('New List')
  router.push(`/lists/${list.id}`)
}
</script>

<template>
  <div v-if="isOpen" class="bg-overlay/50 fixed inset-0 z-40 md:hidden" @click="$emit('close')" />
  <aside
    :class="
      cn(
        'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-card text-card-foreground transition-transform md:relative md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )
    "
  >
    <div class="flex items-center gap-2 border-b border-border px-4 py-4">
      <ShoppingCart class="h-6 w-6 text-primary" />
      <h1 class="text-lg font-bold text-foreground">ShopList</h1>
    </div>

    <TagFilterBar />

    <div class="flex-1 overflow-y-auto p-2">
      <ListCard
        v-for="list in lists"
        :key="list.id"
        :list="list"
        :active="activeList?.id === list.id"
        @click="onSelectList(list.id)"
      />
      <div v-if="lists.length === 0" class="px-3 py-8 text-center text-sm text-muted-foreground">
        No lists yet. Create one below.
      </div>
    </div>

    <SidebarFooter @create-list="onCreateList" />
  </aside>
</template>

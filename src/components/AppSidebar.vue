<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 bg-black/50 md:hidden"
    @click="$emit('close')"
  />
  <aside
    :class="cn(
      'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-slate-200 transition-transform md:relative md:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    )"
  >
    <div class="flex items-center gap-2 border-b border-slate-700 px-4 py-4">
      <ShoppingCart class="h-6 w-6 text-indigo-400" />
      <h1 class="text-lg font-bold text-white">ShopList</h1>
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
      <div v-if="lists.length === 0" class="px-3 py-8 text-center text-sm text-slate-400">
        No lists yet. Create one below.
      </div>
    </div>

    <SidebarFooter @create-list="onCreateList" />
  </aside>
</template>

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

function onSelectList(id: string) {
  router.push(`/lists/${id}`)
}

async function onCreateList() {
  const list = await createList('New List')
  router.push(`/lists/${list.id}`)
}
</script>

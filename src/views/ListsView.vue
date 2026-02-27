<template>
  <div class="h-full">
    <router-view v-if="$route.params.id" />
    <EmptyState v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useShoppingLists } from '@/lib/composables/useShoppingLists'
import { useCategories } from '@/lib/composables/useCategories'
import { useTags } from '@/lib/composables/useTags'
import EmptyState from '@/components/EmptyState.vue'

const { fetchLists } = useShoppingLists()
const { fetchCategories } = useCategories()
const { fetchTags } = useTags()

onMounted(() => {
  fetchLists()
  fetchCategories()
  fetchTags()
})
</script>

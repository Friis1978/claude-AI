import { ref, computed } from 'vue'
import { api } from '../api'
import type { ShoppingList, ShoppingListSummary } from '../types'

const lists = ref<ShoppingListSummary[]>([])
const activeList = ref<ShoppingList | null>(null)
const activeTagFilter = ref<string | null>(null)
const loading = ref(false)

export function useShoppingLists() {
  const filteredLists = computed(() => lists.value)

  const fetchLists = async () => {
    loading.value = true
    try {
      lists.value = await api.lists.getAll(activeTagFilter.value ?? undefined)
    } finally {
      loading.value = false
    }
  }

  const fetchList = async (id: string) => {
    activeList.value = await api.lists.get(id)
  }

  const createList = async (name: string, tagIds?: string[]) => {
    const list = await api.lists.create({ name, tagIds })
    activeList.value = list
    await fetchLists()
    return list
  }

  const updateList = async (id: string, data: { name?: string; tagIds?: string[] }) => {
    const updated = await api.lists.update(id, data)
    activeList.value = updated
    await fetchLists()
    return updated
  }

  const deleteList = async (id: string) => {
    await api.lists.delete(id)
    if (activeList.value?.id === id) {
      activeList.value = null
    }
    await fetchLists()
  }

  const duplicateList = async (id: string) => {
    const duplicate = await api.lists.duplicate(id)
    activeList.value = duplicate
    await fetchLists()
    return duplicate
  }

  const setTagFilter = (tagId: string | null) => {
    activeTagFilter.value = tagId
    fetchLists()
  }

  return {
    lists: filteredLists,
    activeList,
    activeTagFilter,
    loading,
    fetchLists,
    fetchList,
    createList,
    updateList,
    deleteList,

    duplicateList,
    setTagFilter,
  }
}

import { api } from '../api'
import type { CreateItemPayload, UpdateItemPayload } from '../types'
import { useShoppingLists } from './useShoppingLists'

export function useItems() {
  const { activeList, fetchList } = useShoppingLists()

  async function addItem(listId: string, data: CreateItemPayload) {
    const item = await api.items.create(listId, data)
    if (activeList.value?.id === listId) {
      activeList.value.items.push(item)
    }
    return item
  }

  async function updateItem(listId: string, itemId: string, data: UpdateItemPayload) {
    // Optimistic update for checkbox toggle and quantity
    if (activeList.value?.id === listId) {
      const item = activeList.value.items.find((i) => i.id === itemId)
      if (item) {
        if (data.checked !== undefined) item.checked = data.checked
        if (data.quantity !== undefined) item.quantity = data.quantity
        if (data.name !== undefined) item.name = data.name
      }
    }

    try {
      const updated = await api.items.update(listId, itemId, data)
      if (activeList.value?.id === listId) {
        const index = activeList.value.items.findIndex((i) => i.id === itemId)
        if (index !== -1) activeList.value.items[index] = updated
      }
      return updated
    } catch {
      // Revert on error
      await fetchList(listId)
      throw new Error('Failed to update item')
    }
  }

  async function deleteItem(listId: string, itemId: string) {
    await api.items.delete(listId, itemId)
    if (activeList.value?.id === listId) {
      activeList.value.items = activeList.value.items.filter((i) => i.id !== itemId)
    }
  }

  async function toggleItem(listId: string, itemId: string) {
    const item = activeList.value?.items.find((i) => i.id === itemId)
    if (item) {
      await updateItem(listId, itemId, { checked: !item.checked })
    }
  }

  async function incrementQuantity(listId: string, itemId: string) {
    const item = activeList.value?.items.find((i) => i.id === itemId)
    if (item) {
      await updateItem(listId, itemId, { quantity: item.quantity + 1 })
    }
  }

  async function decrementQuantity(listId: string, itemId: string) {
    const item = activeList.value?.items.find((i) => i.id === itemId)
    if (item && item.quantity > 1) {
      await updateItem(listId, itemId, { quantity: item.quantity - 1 })
    }
  }

  return {
    addItem,
    updateItem,
    deleteItem,
    toggleItem,
    incrementQuantity,
    decrementQuantity,
  }
}

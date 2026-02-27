import { api } from '../api'
import type { CreateItemPayload, UpdateItemPayload } from '../types'
import { useShoppingLists } from './useShoppingLists'

export function useItems() {
  const { activeList, fetchList } = useShoppingLists()

  const addItem = async (listId: string, data: CreateItemPayload) => {
    const item = await api.items.create(listId, data)
    if (activeList.value?.id === listId) {
      activeList.value.items.push(item)
    }
    return item
  }

  const updateItem = async (listId: string, itemId: string, data: UpdateItemPayload) => {
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

  const deleteItem = async (listId: string, itemId: string) => {
    await api.items.delete(listId, itemId)
    if (activeList.value?.id === listId) {
      activeList.value.items = activeList.value.items.filter((i) => i.id !== itemId)
    }
  }

  const toggleItem = async (listId: string, itemId: string) => {
    const item = activeList.value?.items.find((i) => i.id === itemId)
    if (item) {
      await updateItem(listId, itemId, { checked: !item.checked })
    }
  }

  const incrementQuantity = async (listId: string, itemId: string) => {
    const item = activeList.value?.items.find((i) => i.id === itemId)
    if (item) {
      await updateItem(listId, itemId, { quantity: item.quantity + 1 })
    }
  }

  const decrementQuantity = async (listId: string, itemId: string) => {
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

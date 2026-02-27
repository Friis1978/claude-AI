import { ref } from 'vue'
import { api } from '../api'
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../types'

const categories = ref<Category[]>([])
const loading = ref(false)

export function useCategories() {
  const fetchCategories = async () => {
    loading.value = true
    try {
      categories.value = await api.categories.getAll()
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (data: CreateCategoryPayload) => {
    const category = await api.categories.create(data)
    categories.value.push(category)
    return category
  }

  const updateCategory = async (id: string, data: UpdateCategoryPayload) => {
    const updated = await api.categories.update(id, data)
    const index = categories.value.findIndex((c) => c.id === id)
    if (index !== -1) categories.value[index] = updated
    return updated
  }

  const deleteCategory = async (id: string) => {
    await api.categories.delete(id)
    categories.value = categories.value.filter((c) => c.id !== id)
  }

  return {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}

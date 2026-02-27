import { ref } from 'vue'
import { api } from '../api'
import type { Tag, CreateTagPayload, UpdateTagPayload } from '../types'

const tags = ref<Tag[]>([])
const loading = ref(false)

export function useTags() {
  const fetchTags = async () => {
    loading.value = true
    try {
      tags.value = await api.tags.getAll()
    } finally {
      loading.value = false
    }
  }

  const createTag = async (data: CreateTagPayload) => {
    const tag = await api.tags.create(data)
    tags.value.push(tag)
    return tag
  }

  const updateTag = async (id: string, data: UpdateTagPayload) => {
    const updated = await api.tags.update(id, data)
    const index = tags.value.findIndex((t) => t.id === id)
    if (index !== -1) tags.value[index] = updated
    return updated
  }

  const deleteTag = async (id: string) => {
    await api.tags.delete(id)
    tags.value = tags.value.filter((t) => t.id !== id)
  }

  return {
    tags,
    loading,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
  }
}

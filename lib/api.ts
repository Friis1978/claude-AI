import type {
  ShoppingList,
  ShoppingListSummary,
  ShoppingItem,
  Category,
  Tag,
  CreateListPayload,
  UpdateListPayload,
  CreateItemPayload,
  UpdateItemPayload,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  CreateTagPayload,
  UpdateTagPayload,
} from './types'

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error((body as { error: string }).error ?? `HTTP ${res.status}`)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// Lists
export const api = {
  lists: {
    getAll(tagId?: string): Promise<ShoppingListSummary[]> {
      const params = tagId ? `?tagId=${tagId}` : ''
      return request(`/api/lists${params}`)
    },
    get(id: string): Promise<ShoppingList> {
      return request(`/api/lists/${id}`)
    },
    create(data: CreateListPayload): Promise<ShoppingList> {
      return request('/api/lists', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
    update(id: string, data: UpdateListPayload): Promise<ShoppingList> {
      return request(`/api/lists/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
    },
    delete(id: string): Promise<void> {
      return request(`/api/lists/${id}`, { method: 'DELETE' })
    },
    duplicate(id: string): Promise<ShoppingList> {
      return request(`/api/lists/${id}/duplicate`, { method: 'POST' })
    },
  },

  items: {
    create(listId: string, data: CreateItemPayload): Promise<ShoppingItem> {
      return request(`/api/lists/${listId}/items`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
    update(listId: string, itemId: string, data: UpdateItemPayload): Promise<ShoppingItem> {
      return request(`/api/lists/${listId}/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
    },
    delete(listId: string, itemId: string): Promise<void> {
      return request(`/api/lists/${listId}/items/${itemId}`, { method: 'DELETE' })
    },
  },

  categories: {
    getAll(): Promise<Category[]> {
      return request('/api/categories')
    },
    create(data: CreateCategoryPayload): Promise<Category> {
      return request('/api/categories', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
    update(id: string, data: UpdateCategoryPayload): Promise<Category> {
      return request(`/api/categories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
    },
    delete(id: string): Promise<void> {
      return request(`/api/categories/${id}`, { method: 'DELETE' })
    },
  },

  tags: {
    getAll(): Promise<Tag[]> {
      return request('/api/tags')
    },
    create(data: CreateTagPayload): Promise<Tag> {
      return request('/api/tags', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
    update(id: string, data: UpdateTagPayload): Promise<Tag> {
      return request(`/api/tags/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
    },
    delete(id: string): Promise<void> {
      return request(`/api/tags/${id}`, { method: 'DELETE' })
    },
  },
}

export interface Category {
  id: string
  name: string
  color: string
  emoji: string
  isDefault: boolean
}

export interface Tag {
  id: string
  name: string
  color: string
  isDefault: boolean
}

export interface ShoppingItem {
  id: string
  name: string
  checked: boolean
  quantity: number
  categoryId: string
  category: Category
  listId: string
  createdAt: string
}

export interface ShoppingList {
  id: string
  name: string
  tags: Tag[]
  items: ShoppingItem[]
  createdAt: string
  updatedAt: string
}

export interface ShoppingListSummary {
  id: string
  name: string
  tags: Tag[]
  createdAt: string
  updatedAt: string
  _count: {
    items: number
  }
  _checkedCount?: number
}

export interface CreateListPayload {
  name: string
  tagIds?: string[]
}

export interface UpdateListPayload {
  name?: string
  tagIds?: string[]
}

export interface CreateItemPayload {
  name: string
  categoryId: string
  quantity?: number
}

export interface UpdateItemPayload {
  name?: string
  checked?: boolean
  quantity?: number
  categoryId?: string
}

export interface CreateCategoryPayload {
  name: string
  color: string
  emoji: string
}

export interface UpdateCategoryPayload {
  name?: string
  color?: string
  emoji?: string
}

export interface CreateTagPayload {
  name: string
  color: string
}

export interface UpdateTagPayload {
  name?: string
  color?: string
}

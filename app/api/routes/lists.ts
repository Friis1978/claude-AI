import { Router, type Request, type Response } from 'express'
import { prisma } from '../../../lib/prisma.js'

export const listsRouter = Router()

function paramId(req: Request): string {
  return req.params.id as string
}

function paramItemId(req: Request): string {
  return req.params.itemId as string
}

// GET /api/lists — list all (with optional tag filter)
listsRouter.get('/', async (req: Request, res: Response) => {
  const tagId = req.query.tagId as string | undefined

  const where = tagId
    ? { tags: { some: { id: tagId } } }
    : {}

  const lists = await prisma.shoppingList.findMany({
    where,
    include: {
      tags: true,
      _count: { select: { items: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })

  const listsWithCheckedCount = await Promise.all(
    lists.map(async (list) => {
      const checkedCount = await prisma.shoppingItem.count({
        where: { listId: list.id, checked: true },
      })
      return { ...list, _checkedCount: checkedCount }
    })
  )

  res.json(listsWithCheckedCount)
})

// POST /api/lists — create list
listsRouter.post('/', async (req: Request, res: Response) => {
  const { name, tagIds } = req.body as { name: string; tagIds?: string[] }

  const list = await prisma.shoppingList.create({
    data: {
      name,
      tags: tagIds ? { connect: tagIds.map((id) => ({ id })) } : undefined,
    },
    include: { tags: true, items: { include: { category: true } } },
  })

  res.status(201).json(list)
})

// GET /api/lists/:id — get list with items + tags
listsRouter.get('/:id', async (req: Request, res: Response) => {
  const list = await prisma.shoppingList.findUnique({
    where: { id: paramId(req) },
    include: {
      tags: true,
      items: {
        include: { category: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!list) {
    res.status(404).json({ error: 'List not found' })
    return
  }

  res.json(list)
})

// PATCH /api/lists/:id — update name / tag associations
listsRouter.patch('/:id', async (req: Request, res: Response) => {
  const { name, tagIds } = req.body as { name?: string; tagIds?: string[] }

  const list = await prisma.shoppingList.update({
    where: { id: paramId(req) },
    data: {
      name,
      tags: tagIds ? { set: tagIds.map((id) => ({ id })) } : undefined,
    },
    include: { tags: true, items: { include: { category: true } } },
  })

  res.json(list)
})

// DELETE /api/lists/:id — delete list (cascades items)
listsRouter.delete('/:id', async (req: Request, res: Response) => {
  await prisma.shoppingList.delete({
    where: { id: paramId(req) },
  })

  res.status(204).end()
})

// POST /api/lists/:id/duplicate — deep clone, reset checked
listsRouter.post('/:id/duplicate', async (req: Request, res: Response) => {
  const original = await prisma.shoppingList.findUnique({
    where: { id: paramId(req) },
    include: { tags: true, items: true },
  })

  if (!original) {
    res.status(404).json({ error: 'List not found' })
    return
  }

  const duplicate = await prisma.shoppingList.create({
    data: {
      name: `${original.name} (copy)`,
      tags: { connect: original.tags.map((t: { id: string }) => ({ id: t.id })) },
      items: {
        create: original.items.map((item: { name: string; quantity: number; categoryId: string }) => ({
          name: item.name,
          checked: false,
          quantity: item.quantity,
          categoryId: item.categoryId,
        })),
      },
    },
    include: { tags: true, items: { include: { category: true } } },
  })

  res.status(201).json(duplicate)
})

// POST /api/lists/:id/items — add item
listsRouter.post('/:id/items', async (req: Request, res: Response) => {
  const { name, categoryId, quantity } = req.body as {
    name: string
    categoryId: string
    quantity?: number
  }

  const item = await prisma.shoppingItem.create({
    data: {
      name,
      categoryId,
      quantity: quantity ?? 1,
      listId: paramId(req),
    },
    include: { category: true },
  })

  res.status(201).json(item)
})

// PATCH /api/lists/:id/items/:itemId — update item
listsRouter.patch('/:id/items/:itemId', async (req: Request, res: Response) => {
  const { name, checked, quantity, categoryId } = req.body as {
    name?: string
    checked?: boolean
    quantity?: number
    categoryId?: string
  }

  const item = await prisma.shoppingItem.update({
    where: { id: paramItemId(req) },
    data: { name, checked, quantity, categoryId },
    include: { category: true },
  })

  res.json(item)
})

// DELETE /api/lists/:id/items/:itemId — delete item
listsRouter.delete('/:id/items/:itemId', async (req: Request, res: Response) => {
  await prisma.shoppingItem.delete({
    where: { id: paramItemId(req) },
  })

  res.status(204).end()
})

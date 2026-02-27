import { Router, type Request, type Response } from 'express'
import { prisma } from '../../../lib/prisma.js'

export const categoriesRouter = Router()

const paramId = (req: Request): string => {
  return req.params.id as string
}

// GET /api/categories
categoriesRouter.get('/', async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })
  res.json(categories)
})

// POST /api/categories
categoriesRouter.post('/', async (req: Request, res: Response) => {
  const { name, color, emoji } = req.body as {
    name: string
    color: string
    emoji: string
  }

  const category = await prisma.category.create({
    data: { name, color, emoji },
  })

  res.status(201).json(category)
})

// PATCH /api/categories/:id
categoriesRouter.patch('/:id', async (req: Request, res: Response) => {
  const { name, color, emoji } = req.body as {
    name?: string
    color?: string
    emoji?: string
  }

  const category = await prisma.category.update({
    where: { id: paramId(req) },
    data: { name, color, emoji },
  })

  res.json(category)
})

// DELETE /api/categories/:id
categoriesRouter.delete('/:id', async (req: Request, res: Response) => {
  const itemCount = await prisma.shoppingItem.count({
    where: { categoryId: paramId(req) },
  })

  if (itemCount > 0) {
    res.status(400).json({
      error: 'Cannot delete category with existing items. Reassign items first.',
    })
    return
  }

  await prisma.category.delete({
    where: { id: paramId(req) },
  })

  res.status(204).end()
})

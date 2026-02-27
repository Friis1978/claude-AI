import { Router, type Request, type Response } from 'express'
import { prisma } from '../../../lib/prisma.js'

export const tagsRouter = Router()

function paramId(req: Request): string {
  return req.params.id as string
}

// GET /api/tags
tagsRouter.get('/', async (_req: Request, res: Response) => {
  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
  })
  res.json(tags)
})

// POST /api/tags
tagsRouter.post('/', async (req: Request, res: Response) => {
  const { name, color } = req.body as { name: string; color: string }

  const tag = await prisma.tag.create({
    data: { name, color },
  })

  res.status(201).json(tag)
})

// PATCH /api/tags/:id
tagsRouter.patch('/:id', async (req: Request, res: Response) => {
  const { name, color } = req.body as { name?: string; color?: string }

  const tag = await prisma.tag.update({
    where: { id: paramId(req) },
    data: { name, color },
  })

  res.json(tag)
})

// DELETE /api/tags/:id
tagsRouter.delete('/:id', async (req: Request, res: Response) => {
  await prisma.tag.delete({
    where: { id: paramId(req) },
  })

  res.status(204).end()
})

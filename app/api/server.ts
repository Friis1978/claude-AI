import 'dotenv/config'
import express from 'express'
import { resolve } from 'path'
import { listsRouter } from './routes/lists.js'
import { categoriesRouter } from './routes/categories.js'
import { tagsRouter } from './routes/tags.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(express.json())

app.use('/api/lists', listsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/tags', tagsRouter)

if (process.env.NODE_ENV === 'production') {
  const distPath = resolve(import.meta.dirname, '../../dist')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => {
    res.sendFile(resolve(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})

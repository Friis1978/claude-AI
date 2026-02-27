const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const sql = fs.readFileSync(path.join(__dirname, 'prisma/migrations/20260227132639_default_db/migration.sql'), 'utf8')

const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'))

const prisma = new PrismaClient()

async function main() {
  for (const stmt of statements) {
    console.log('Running:', stmt.substring(0, 80).replace(/\n/g, ' ') + '...')
    await prisma.$executeRawUnsafe(stmt)
  }
  console.log('All tables created!')
}

main()
  .catch(e => { console.error(e.message); process.exit(1) })
  .finally(() => prisma.$disconnect())

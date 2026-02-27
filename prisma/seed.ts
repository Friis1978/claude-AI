import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultCategories = [
  { name: 'Produce', color: '#22c55e', emoji: '\u{1F966}', isDefault: true },
  { name: 'Dairy', color: '#3b82f6', emoji: '\u{1F95B}', isDefault: true },
  { name: 'Meat', color: '#ef4444', emoji: '\u{1F969}', isDefault: true },
  { name: 'Bakery', color: '#f59e0b', emoji: '\u{1F35E}', isDefault: true },
  { name: 'Beverages', color: '#8b5cf6', emoji: '\u{1F964}', isDefault: true },
  { name: 'Household', color: '#06b6d4', emoji: '\u{1F9F9}', isDefault: true },
  { name: 'Frozen', color: '#64748b', emoji: '\u{2744}\u{FE0F}', isDefault: true },
  { name: 'Snacks', color: '#f97316', emoji: '\u{1F36A}', isDefault: true },
  { name: 'Other', color: '#6b7280', emoji: '\u{1F4E6}', isDefault: true },
]

const defaultTags = [
  { name: 'Urgent', color: '#ef4444', isDefault: true },
  { name: 'Weekly', color: '#3b82f6', isDefault: true },
  { name: 'Monthly', color: '#8b5cf6', isDefault: true },
  { name: 'Party', color: '#f59e0b', isDefault: true },
  { name: 'Sale', color: '#22c55e', isDefault: true },
]

async function main() {
  console.log('Seeding database...')

  for (const category of defaultCategories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  for (const tag of defaultTags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    })
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

# Project: ShoppingList

Vue.js shoppinglist application build with the App Router and prisma ORM.

## Teck Stack

- Framework: Vue.js (App router)
- Language: TypeScript (strict mode)
- Database: Prisma ORM
- UI: Tailwind CSS + shadcn/ui
- Testing: Jest (uni), Playwright (E2E)

## Code standards 

- Typescript: strict mode, do not use 'any'
- Styling: Use Tailwind utility classes only and no custom CSS files or inline '<style>' tags
- Components: Reuse and extend shadcn/ui components where possible and keep components small and composable

## Project Structure

- '/app': App Router pages, layouts, and routes
- '/app/api': API route handlers
- '/components': shadcn/ui and shared components
- '/lib': Utilities and shared logic
- '/prisma': Prisma schema and migrations

## Commands

- 'npm run dev': Start the development server on port 3000
- 'npm run lint': Run ESLint checks
- 'npm run test': Run Jest unit tests
- 'npm run db:migrate': Run Prisma migrations

## Important Notes

- NEVER commit .env files
- Prisma schema changes must be accompanied by migrations
- Assume production-grade data safely an consistency

## Build
Build a Shopping List application that helps users manage their shopping efficiently

The product is expected to support
- Categories for organizing shopping lists
- Creating and removing shopping lists
- Tag for flexible grouping and filtering
- Ability to dublicate a shopping list
- Each shopping item must include a checkbox to mark it completed
- Display the number of remaining (unchecked) items
- Allow users to add, remove, and edit shoping list items easily

Ask me questions to clarify the product details, technical requirements, enginering best practice and hard constraints.
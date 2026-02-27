# Project: ShoppingList

Vue.js shoppinglist application build with the App Router and prisma ORM.

## Teck Stack

- Framework: Vue.js (App router)
- Language: TypeScript (strict mode)
- Database: Prisma ORM
- UI: Tailwind CSS + shadcn/ui
- Testing: Jest (uni), Playwright (E2E)
- Formatting: Prettier + prettier-plugin-tailwindcss

## Code standards

- Typescript: strict mode, do not use 'any'
- Styling: Use Tailwind utility classes only and no custom CSS files or inline `<style>` tags
- Components: Reuse and extend shadcn/ui components where possible and keep components small and composable
- Functions: Always use arrow function syntax — `const myFn = () => {}` and `const myFn = async () => {}`. Never use `function` declarations
- Vue SFC order: Always put `<script>` first, then `<template>` — never the other way around
- Formatting: Prettier is configured and runs on save. Run `npm run format` to format all files. Never bypass it
- Tailwind z-index: Tailwind only includes z-0 to z-50 by default. Use arbitrary values like `z-[200]` for higher stacking contexts
- Radix Vue dialogs: Never use `<Teleport>` for dropdowns or pickers rendered inside a Radix dialog — render them inline in the DOM tree to avoid `DismissableLayer` capture-phase conflicts

## Project Structure

- '/app': App Router pages, layouts, and routes
- '/app/api': API route handlers
- '/components': shadcn/ui and shared components
- '/lib': Utilities and shared logic
- '/prisma': Prisma schema and migrations

## Commands

- 'npm run dev': Start the development server on port 3000
- 'npm run lint': Run ESLint checks
- 'npm run format': Format all source files with Prettier
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

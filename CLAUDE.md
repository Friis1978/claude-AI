# Project: ShoppingList

Vue.js shoppinglist application build with the App Router and prisma ORM.

## Teck Stack

- Framework: Vue.js (App router)
- Language: TypeScript (strict mode)
- Database: Prisma ORM
- UI: Tailwind CSS + shadcn/ui
- Testing: Jest (uni), Playwright (E2E)
- Formatting: Prettier + prettier-plugin-tailwindcss
- Linting: ESLint (flat config) + eslint-plugin-vue + typescript-eslint
- Git hooks: Husky (runs format + lint on pre-push)

## Code standards

- Typescript: strict mode, do not use 'any'
- Styling: Use Tailwind utility classes only and no custom CSS files or inline `<style>` tags
- Components: Reuse and extend shadcn/ui components where possible and keep components small and composable
- Functions: Always use arrow function syntax — `const myFn = () => {}` and `const myFn = async () => {}`. Never use `function` declarations
- Vue SFC order: Always put `<script>` first, then `<template>` — never the other way around
- Formatting: Prettier is configured and runs on save. Run `npm run format` to format all files. Never bypass it
- Linting: ESLint enforces `no-multiple-empty-lines` (max 1) and `no-explicit-any`. Run `npm run lint` to check. Both run automatically on `git push` via husky
- Tailwind z-index: Tailwind only includes z-0 to z-50 by default. Use arbitrary values like `z-[200]` for higher stacking contexts
- Radix Vue dialogs: Never use `<Teleport>` for dropdowns or pickers rendered inside a Radix dialog — render them inline in the DOM tree to avoid `DismissableLayer` capture-phase conflicts
- Colors: All theme colors are defined as hex CSS variables in `src/assets/main.css` (e.g. `--primary: #6467f1`). Tailwind references them via `var(--x)` in `tailwind.config.ts`. To change a color, edit the hex value in `main.css` only — never use `hsl()` wrappers or hardcode colors in components

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
- 'npx husky init': Re-initialise Husky git hooks (run after cloning the repo if hooks are missing)

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

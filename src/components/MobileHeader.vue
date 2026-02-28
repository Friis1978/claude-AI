<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'

defineEmits<{ toggleSidebar: [] }>()
</script>

<template>
  <header class="flex items-center gap-3 border-b px-4 py-3 md:hidden">
    <button @click="$emit('toggleSidebar')">
      <Menu class="h-6 w-6" />
    </button>
    <h1 class="flex-1 text-lg font-semibold">ShopList</h1>
    <ThemeToggle />
  </header>
</template>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next'

defineEmits<{ toggleSidebar: [] }>()
</script>

<template>
  <header class="flex items-center gap-3 border-b px-4 py-3 md:hidden">
    <button @click="$emit('toggleSidebar')">
      <Menu class="h-6 w-6" />
    </button>
    <h1 class="text-lg font-semibold">ShopList</h1>
  </header>
</template>

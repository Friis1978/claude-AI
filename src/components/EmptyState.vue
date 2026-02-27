<template>
  <div class="flex h-full flex-col items-center justify-center gap-4 text-center">
    <div class="rounded-full bg-muted p-6">
      <ShoppingCart class="h-12 w-12 text-muted-foreground" />
    </div>
    <div>
      <h2 class="text-xl font-semibold">No list selected</h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Select a list from the sidebar or create a new one to get started.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
</script>

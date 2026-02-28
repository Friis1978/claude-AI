<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import MobileHeader from '@/components/MobileHeader.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useTheme } from '@/lib/composables/useTheme'

const sidebarOpen = ref(false)

// initialise theme on app mount
useTheme()
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
    <div class="flex flex-1 flex-col overflow-hidden">
      <MobileHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <div class="hidden items-center justify-end border-b px-4 py-2 md:flex">
        <ThemeToggle />
      </div>
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

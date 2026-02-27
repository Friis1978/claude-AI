<script setup lang="ts">
import { computed } from 'vue'
import { Progress } from '@/components/ui/progress'

const props = defineProps<{
  total: number
  checked: number
}>()

const percentage = computed(() =>
  props.total === 0 ? 0 : Math.round((props.checked / props.total) * 100)
)
</script>

<template>
  <div v-if="total > 0" class="space-y-1">
    <div class="flex items-center justify-between text-sm">
      <span class="text-muted-foreground"> {{ checked }} of {{ total }} items checked </span>
      <span class="font-medium">{{ percentage }}%</span>
    </div>
    <Progress :model-value="percentage" class="h-2" />
  </div>
</template>

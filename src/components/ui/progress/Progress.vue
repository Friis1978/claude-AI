<template>
  <ProgressRoot
    :class="cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', $attrs.class as string)"
    v-bind="{ ...$attrs, class: undefined, modelValue }"
  >
    <ProgressIndicator
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="{ transform: `translateX(-${100 - (modelValue ?? 0)}%)` }"
    />
  </ProgressRoot>
</template>

<script setup lang="ts">
import { ProgressRoot, ProgressIndicator } from 'radix-vue'
import { cn } from '@/lib/utils'

defineProps<{ modelValue?: number }>()
defineOptions({ inheritAttrs: false })
</script>

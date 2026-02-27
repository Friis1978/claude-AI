<template>
  <DialogDescription
    :class="cn('text-sm text-muted-foreground', $attrs.class as string)"
    v-bind="{ ...$attrs, class: undefined }"
  >
    <slot />
  </DialogDescription>
</template>

<script setup lang="ts">
import { DialogDescription } from 'radix-vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <div
    :class="cn(badgeVariants({ variant }), $attrs.class as string)"
    v-bind="{ ...$attrs, class: undefined }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { badgeVariants } from '.'

withDefaults(defineProps<{
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}>(), {
  variant: 'default',
})

defineOptions({ inheritAttrs: false })
</script>

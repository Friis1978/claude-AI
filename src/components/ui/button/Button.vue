<template>
  <component
    :is="as || 'button'"
    :class="cn(buttonVariants({ variant, size }), $attrs.class as string)"
    v-bind="{ ...$attrs, class: undefined }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'

withDefaults(defineProps<{
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  as?: string
}>(), {
  variant: 'default',
  size: 'default',
})

defineOptions({ inheritAttrs: false })
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Minus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCategories } from '@/lib/composables/useCategories'
import { useItems } from '@/lib/composables/useItems'

const props = defineProps<{ listId: string }>()

const { categories } = useCategories()
const { addItem } = useItems()

const name = ref('')
const categoryId = ref('')
const quantity = ref(1)

const isFormValid = computed(() => {
  const valid = name.value.trim() !== '' && categoryId.value !== ''
  console.log('Form validation:', { name: name.value, categoryId: categoryId.value, valid })
  return valid
})

const onSubmit = async () => {
  if (!name.value.trim() || !categoryId.value) return

  await addItem(props.listId, {
    name: name.value.trim(),
    categoryId: categoryId.value,
    quantity: quantity.value,
  })

  name.value = ''
  quantity.value = 1
}
</script>

<template>
  <form class="flex flex-wrap gap-2" @submit.prevent="onSubmit">
    <input
      v-model="name"
      placeholder="Add an item..."
      class="flex h-10 min-w-[200px] flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Select
      :value="categoryId"
      @update:model-value="
        (val) => {
          categoryId = val
          console.log('Category selected:', val)
        }
      "
    >
      <SelectTrigger class="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.emoji }} {{ cat.name }}
        </SelectItem>
      </SelectContent>
    </Select>
    <div class="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        type="button"
        :disabled="quantity <= 1"
        @click="quantity--"
      >
        <Minus class="h-4 w-4" />
      </Button>
      <span class="w-8 text-center text-sm font-medium">{{ quantity }}</span>
      <Button variant="outline" size="icon" type="button" @click="quantity++">
        <Plus class="h-4 w-4" />
      </Button>
    </div>
    <Button type="submit" :disabled="!isFormValid">
      <Plus class="mr-1 h-4 w-4" />
      Add
    </Button>
  </form>
</template>

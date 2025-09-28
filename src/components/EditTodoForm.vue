<script setup lang="ts">
import { ref } from 'vue'
import CheckIcon from '@heroicons/vue/24/solid/CheckIcon'
import PencilIcon from '@heroicons/vue/24/solid/PencilIcon'

interface Todo {
  id: number
  title: string
  completed: boolean
  userId?: number
}

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{ (e: 'edit', payload: Todo): void; (e: 'close'): void }>()

const title = ref(props.todo.title || '')
const completed = ref(!!props.todo.completed)
const loading = ref(false)
const error = ref('')

async function handleSubmit(e: Event) {
  e.preventDefault()
  loading.value = true
  error.value = ''
  try {
    emit('edit', { ...props.todo, title: title.value, completed: completed.value })
    emit('close')
  } catch (err: any) {
    error.value = err?.message || 'Failed to update todo'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit="handleSubmit" class="bg-white p-4 rounded shadow w-full max-w-md mx-auto mb-4">
    <h2 class="text-lg font-semibold mb-2 font-cursive flex items-center gap-2 text-pink-600">
      <PencilIcon class="w-5 h-5 text-pink-400" aria-hidden="true" /> Edit Todo
    </h2>
    <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>
    <div class="mb-2">
      <label class="block mb-1 font-medium" for="edit-title">Title</label>
      <input id="edit-title" type="text" v-model="title" class="border rounded px-2 py-1 w-full" required aria-label="Edit todo title" />
    </div>
    <div class="mb-2 flex items-center gap-2">
      <input type="checkbox" v-model="completed" id="edit-completed" aria-label="Mark todo as completed" />
      <label for="edit-completed">Completed</label>
    </div>
    <div class="flex gap-4 mt-4">
      <button type="submit" class="bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600 disabled:opacity-50 transition-transform transform hover:scale-105" :disabled="loading" aria-label="Save changes to todo">
        <CheckIcon class="w-5 h-5 inline mr-1" aria-hidden="true" /> {{ loading ? 'Saving...' : 'Save Changes' }}
      </button>
      <button type="button" class="bg-pink-100 text-pink-700 px-4 py-2 rounded hover:bg-pink-200 border border-pink-300" @click="$emit('close')" aria-label="Cancel editing todo">
        Cancel
      </button>
    </div>
  </form>
</template>

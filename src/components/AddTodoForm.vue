<script setup lang="ts">
import { ref } from 'vue'
import PlusIcon from '@heroicons/vue/24/solid/PlusIcon'
import HeartIcon from '@heroicons/vue/24/solid/HeartIcon'

const emit = defineEmits<{ (e: 'add', payload: { title: string; completed: boolean }): void; (e: 'close'): void }>()

const title = ref('')
const completed = ref(false)
const loading = ref(false)
const error = ref('')

async function handleSubmit(e: Event) {
  e.preventDefault()
  loading.value = true
  error.value = ''
  try {
    emit('add', { title: title.value, completed: completed.value })
    title.value = ''
    completed.value = false
    emit('close')
  } catch (err: any) {
    error.value = err?.message || 'Failed to add todo'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit="handleSubmit" class="bg-white p-4 rounded shadow w-full max-w-md mx-auto mb-4">
    <h2 class="text-lg font-semibold mb-2 font-cursive flex items-center gap-2 text-pink-600">
      <HeartIcon class="w-5 h-5 text-pink-400" aria-hidden="true" /> Add New Todo
    </h2>
    <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>
    <div class="mb-2">
      <label class="block mb-1 font-medium" for="add-title">Title</label>
      <input id="add-title" type="text" v-model="title" class="border rounded px-2 py-1 w-full" required aria-label="Add todo title" />
    </div>
    <div class="mb-2 flex items-center gap-2">
      <input type="checkbox" v-model="completed" id="add-completed" aria-label="Mark new todo as completed" />
      <label for="add-completed">Completed</label>
    </div>
    <div class="flex gap-2 mt-4">
      <button type="submit" class="bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600 disabled:opacity-50 transition-transform transform hover:scale-105" :disabled="loading" aria-label="Add new todo">
        <PlusIcon class="w-5 h-5 inline mr-1" aria-hidden="true" /> {{ loading ? 'Adding...' : 'Add Todo' }}
      </button>
      <button type="button" class="bg-pink-100 text-pink-700 px-4 py-2 rounded hover:bg-pink-200 border border-pink-300" @click="$emit('close')" aria-label="Cancel adding todo">
        Cancel
      </button>
    </div>
  </form>
</template>

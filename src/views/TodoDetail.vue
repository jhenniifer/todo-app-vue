<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const { data: todo, isLoading, isError, error } = useQuery({
  queryKey: ['todo', id],
  queryFn: async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    if (!res.ok) throw new Error('Failed to fetch todo')
    return res.json()
  },
  enabled: !!id,
})
</script>

<template>
  <main class="p-4 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">Todo Detail</h1>
    <div v-if="isLoading" class="text-gray-500">Loading todo...</div>
    <div v-else-if="isError" class="text-red-600">{{ (error as any)?.message }}</div>
    <div v-else-if="todo" class="border rounded p-4 bg-white shadow">
      <div class="mb-2"><span class="font-semibold">ID:</span> {{ todo.id }}</div>
      <div class="mb-2"><span class="font-semibold">Title:</span> {{ todo.title }}</div>
      <div class="mb-2">
        <span class="font-semibold">Status:</span>
        <span :class="todo.completed ? 'text-green-700' : 'text-yellow-700'">
          {{ todo.completed ? 'Completed' : 'Incomplete' }}
        </span>
      </div>
      <div class="mb-2"><span class="font-semibold">User ID:</span> {{ todo.userId }}</div>
    </div>
    <button
      class="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      @click="router.back()"
      aria-label="Back to list"
    >
      ← Back
    </button>
  </main>
</template>

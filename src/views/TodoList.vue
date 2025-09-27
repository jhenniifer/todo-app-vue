<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import AddIcon from '@heroicons/vue/24/solid/PlusIcon'
import StarIcon from '@heroicons/vue/24/solid/StarIcon'

const TODOS_PER_PAGE = 10

const page = ref(1)
const search = ref('')
const status = ref<'all' | 'complete' | 'incomplete'>('all')
const showAdd = ref(false)

const queryClient = useQueryClient()

const { data: todos, isLoading, isError, error } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    if (!res.ok) throw new Error('Failed to fetch todos')
    return res.json()
  },
})

const filteredTodos = computed(() => {
  let list = (todos?.value as any[]) || []
  if (search.value) {
    list = list.filter((t) => t.title.toLowerCase().includes(search.value.toLowerCase()))
  }
  if (status.value === 'complete') list = list.filter((t) => t.completed)
  if (status.value === 'incomplete') list = list.filter((t) => !t.completed)
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredTodos.value.length / TODOS_PER_PAGE)))
const currentTodos = computed(() => {
  const start = (page.value - 1) * TODOS_PER_PAGE
  return filteredTodos.value.slice(start, start + TODOS_PER_PAGE)
})

function handleSearchChange(e: Event) {
  search.value = (e.target as HTMLInputElement).value
  page.value = 1
}
function handleStatusChange(e: Event) {
  status.value = (e.target as HTMLSelectElement).value as any
  page.value = 1
}

async function handleDeleteTodo(id: number) {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' })
  queryClient.setQueryData(['todos'], (old: any[] = []) => (old || []).filter((t) => t.id !== id))
}
</script>

<template>
  <main class="p-4">
    <h1 class="text-2xl font-bold mb-4 flex items-center justify-between font-cursive text-pink-700">
      <span class="flex items-center gap-2">
        <StarIcon class="w-6 h-6 text-yellow-400 animate-bounce" aria-hidden="true" />
        Todo List
      </span>
      <button
        class="bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600 text-base font-sans shadow transition-transform transform hover:scale-105 flex items-center gap-2"
        @click="showAdd = true"
      >
        <AddIcon class="w-5 h-5" aria-hidden="true" /> Add Todo
      </button>
    </h1>

    <!-- Controls -->
    <div class="flex flex-col md:flex-row gap-2 mb-4 items-center">
      <input
        type="text"
        placeholder="Search by title..."
        :value="search"
        @input="handleSearchChange"
        class="border rounded px-2 py-1 w-full md:w-64"
        aria-label="Search todos by title"
      />
      <select
        :value="status"
        @change="handleStatusChange"
        class="border rounded px-2 py-1"
        aria-label="Filter by completion status"
      >
        <option value="all">All</option>
        <option value="complete">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>

    <div v-if="isLoading" class="text-gray-500">Loading todos...</div>
    <div v-else-if="isError" class="text-red-600">{{ (error as any)?.message }}</div>
    <template v-else>
      <ul class="mb-4 divide-y">
        <li v-if="currentTodos.length === 0" class="py-4 text-center text-gray-500">No todos found.</li>
        <li
          v-for="todo in currentTodos"
          :key="todo.id"
          class="py-2 flex items-center justify-between"
        >
          <span class="flex-1 min-w-0">
            <span :class="todo.completed ? 'line-through text-gray-400' : ''">{{ todo.title }}</span>
            <span
              class="ml-2 px-2 py-0.5 rounded text-xs"
              :class="todo.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
            >
              {{ todo.completed ? 'Completed' : 'Incomplete' }}
            </span>
          </span>
          <div class="flex gap-4 ml-4 shrink-0">
            <RouterLink
              :to="`/todos/${todo.id}`"
              class="text-pink-600 hover:text-pink-800 text-lg font-semibold rounded-full p-2 transition-transform hover:scale-110 bg-pink-100 shadow"
              aria-label="View details"
            >
              👁️
            </RouterLink>
            <button
              class="text-pink-700 hover:text-pink-900 text-lg font-semibold rounded-full p-2 transition-transform hover:scale-110 bg-pink-200 shadow"
              @click="handleDeleteTodo(todo.id)"
              aria-label="Delete todo"
            >
              🗑️
            </button>
          </div>
        </li>
      </ul>

      <!-- Pagination -->
      <div class="flex gap-2 items-center justify-center">
        <button
          class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 text-lg"
          @click="page = Math.max(1, page - 1)"
          :disabled="page === 1"
          aria-label="Previous page"
        >
          ←
        </button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button
          class="px-3 py-1 rounded bg-gray-200 disabled:opacity-50 text-lg"
          @click="page = Math.min(totalPages, page + 1)"
          :disabled="page === totalPages"
          aria-label="Next page"
        >
          →
        </button>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from '../composables/toast'

const { toasts, remove } = useToast()
const items = computed(() => toasts)
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2 w-80">
    <div
      v-for="t in items"
      :key="t.id"
      class="flex items-start gap-2 rounded shadow p-3 text-sm border"
      :class="{
        'bg-green-50 text-green-800 border-green-200': t.type === 'success',
        'bg-red-50 text-red-800 border-red-200': t.type === 'error',
        'bg-blue-50 text-blue-800 border-blue-200': t.type === 'info',
      }"
    >
      <div class="flex-1">{{ t.message }}</div>
      <button class="opacity-70 hover:opacity-100" @click="remove(t.id)" aria-label="Close">
        ✕
      </button>
    </div>
  </div>
</template>

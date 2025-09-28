<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/toast'

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const { showSuccess, showError } = useToast()

const email = ref('')
const error = ref('')
const loading = ref(false)

async function onSubmit(e: Event) {
  e.preventDefault()
  error.value = ''
  if (!email.value.trim()) {
    error.value = 'Email is required'
    return
  }
  try {
    loading.value = true
    auth.register(email.value.trim())
    showSuccess('Account created!')
    const redirect = (route.query.redirect as string) || '/'
    router.replace(redirect)
  } catch (err: any) {
    showError(err?.message || 'Registration failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="p-4 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit="onSubmit" class="bg-white p-4 rounded shadow">
      <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>
      <label class="block mb-1 font-medium" for="email">Email</label>
      <input id="email" v-model="email" type="email" class="border rounded px-2 py-1 w-full mb-3" required />
      <button type="submit" class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 disabled:opacity-50" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Account' }}
      </button>
      <RouterLink to="/login" class="ml-3 text-pink-700 hover:underline">Login</RouterLink>
    </form>
  </main>
</template>

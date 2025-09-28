<template>
  <nav class="bg-pink-100 p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 border-b border-pink-200">
    <div class="flex items-center gap-4">
      <RouterLink to="/" class="font-semibold text-pink-700 hover:underline">
        Todos
      </RouterLink>
      <RouterLink to="/error-test" class="text-pink-500 hover:underline">
        Error Test
      </RouterLink>
    </div>
    <div class="md:ml-auto flex items-center gap-2">
      <template v-if="auth.user">
        <span class="text-sm text-pink-700">{{ auth.user?.email }}</span>
        <button
          class="px-3 py-1 text-sm rounded bg-white border border-pink-300 text-pink-700 hover:bg-pink-50"
          @click="onLogout"
        >
          Logout
        </button>
      </template>
      <template v-else>
        <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="px-2 py-1 rounded border border-pink-300 text-sm"
        />
        <button
          class="px-3 py-1 text-sm rounded bg-pink-500 text-white hover:bg-pink-600"
          @click="onLogin"
        >
          Login
        </button>
        <button
          class="px-3 py-1 text-sm rounded bg-white border border-pink-300 text-pink-700 hover:bg-pink-50"
          @click="onRegister"
        >
          Register
        </button>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/toast'

const auth = useAuth()
const email = ref('')
const router = useRouter()
const route = useRoute()
const { showInfo } = useToast()

function onLogin() {
  if (email.value.trim()) auth.login(email.value.trim())
}
function onRegister() {
  if (email.value.trim()) auth.register(email.value.trim())
}
function onLogout() {
  auth.logout()
  showInfo('Logged out')
  const redirect = route.fullPath && route.meta.requiresAuth ? route.fullPath : '/'
  router.push({ name: 'login', query: { redirect } })
}
</script>

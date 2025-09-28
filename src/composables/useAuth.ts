import { inject, ref, type App } from 'vue'

export type AuthUser = { email: string } | null

export interface AuthContext {
  user: ReturnType<typeof ref<AuthUser>>
  login: (email: string) => boolean
  register: (email: string) => boolean
  logout: () => void
}

const AUTH_KEY = Symbol('AUTH')

export function createAuth(): AuthContext {
  const user = ref<AuthUser>(null)

  // hydrate from localStorage
  try {
    const stored = localStorage.getItem('authUser')
    if (stored) user.value = JSON.parse(stored)
  } catch {
    // ignore
  }

  function persist(u: AuthUser) {
    if (u) localStorage.setItem('authUser', JSON.stringify(u))
    else localStorage.removeItem('authUser')
  }

  function login(email: string) {
    user.value = { email }
    persist(user.value)
    return true
  }

  function register(email: string) {
    return login(email)
  }

  function logout() {
    user.value = null
    persist(null)
  }

  return { user, login, register, logout }
}

export function provideAuth(app: App, ctx?: AuthContext) {
  const context = ctx ?? createAuth()
  app.provide(AUTH_KEY, context)
  return context
}

export function useAuth() {
  const ctx = inject<AuthContext>(AUTH_KEY)
  if (!ctx) throw new Error('Auth not provided. Call provideAuth(app) in main.ts')
  return ctx
}

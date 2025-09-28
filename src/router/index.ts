import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('../views/TodoList.vue'), meta: { requiresAuth: true } },
  { path: '/todos/:id', name: 'todo-detail', component: () => import('../views/TodoDetail.vue'), meta: { requiresAuth: true } },
  { path: '/error-test', name: 'error-test', component: () => import('../views/ErrorTest.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'register', component: () => import('../views/Register.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const stored = localStorage.getItem('authUser')
    if (!stored) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }
  }
  return true
})

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('../views/TodoList.vue') },
  { path: '/todos/:id', name: 'todo-detail', component: () => import('../views/TodoDetail.vue') },
  { path: '/error-test', name: 'error-test', component: () => import('../views/ErrorTest.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

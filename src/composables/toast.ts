import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info'
export interface ToastItem {
  id: number
  type: ToastType
  message: string
}

const toasts = ref<ToastItem[]>([])
let idCounter = 1

function push(message: string, type: ToastType = 'info', duration = 3000) {
  const id = idCounter++
  toasts.value.push({ id, type, message })
  if (duration > 0) {
    setTimeout(() => remove(id), duration)
  }
  return id
}

function remove(id: number) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

export function useToast() {
  return {
    toasts,
    showSuccess: (msg: string, duration?: number) => push(msg, 'success', duration),
    showError: (msg: string, duration?: number) => push(msg, 'error', duration),
    showInfo: (msg: string, duration?: number) => push(msg, 'info', duration),
    remove,
  }
}

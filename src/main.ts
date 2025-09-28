import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { provideAuth } from './composables/useAuth'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, {
  queryClient: new QueryClient(),
})

// Provide Auth context app-wide (mirrors React AuthContext behavior)
provideAuth(app)

// Minimal global error handler similar to ErrorBoundary logging
app.config.errorHandler = (err, _instance, info) => {
  console.error('Global error handler:', err, info)
}

app.mount('#app')

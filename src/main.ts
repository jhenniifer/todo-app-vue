import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, {
  queryClient: new QueryClient(),
})

app.mount('#app')

import './assets/main.css'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ui from '@nuxt/ui/vue-plugin'
import setupInterceptors from './services/interceptors.service'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedState))
app.use(router)
app.use(ui)

setupInterceptors()

app.mount('#app')

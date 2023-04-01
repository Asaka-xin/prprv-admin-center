import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import './assets/main.css'
import 'uno.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersist)

app.use(pinia)
app.use(router)

app.mount('#app')

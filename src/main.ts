import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vant/lib/index.css'
import { Search } from 'vant';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Search)
app.use(createPinia())
app.use(router)

app.mount('#app')

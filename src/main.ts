import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vant/lib/index.css'
import { Search, Icon, Field, CellGroup, Toast } from 'vant'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(Search)
app.use(Icon)
app.use(Field)
app.use(CellGroup)
app.use(Toast)
app.use(createPinia().use(persist))
app.use(router)
app.use(ElementPlus)
app.mount('#app')

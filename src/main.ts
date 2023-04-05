import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/base.css'
import '@/style/app.scss'
import "@/assets/font/fontFamily.css";
import '@/mock/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)
// @ts-ignore
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.mount('#app')

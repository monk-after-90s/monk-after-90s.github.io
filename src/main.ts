import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from "./store"
import api from './api'
import {createPinia} from 'pinia'
import {useJWT} from "./pinia-store"
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)
app.config.globalProperties.api = api
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, {locale: zhCn}).use(router).use(store).use(createPinia())

const jwtStore = useJWT()
app.config.globalProperties.jwtStore = jwtStore

app.mount('#app')
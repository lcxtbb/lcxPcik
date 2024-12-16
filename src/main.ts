import { createApp } from 'vue'
import App from '@/App.vue'

//引入ele插件和样式，配置为中文，icon组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入svg配置
import 'virtual:svg-icons-register';
//引入全局样式
import '@/styles/index.scss'
//引入路由
import router from './router'
//引入pinia
import { createPinia } from 'pinia' 
import piniaPersistedState from 'pinia-plugin-persistedstate'
//路由鉴权文件
import './permission'

const pinia = createPinia()
pinia.use(piniaPersistedState)  // pinia 数据持久化

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})

app.use(pinia)

app.use(router)

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

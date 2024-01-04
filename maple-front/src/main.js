import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
// import 'element-plus/lib/theme-chalk/index.css';
// import './css/custom-theme.scss'; // 路径根据实际情况调整
import './assets/css/element.scss'
import './assets/main.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 导入所有elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(createPinia())
app.use(router)

app.use(ElementPlus)
app.mount('#app')



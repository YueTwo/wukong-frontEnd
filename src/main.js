import setupAssets from '@/styles/index'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import vSlideIn from './utils/vSlideIn.js'

import 'element-plus/theme-chalk/el-message.css'

async function bootstrap() {
  setupAssets()
  const app = createApp(App)
  app.use(createPinia().use(persist))
  app.use(router)
  app.directive('SlideIn', vSlideIn)
  app.mount('#app')
}

bootstrap()

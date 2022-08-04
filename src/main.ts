import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
import { appWindow } from '@tauri-apps/api/window';

import 'element-plus/dist/index.css'
import './assets/style/global.scss'
import './assets/style/my-element.scss'
import './assets/style/btn.scss'
import './assets/style/list.scss'
import * as icons from '@element-plus/icons-vue'

import imgLazy from './hooks/imgLazy';

if(window.__TAURI__){
    await appWindow.center()
    await appWindow.startDragging();
}

const app = createApp(App)


Object.keys(icons).forEach(key => {
    app.component(key, icons[key as keyof typeof icons])
})

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
//图片懒加载
imgLazy(app)
app.mount('#app')


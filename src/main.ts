import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
// svg配置
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import router from './router' 
// 忽略引入国际化报的ts错误
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from '@/App.vue'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  });
app.use(router);
app.component('SvgIcon', SvgIcon)
app.mount('#app')
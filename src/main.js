import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//引入elementplus
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

//引入全局自定义样式
import "@/assets/css/global.css"

import zhCn from 'element-plus/es/locale/lang/zh-cn'
zhCn.el.pagination = {
    goto: '跳至',
    pagesize: '条/页',
    total: `共计 {total} 条`,
    pageClassifier: '页',
};


import scroll from 'vue-seamless-scroll'


import VueParticles from 'vue-particles'


createApp(App).use(store).use(router).use(ElementPlus, {size: 'small',locale: zhCn,}).use(VueParticles).use(scroll).mount('#app')

// @ts-ignore
import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {router} from './router'
import {createPinia} from 'pinia'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(ArcoVue)
    .use(ArcoVueIcon)
    .use(pinia)
    .mount('#app')

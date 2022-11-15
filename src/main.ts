// @ts-ignore
import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {router} from './router'
import {createPinia} from 'pinia'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
const pinia = createPinia()

import Vant from 'vant';
import 'vant/lib/index.css';
createApp(App)
    .use(router)
    .use(ArcoVue)
    .use(ArcoVueIcon)
    .use(pinia)
    .use(Vue3ColorPicker)
    .use(Vant)
    .mount('#app')

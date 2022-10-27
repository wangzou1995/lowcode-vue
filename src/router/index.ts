import {createWebHistory, createRouter, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [{
    path: '/',
    component: () => import('../pages/index.vue'),
    name: '主页',
    meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true},
    children: []
}, {
    path: '/testDrag',
    component: () => import('../pages/TestDrag.vue'),
    name: '自定义拖拽组件'
}]

const routerHistory = createWebHistory();
const router = createRouter({
    history: routerHistory,
    routes: routes
})

export {router}

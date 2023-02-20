import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
import HelloWorld from "../components/HelloWorld.vue"
import Demo from "../components/demo.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: HelloWorld
    },
    {
        path: '/demo',
        component: Demo
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Layout from '../layout/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: '/dashboard',
            component: () => import('../views/index/Dashboard.vue'),
            name: 'Dashboard'
        }]
    },
    {
        path: '/basic',
        component: Layout,
        name: 'Basic',
        children: [
            {
                path: '/basic/faculty',
                component: () => import("../views/basic/Faculty.vue"),
                name: 'Faculty'
            },
            {
                path: '/basic/major',
                component: () => import("../views/basic/Major.vue"),
                name: 'Major'
            },
            {
                path: '/basic/teacher',
                component: () => import("../views/basic/Teacher.vue"),
                name: 'Teacher'
            },

        ]
    },
    {
        path: '/student',
        component: Layout,
        name: 'Student',
        children: [
            {
                path: '/student/info',
                component: () => import("../views/student/Info.vue"),
                name: 'Info'
            },
            {
                path: '/student/exam',
                component: () => import("../views/student/Exam.vue"),
                name: 'Exam'
            },
            {
                path: '/student/image',
                component: () => import("../views/student/Image.vue"),
                name: 'Images'
            },

        ]
    },
    {
        path: '/user',
        component: Layout,
        name: 'User',
        children: [
            {
                path: '/user/account',
                component: () => import("../views/user/Account.vue"),
                name: 'Account'
            },
            {
                path: '/user/roles',
                component: () => import("../views/user/Roles.vue"),
                name: 'Roles'
            },
            {
                path: '/user/menu',
                component: () => import("../views/user/Menu.vue"),
                name: 'Menu'
            },
            {
                path: '/user/permission',
                component: () => import("../views/user/Permission.vue"),
                name: 'Permission'
            }

        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
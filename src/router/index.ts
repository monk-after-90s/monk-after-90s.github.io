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
            name: 'Dashboard',
            meta: {
                title: '首页'
            }
        }]
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import("../views/auth/signup.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/auth/login.vue"),
    },
    {
        path: '/basic',
        component: Layout,
        name: 'Basic',
        meta: {
            title: '基础数据'
        },
        children: [
            {
                path: '/basic/faculty',
                component: () => import("../views/basic/Faculty.vue"),
                name: 'Faculty',
                meta: {
                    title: '院系信息'
                },
            },
            {
                path: '/basic/major',
                component: () => import("../views/basic/Major.vue"),
                name: 'Major',
                meta: {
                    title: '专业信息'
                },
            },
            {
                path: '/basic/teacher',
                component: () => import("../views/basic/Teacher.vue"),
                name: 'Teacher',
                meta: {
                    title: '教师信息'
                },
            },

        ]
    },
    {
        path: '/student',
        component: Layout,
        name: 'Student',
        meta: {
            title: '学生管理'
        },
        children: [
            {
                path: '/student/info',
                component: () => import("../views/student/Info.vue"),
                name: 'Info',
                meta: {
                    title: '学生信息'
                }
            },
            {
                path: '/student/exam',
                component: () => import("../views/student/Exam.vue"),
                name: 'Exam',
                meta: {
                    title: '考试信息'
                }
            },
            {
                path: '/student/image',
                component: () => import("../views/student/Image.vue"),
                name: 'Images',
                meta: {
                    title: '学生照片'
                }
            },

        ]
    },
    {
        path: '/user',
        component: Layout,
        name: 'User',
        meta: {
            title: '用户角色'
        },
        children: [
            {
                path: '/user/account',
                component: () => import("../views/user/Account.vue"),
                name: 'Account',
                meta: {
                    title: '登录账号'
                },
            },
            {
                path: '/user/roles',
                component: () => import("../views/user/Roles.vue"),
                name: 'Roles',
                meta: {
                    title: '角色信息'
                }
            },
            {
                path: '/user/menu',
                component: () => import("../views/user/Menu.vue"),
                name: 'Menu',
                meta: {
                    title: '菜单管理'
                }
            },
            {
                path: '/user/permission',
                component: () => import("../views/user/Permission.vue"),
                name: 'Permission',
                meta: {
                    title: '权限管理'
                }
            }

        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
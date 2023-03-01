import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Layout from '../layout/index.vue'
import {useJWT} from "../pinia-store"
import {ElMessage} from 'element-plus'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: {name: 'Dashboard'},
        meta: {
            title: '首页',
            requiredAuth: true
        },
        children: [{
            path: 'dashboard',
            component: () => import('../views/index/Dashboard.vue'),
            name: 'Dashboard',
            meta: {
                title: '首页',
                requiredAuth: true
            }
        }]
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import("../views/auth/signup.vue"),
        meta: {
            requiredAuth: false
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/auth/login.vue"),
        meta: {
            requiredAuth: false
        }
    },
    {
        path: '/basic',
        component: Layout,
        name: 'Basic',
        redirect: {name: 'Faculty'},
        meta: {
            title: '基础数据',
            requiredAuth: true
        },
        children: [
            {
                path: 'faculty',
                component: () => import("../views/basic/Faculty.vue"),
                name: 'Faculty',
                meta: {
                    title: '院系信息',
                    requiredAuth: true
                },
            },
            {
                path: 'major',
                component: () => import("../views/basic/Major.vue"),
                name: 'Major',
                meta: {
                    title: '专业信息',
                    requiredAuth: true
                },
            },
            {
                path: 'teacher',
                component: () => import("../views/basic/Teacher.vue"),
                name: 'Teacher',
                meta: {
                    title: '教师信息',
                    requiredAuth: true
                },
            },

        ]
    },
    {
        path: '/student',
        component: Layout,
        name: 'Student',
        redirect: {name: 'Info'},
        meta: {
            title: '学生管理',
            requiredAuth: true
        },
        children: [
            {
                path: 'info',
                component: () => import("../views/student/Info.vue"),
                name: 'Info',
                meta: {
                    title: '学生信息',
                    requiredAuth: true
                }
            },
            {
                path: 'exam',
                component: () => import("../views/student/Exam.vue"),
                name: 'Exam',
                meta: {
                    title: '考试信息',
                    requiredAuth: true
                }
            },
            {
                path: 'image',
                component: () => import("../views/student/Image.vue"),
                name: 'Images',
                meta: {
                    title: '学生照片',
                    requiredAuth: true
                }
            },

        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: {name: 'Account'},
        name: 'User',
        meta: {
            title: '用户角色',
            requiredAuth: true
        },
        children: [
            {
                path: 'account',
                component: () => import("../views/user/Account.vue"),
                name: 'Account',
                meta: {
                    title: '登录账号',
                    requiredAuth: true
                },
            },
            {
                path: 'roles',
                component: () => import("../views/user/Roles.vue"),
                name: 'Roles',
                meta: {
                    title: '角色信息',
                    requiredAuth: true
                }
            },
            {
                path: 'menu',
                component: () => import("../views/user/Menu.vue"),
                name: 'Menu',
                meta: {
                    title: '菜单管理',
                    requiredAuth: true
                }
            },
            {
                path: 'permission',
                component: () => import("../views/user/Permission.vue"),
                name: 'Permission',
                meta: {
                    title: '权限管理',
                    requiredAuth: true
                }
            }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach(async (to, from, next) => {
    if (!to.meta.requiredAuth) {
        //不需要身份认证
        next()
    } else {//需要身份认证
        const jwtStore = useJWT()
        console.log(`token剩余寿命:${jwtStore.getState.exp - (new Date().getTime() / 1000)}s`)
        if (jwtStore.getState.exp === 0) {
            ElMessage.error('需要登陆')
            next({name: "Login"})
        }
        //token过期
        else if ((new Date().getTime() / 1000) > jwtStore.getState.exp) {
            ElMessage.error('Token过期请登录')
            next({name: "Login"})
        } else {
            next()
        }
    }
})
export default router
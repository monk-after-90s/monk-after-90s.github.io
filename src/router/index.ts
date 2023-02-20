import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Index from "../components/index.vue"
import Tv from "../components/tv.vue"
import Movie from "../components/movie.vue"
import Sport from "../components/sport.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/tv',
        name: 'Tv',
        component: Tv
    },
    {
        path: '/movie',
        name: 'Movie',
        component: Movie
    },
    {
        path: '/sport',
        name: 'Sport',
        component: Sport
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
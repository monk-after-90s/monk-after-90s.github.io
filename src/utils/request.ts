import axios from "axios"
import {ElMessage} from "element-plus"
import router from "../router"

export const baseUrl = 'http://localhost:8000'

const request = axios.create({
    baseURL: baseUrl + '/api/v1',
    timeout: 5000
})
// @ts-ignore
request.baseUrl = baseUrl
//拦截器
request.interceptors.request.use(
    (config: any) => {
        let token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `jwt ${token}`
            return config
        } else if (config.url === 'auth/login/' || config.url === 'auth/signup/') {
            return config
        } else {
            router.push({name: 'Login'})
            ElMessage.error("请登录")
        }
    },
    (error: any) => {
        Promise.reject(error)
    })
request.interceptors.response.use((response: any) => response,
    (error: any) => {
        if (error && error.response) {
            error.data = {};
            switch (error.response.status) {
                case 400:
                    error.data.msg = '错误请求';
                    ElMessage.error(error.data.msg)
                    break
                case 401:
                    error.data.msg = '未授权，请重新登录';
                    ElMessage.error(error.data.msg)
                    break
                case 403:
                    error.data.msg = '拒绝访问';
                    ElMessage.error(error.data.msg)
                    break
                case 404:
                    error.data.msg = '请求错误,未找到该资源';
                    ElMessage.error(error.data.msg)
                    break
                case 405:
                    error.data.msg = '请求方法未允许';
                    ElMessage.error(error.data.msg)
                    break
                case 408:
                    error.data.msg = '请求超时';
                    ElMessage.error(error.data.msg)
                    break
                case 500:
                    error.data.msg = '服务器端出错';
                    ElMessage.error(error.data.msg)
                    break
                case 501:
                    error.data.msg = '网络未实现';
                    ElMessage.error(error.data.msg)
                    break
                case 502:
                    error.data.msg = '网络错误';
                    ElMessage.error(error.data.msg)
                    break
                case 503:
                    error.data.msg = '服务不可用';
                    ElMessage.error(error.data.msg)
                    break
                case 504:
                    error.data.msg = '网络超时';
                    ElMessage.error(error.data.msg)
                    break
                case 505:
                    error.data.msg = 'http版本不支持该请求';
                    ElMessage.error(error.data.msg)
                    break
                default:
                    error.data.msg = `连接错误${error.response.status}`;
                    ElMessage.error(error.data.msg)
            }
        } else {
            ElMessage.error("连接到服务器失败")
        }
        return Promise.reject(error);

    })

export default request
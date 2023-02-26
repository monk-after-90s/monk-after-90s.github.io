import request from "../utils/request"

export default {
    // 注册用户
    signup(data: Object) {
        return request({
            method: 'post',
            url: `auth/signup/`,
            data
        })
    },
    login(data: Object) {
        return request({
            method: 'post',
            url: 'auth/login/',
            data
        })
    },
}
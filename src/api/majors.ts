import request from "../utils/request"

export default {
    getAll: (params?: any) => {
        return request({
            method: 'get',
            url: 'majors/',
            params
        })
    },
    add: (data: any) => {
        return request({
            method: 'post',
            url: 'majors/',
            data
        })
    },
    edit: (id: any, data: any) => {
        return request({
            method: 'put',
            url: `majors/${id}/`,
            data
        })
    },

    del: (id: any) => {
        return request({
            method: 'delete',
            url: `majors/${id}/`
        })
    }

}
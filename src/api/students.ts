import request from "../utils/request"

export default {
    getAll: (params: any) => {
        return request({
            method: 'get',
            url: 'students/',
            params
        })
    },
    add: (data: any) => {
        return request({
            method: 'post',
            url: 'students/',
            data
        })
    },
    edit: (id: any, data: any) => {
        return request({
            method: 'put',
            url: `students/${id}/`,
            data
        })
    },

    del: (id: any) => {
        return request({
            method: 'delete',
            url: `students/${id}/`
        })
    }

}
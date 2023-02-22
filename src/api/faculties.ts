import request from "../utils/request"

export default {
    getAll: (params: any) => {
        return request({
            method: 'get',
            url: 'faculties/',
            params
        })
    },
    add: (data: any) => {
        return request({
            method: 'post',
            url: 'faculties/',
            data
        })
    },
    edit: (id: any, data: any) => {
        return request({
            method: 'put',
            url: `faculties/${id}/`,
            data
        })
    },

    del: (id: any) => {
        return request({
            method: 'delete',
            url: `faculties/${id}/`
        })
    }

}
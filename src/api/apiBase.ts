import request from "../utils/request"

export default class apiBase {
    public name: string = ''

    constructor(name: string) {
        this.name = name
    }

    public getAll = (params?: any) => {
        return request({
            method: 'get',
            url: `${this.name}/`,
            params
        })
    }
    public add = (data?: any) => {
        return request({
            method: 'post',
            url: `${this.name}/`,
            data
        })
    }
    public getOne = (id: any) => {
        return request({
            method: 'get',
            url: `${this.name}/${id}/`
        })
    }
    public edit = (id: any, data: any) => {
        return request({
            method: 'patch',
            url: `${this.name}/${id}/`,
            data
        })
    }
    public del = (id: any) => {
        return request({
            method: 'delete',
            url: `${this.name}/${id}/`
        })
    }
}
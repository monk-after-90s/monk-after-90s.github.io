import apiBase from "./apiBase"
import request from "../utils/request"

export default class studentsApi extends apiBase {
    constructor() {
        super('students')
    }

    public upload = (data: any) => {
        return request(
            {
                method: 'post',
                url: `${this.name}/upload/`,
                data
            }
        )
    }
}
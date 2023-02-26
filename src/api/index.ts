import apiBase from "./apiBase"
import studentsApi from "./students"
import auth from "./auth"

let students = new studentsApi()
let majors = new apiBase('majors')
let faculties = new apiBase('faculties')

export default {
    students,
    majors,
    faculties,
    auth
}
import apiBase from "./apiBase"

let students = new apiBase('students')
let majors = new apiBase('majors')
let faculties = new apiBase('faculties')

export default {
    students,
    majors,
    faculties
}
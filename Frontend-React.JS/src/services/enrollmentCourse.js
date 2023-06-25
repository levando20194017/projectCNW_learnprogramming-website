import axios from '../axios'
const getAllUsersEnrollment = (inputId) => {
    return axios.get(`http://localhost:8080/api/get-all-usersRegisterCourse?id=${inputId}`)
}
const enrrollmentCourse = (courseID, userID) => {
    return axios.post('http://localhost:8080/api/course/register', { courseID: courseID, userID: userID })
}
export { getAllUsersEnrollment, enrrollmentCourse }
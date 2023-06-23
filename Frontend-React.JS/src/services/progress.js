import axios from '../axios'
const getProgressOfCourse = (inputId) => {
    return axios.get(`http://localhost:8080/api/progress/get-progress-course?id=${inputId}`)
}
const createProgressOfCourse = (courseID, userID, videoID, completionPercent) => {
    return axios.post('http://localhost:8080/api/progress/create-progress-course',
        { courseID: courseID, userID: userID, videoID: videoID, completionPercent: completionPercent })
}
export { getProgressOfCourse, createProgressOfCourse }
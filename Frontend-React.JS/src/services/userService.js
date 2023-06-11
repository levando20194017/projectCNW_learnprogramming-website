import axios from '../axios'
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}
const handleSignUpApi = (userEmail, userPassword, userFullName) => {
    return axios.post('/api/create-new-user', { email: userEmail, password: userPassword, fullName: userFullName });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, handleSignUpApi }
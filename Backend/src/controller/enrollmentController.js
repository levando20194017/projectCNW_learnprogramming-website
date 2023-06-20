import enrollmentService from '../services/enrollmentService'

let handleRegisterCourse = async (req, res) => {
    let message = await enrollmentService.registerCourse(req.body);
    console.log(message);
    return res.status(200).json(message)
}

module.exports = {
    handleRegisterCourse: handleRegisterCourse
}
import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import courseController from "../controller/courseController";
import lessonController from "../controller/lessonController";
import videoController from "../controller/videoController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAboutpage)
    router.get('/crud', homeController.getCRUD)
    router.get('/get-crud', homeController.displayGetCRUD);
    router.post('/post-crud', homeController.postCRUD)
    router.get('/edit-crud', homeController.displayEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/login', userController.handleLogin)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/get-all-courses', courseController.handleGetAllCourses)
    router.post('/api/create-new-course', courseController.handleCreateNewCourse)
    router.delete('/api/delete-course', courseController.handleDeleteCourse)
    router.put('/api/edit-course', courseController.handleEditCourse)

    router.get('/api/get-all-lessons', lessonController.handleGetAllLessons)
    router.post('/api/create-new-lesson', lessonController.handleCreateNewLesson)
    router.put('/api/edit-lesson', lessonController.handleEditLesson)
    router.delete('/api/delete-lesson', lessonController.handleDeleteLesson)

    router.get('/api/get-all-videos', videoController.handleGetAllVideos)
    router.post('/api/create-new-video', videoController.handleCreateNewVideo)
    router.put('/api/edit-video', videoController.handleEditVideo)
    router.delete('/api/delete-video', videoController.handleDeleteVideo)

    return app.use("/", router)
}

module.exports = initWebRoutes;
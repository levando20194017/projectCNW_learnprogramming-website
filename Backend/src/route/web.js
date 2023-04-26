import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";

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
    return app.use("/", router)
}

module.exports = initWebRoutes;
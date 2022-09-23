import express from "express"

import UsersController from "../controllers/users.controller.js";
import TasksController from "../controllers/tasks.controller.js";

const router = express.Router();

router.route("/sign-up").post(UsersController.apiPostUser);

router.route("/sign-in").post(UsersController.apiValidateUser);

router.route("/profile").get(UsersController.apiAuthenticateToken, UsersController.apiGetUser);

router.route("/todolist").get(UsersController.apiAuthenticateToken, TasksController.apiGetTodolist);

router.route("/todolist/add").post(UsersController.apiAuthenticateToken, TasksController.apiPostTask);

router.route("/todolist/delete/:id").delete(UsersController.apiAuthenticateToken, TasksController.apiDeleteTask);

router.route("/todolist/check/:id").patch(UsersController.apiAuthenticateToken, TasksController.apiCheckTask);


export default router;


import { Router } from "express";
import * as UserController from "../core/User/UserController.js";
import { authorizationChecker } from "../middleware/athorizationChecker.js";

const userRouter = new Router();

userRouter.post("/registration", UserController.register);
userRouter.post("/authorization", UserController.authorize);
userRouter.get("/:nickname", authorizationChecker, UserController.getByNickname);

export { userRouter };